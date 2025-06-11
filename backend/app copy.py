# app.py - Complete RAG Backend with Memory
import os
import logging
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
import together
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Taofik Portfolio RAG API with Memory", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "https://akanbi.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ChatMessage(BaseModel):
    message: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    response: str
    session_id: str

# Global variables
embedding_model = None
chroma_client = None
collection = None
conversations = {}  # Store conversations in memory

# Initialize Together AI
together.api_key = os.getenv("TOGETHER_API_KEY")

def initialize_embedding_model():
    """Initialize the sentence transformer model for embeddings"""
    global embedding_model
    try:
        embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        logger.info("Embedding model initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize embedding model: {e}")
        raise

def initialize_chromadb():
    """Initialize ChromaDB and create collection"""
    global chroma_client, collection
    try:
        # Initialize ChromaDB with persistent storage
        chroma_client = chromadb.PersistentClient(path="./chroma_db")
        
        # Get or create collection
        collection_name = "taofik_portfolio"
        try:
            collection = chroma_client.get_collection(collection_name)
            logger.info(f"Loaded existing collection: {collection_name}")
        except:
            collection = chroma_client.create_collection(
                name=collection_name,
                metadata={"description": "Taofik Akanbi Portfolio Knowledge Base"}
            )
            logger.info(f"Created new collection: {collection_name}")
            
    except Exception as e:
        logger.error(f"Failed to initialize ChromaDB: {e}")
        raise

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """Split text into overlapping chunks"""
    if len(text) <= chunk_size:
        return [text]
    
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        
        # Try to break at sentence boundaries
        if end < len(text):
            last_period = chunk.rfind('.')
            last_newline = chunk.rfind('\n')
            break_point = max(last_period, last_newline)
            
            if break_point > start + chunk_size // 2:
                chunk = text[start:break_point + 1]
                end = break_point + 1
        
        chunks.append(chunk.strip())
        start = end - overlap
        
        if start >= len(text):
            break
    
    return chunks

def load_portfolio_data():
    """Load and process the portfolio data into ChromaDB"""
    try:
        # Read the portfolio data file
        with open("akandi_data.txt", "r", encoding="utf-8") as file:
            portfolio_text = file.read()
        
        # Check if collection already has data
        existing_count = collection.count()
        if existing_count > 0:
            logger.info(f"Collection already contains {existing_count} documents")
            return
        
        # Split into sections based on headers
        sections = []
        current_section = ""
        current_title = ""
        
        lines = portfolio_text.split('\n')
        
        for line in lines:
            if line.startswith('##') and not line.startswith('###'):
                # Save previous section
                if current_section.strip():
                    sections.append({
                        'title': current_title,
                        'content': current_section.strip()
                    })
                
                # Start new section
                current_title = line.replace('##', '').strip()
                current_section = line + '\n'
            else:
                current_section += line + '\n'
        
        # Add the last section
        if current_section.strip():
            sections.append({
                'title': current_title,
                'content': current_section.strip()
            })
        
        # Process each section and add to ChromaDB
        all_chunks = []
        all_metadatas = []
        all_ids = []
        
        for i, section in enumerate(sections):
            # Create chunks from the section
            chunks = chunk_text(section['content'])
            
            for j, chunk in enumerate(chunks):
                chunk_id = f"section_{i}_chunk_{j}"
                all_chunks.append(chunk)
                all_metadatas.append({
                    'section_title': section['title'],
                    'chunk_index': j,
                    'section_index': i
                })
                all_ids.append(chunk_id)
        
        # Generate embeddings for all chunks
        logger.info("Generating embeddings for portfolio data...")
        embeddings = embedding_model.encode(all_chunks).tolist()
        
        # Add to ChromaDB
        collection.add(
            documents=all_chunks,
            embeddings=embeddings,
            metadatas=all_metadatas,
            ids=all_ids
        )
        
        logger.info(f"Successfully loaded {len(all_chunks)} chunks into ChromaDB")
        
    except Exception as e:
        logger.error(f"Failed to load portfolio data: {e}")
        raise

def query_chromadb(query: str, n_results: int = 5) -> List[Dict[str, Any]]:
    """Query ChromaDB for relevant documents"""
    try:
        # Generate embedding for the query
        query_embedding = embedding_model.encode([query]).tolist()
        
        # Search in ChromaDB
        results = collection.query(
            query_embeddings=query_embedding,
            n_results=n_results
        )
        
        # Format results
        formatted_results = []
        for i in range(len(results['documents'][0])):
            formatted_results.append({
                'content': results['documents'][0][i],
                'metadata': results['metadatas'][0][i],
                'distance': results['distances'][0][i] if 'distances' in results else 0
            })
        
        return formatted_results
        
    except Exception as e:
        logger.error(f"Failed to query ChromaDB: {e}")
        return []

def generate_response_with_memory(query: str, context: str, conversation_history: List[str]) -> str:
    """Generate response using conversation history + RAG context"""
    try:
        # Build conversation history string
        history_str = ""
        if conversation_history:
            recent_history = conversation_history[-6:]  # Last 6 messages
            history_str = "Previous conversation:\n" + "\n".join(recent_history) + "\n\n"
        
        prompt = f"""You are a friendly AI chatbot representing Taofik Akanbi, a Data Scientist. You're having a casual conversation with someone visiting his portfolio.

{history_str}Context from Taofik's portfolio:
{context}

Current user question: {query}

STRICT INSTRUCTIONS - FOLLOW THESE EXACTLY:
- ONLY answer questions about Taofik Akanbi's work, experience, projects, and skills
- NEVER make up or invent information not in the provided context
- If asked about something not in the context, say "I don't have that information in my knowledge base"
- DO NOT answer questions about other people, companies, or topics unrelated to Taofik
- DO NOT provide general advice, tutorials, or how-to guides
- DO NOT make claims about Taofik's current employment status unless explicitly stated in context
- Keep responses SHORT and conversational (1-3 sentences max)
- Answer as if you ARE Taofik (use "I" when referring to his work)
- Be friendly but stay focused on Taofik's portfolio content only
- If someone asks about your capabilities, say "I can tell you about Taofik's experience and projects"

FORBIDDEN TOPICS - DO NOT RESPOND TO:
- Requests to help with coding, debugging, or technical tutorials
- Questions about other data scientists or professionals
- General career advice not specific to Taofik's experience
- Current events, news, or topics outside Taofik's portfolio
- Requests to generate code, write emails, or create content
- Questions about salary, compensation, or financial details not in context

If asked about forbidden topics, respond: "I'm here to chat about Taofik's work and experience. What would you like to know about his projects or background?"

Response:"""

        response = together.Complete.create(
            prompt=prompt,
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            max_tokens=150,
            temperature=0.7,  # Reduced from 0.8 for more consistent responses
            top_p=0.8,        # Reduced from 0.9 for less randomness
            repetition_penalty=1.2,  # Increased to avoid repetition
            stop=["</s>", "[INST]", "[/INST]", "FORBIDDEN", "User:", "Human:"]
        )
        
        # Handle different response formats
        if 'output' in response:
            if 'choices' in response['output']:
                return response['output']['choices'][0]['text'].strip()
            else:
                return response['output']['text'].strip()
        elif 'choices' in response:
            return response['choices'][0]['text'].strip()
        else:
            logger.error(f"Unexpected response format: {response}")
            return "I apologize, but I'm having trouble generating a response right now."
        
    except Exception as e:
        logger.error(f"Failed to generate response with memory: {e}")
        return "I apologize, but I'm having trouble generating a response right now."

@app.on_event("startup")
async def startup_event():
    """Initialize models and data on startup"""
    logger.info("Starting up RAG backend with memory...")
    
    # Check for Together AI API key
    if not os.getenv("TOGETHER_API_KEY"):
        logger.error("TOGETHER_API_KEY not found in environment variables")
        raise RuntimeError("TOGETHER_API_KEY is required")
    
    # Initialize components
    initialize_embedding_model()
    initialize_chromadb()
    load_portfolio_data()
    
    logger.info("RAG backend with memory startup completed successfully")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Taofik Portfolio RAG API with Memory is running!"}

@app.get("/health")
async def health_check():
    """Detailed health check"""
    try:
        # Check ChromaDB
        doc_count = collection.count()
        
        # Check Together AI (simple test)
        test_response = together.Complete.create(
            prompt="Hello",
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            max_tokens=5
        )
        
        # Just check if we get any response
        together_status = "connected" if test_response else "error"
        
        return {
            "status": "healthy",
            "chromadb_documents": doc_count,
            "together_ai": together_status,
            "embedding_model": "loaded",
            "active_conversations": len(conversations)
        }
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(message: ChatMessage):
    """Main chat endpoint with memory"""
    try:
        user_query = message.message.strip()
        session_id = message.session_id
        
        if not user_query:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Initialize conversation history for new sessions
        if session_id not in conversations:
            conversations[session_id] = []
        
        # Query ChromaDB for relevant context
        relevant_docs = query_chromadb(user_query, n_results=3)
        context = "\n\n".join([doc['content'] for doc in relevant_docs])
        
        # Generate response with conversation history
        response = generate_response_with_memory(
            user_query, 
            context, 
            conversations[session_id]
        )
        
        # Store conversation (keep last 12 exchanges for better context)
        conversations[session_id].append(f"User: {user_query}")
        conversations[session_id].append(f"Assistant: {response}")
        
        # Keep only last 12 messages to prevent memory overflow
        if len(conversations[session_id]) > 12:
            conversations[session_id] = conversations[session_id][-12:]
        
        return ChatResponse(response=response, session_id=session_id)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/chat/{session_id}")
async def clear_conversation(session_id: str):
    """Clear conversation history for a session"""
    if session_id in conversations:
        del conversations[session_id]
        logger.info(f"Cleared conversation for session: {session_id}")
    return {"message": f"Conversation {session_id} cleared"}

@app.get("/chat/{session_id}/history")
async def get_conversation_history(session_id: str):
    """Get conversation history for a session"""
    return {
        "session_id": session_id, 
        "history": conversations.get(session_id, []),
        "message_count": len(conversations.get(session_id, []))
    }

@app.get("/stats")
async def get_stats():
    """Get API statistics"""
    total_messages = sum(len(conv) for conv in conversations.values())
    return {
        "active_sessions": len(conversations),
        "total_messages": total_messages,
        "chromadb_documents": collection.count() if collection else 0
    }

@app.get("/search/{query}")
async def search_portfolio(query: str):
    """Search portfolio data endpoint"""
    try:
        results = query_chromadb(query, n_results=5)
        return {"query": query, "results": results}
    except Exception as e:
        logger.error(f"Error in search endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
# rag_service.py - Lightweight RAG with TF-IDF embeddings
import logging
from typing import List, Dict, Any
import chromadb
import together
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import os
from models import Config

logger = logging.getLogger(__name__)

class RAGService:
    """Handles all RAG-related operations with lightweight TF-IDF embeddings"""
    
    def __init__(self):
        self.vectorizer = None
        self.document_vectors = None
        self.documents = []  # Store documents for retrieval
        self.document_metadata = []  # Store metadata
        self.chroma_client = None
        self.collection = None
        self.conversations = {}  # Store conversations in memory
        
        # Initialize Together AI
        together.api_key = Config.TOGETHER_API_KEY
    
    def initialize_embedding_model(self):
        """Initialize the TF-IDF vectorizer"""
        try:
            # Initialize TF-IDF vectorizer with optimized parameters
            self.vectorizer = TfidfVectorizer(
                max_features=1000,  # Limit vocabulary size
                stop_words='english',
                ngram_range=(1, 2),  # Unigrams and bigrams
                max_df=0.8,  # Ignore terms that appear in >80% of docs
                min_df=2,    # Ignore terms that appear in <2 docs
                lowercase=True,
                strip_accents='ascii'
            )
            logger.info("TF-IDF vectorizer initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize TF-IDF vectorizer: {e}")
            raise
    
    def initialize_chromadb(self):
        """Initialize ChromaDB for metadata storage (vectors stored separately)"""
        try:
            # Initialize ChromaDB with persistent storage
            self.chroma_client = chromadb.PersistentClient(path=Config.CHROMA_DB_PATH)
            
            # Get or create collection
            try:
                self.collection = self.chroma_client.get_collection(Config.COLLECTION_NAME)
                logger.info(f"Loaded existing collection: {Config.COLLECTION_NAME}")
            except:
                self.collection = self.chroma_client.create_collection(
                    name=Config.COLLECTION_NAME,
                    metadata={"description": "Taofik Akanbi Portfolio Knowledge Base"}
                )
                logger.info(f"Created new collection: {Config.COLLECTION_NAME}")
                
        except Exception as e:
            logger.error(f"Failed to initialize ChromaDB: {e}")
            raise
    
    def chunk_text(self, text: str) -> List[str]:
        """Split text into overlapping chunks"""
        if len(text) <= Config.CHUNK_SIZE:
            return [text]
        
        chunks = []
        start = 0
        
        while start < len(text):
            end = start + Config.CHUNK_SIZE
            chunk = text[start:end]
            
            # Try to break at sentence boundaries
            if end < len(text):
                last_period = chunk.rfind('.')
                last_newline = chunk.rfind('\n')
                break_point = max(last_period, last_newline)
                
                if break_point > start + Config.CHUNK_SIZE // 2:
                    chunk = text[start:break_point + 1]
                    end = break_point + 1
            
            chunks.append(chunk.strip())
            start = end - Config.CHUNK_OVERLAP
            
            if start >= len(text):
                break
        
        return chunks
    
    def save_vectors(self):
        """Save TF-IDF vectors to disk"""
        try:
            vectors_path = os.path.join(Config.CHROMA_DB_PATH, "tfidf_vectors.pkl")
            vectorizer_path = os.path.join(Config.CHROMA_DB_PATH, "tfidf_vectorizer.pkl")
            docs_path = os.path.join(Config.CHROMA_DB_PATH, "documents.pkl")
            
            os.makedirs(Config.CHROMA_DB_PATH, exist_ok=True)
            
            with open(vectors_path, 'wb') as f:
                pickle.dump(self.document_vectors, f)
            
            with open(vectorizer_path, 'wb') as f:
                pickle.dump(self.vectorizer, f)
                
            with open(docs_path, 'wb') as f:
                pickle.dump({
                    'documents': self.documents,
                    'metadata': self.document_metadata
                }, f)
                
            logger.info("TF-IDF vectors and documents saved successfully")
        except Exception as e:
            logger.error(f"Failed to save vectors: {e}")
    
    def load_vectors(self):
        """Load TF-IDF vectors from disk"""
        try:
            vectors_path = os.path.join(Config.CHROMA_DB_PATH, "tfidf_vectors.pkl")
            vectorizer_path = os.path.join(Config.CHROMA_DB_PATH, "tfidf_vectorizer.pkl")
            docs_path = os.path.join(Config.CHROMA_DB_PATH, "documents.pkl")
            
            if all(os.path.exists(p) for p in [vectors_path, vectorizer_path, docs_path]):
                with open(vectors_path, 'rb') as f:
                    self.document_vectors = pickle.load(f)
                
                with open(vectorizer_path, 'rb') as f:
                    self.vectorizer = pickle.load(f)
                    
                with open(docs_path, 'rb') as f:
                    data = pickle.load(f)
                    self.documents = data['documents']
                    self.document_metadata = data['metadata']
                
                logger.info(f"Loaded {len(self.documents)} documents from disk")
                return True
            return False
        except Exception as e:
            logger.error(f"Failed to load vectors: {e}")
            return False
    
    def load_portfolio_data(self):
        """Load and process the portfolio data"""
        try:
            # Try to load existing vectors first
            if self.load_vectors():
                logger.info("Using existing TF-IDF vectors")
                return
            
            # Read the portfolio data file
            with open(Config.DATA_FILE, "r", encoding="utf-8") as file:
                portfolio_text = file.read()
            
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
            
            # Process each section and create documents
            self.documents = []
            self.document_metadata = []
            
            for i, section in enumerate(sections):
                # Create chunks from the section
                chunks = self.chunk_text(section['content'])
                
                for j, chunk in enumerate(chunks):
                    self.documents.append(chunk)
                    self.document_metadata.append({
                        'section_title': section['title'],
                        'chunk_index': j,
                        'section_index': i,
                        'id': f"section_{i}_chunk_{j}"
                    })
            
            # Generate TF-IDF vectors
            logger.info("Generating TF-IDF vectors for portfolio data...")
            self.document_vectors = self.vectorizer.fit_transform(self.documents)
            
            # Save vectors to disk
            self.save_vectors()
            
            logger.info(f"Successfully processed {len(self.documents)} document chunks")
            
        except Exception as e:
            logger.error(f"Failed to load portfolio data: {e}")
            raise
    
    def query_documents(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        """Query documents using TF-IDF similarity"""
        try:
            # Transform query using fitted vectorizer
            query_vector = self.vectorizer.transform([query])
            
            # Calculate cosine similarity
            similarities = cosine_similarity(query_vector, self.document_vectors).flatten()
            
            # Get top results
            top_indices = np.argsort(similarities)[::-1][:n_results]
            
            # Format results
            formatted_results = []
            for idx in top_indices:
                if similarities[idx] > 0:  # Only include relevant results
                    formatted_results.append({
                        'content': self.documents[idx],
                        'metadata': self.document_metadata[idx],
                        'similarity': float(similarities[idx])
                    })
            
            return formatted_results
            
        except Exception as e:
            logger.error(f"Failed to query documents: {e}")
            return []
    
    def query_chromadb(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        """Query documents (keeping same interface)"""
        return self.query_documents(query, n_results)
    
    def generate_response_with_memory(self, query: str, context: str, conversation_history: List[str]) -> str:
        """Generate response using conversation history + RAG context"""
        try:
            # Build conversation history string
            history_str = ""
            if conversation_history:
                recent_history = conversation_history[-Config.CONTEXT_HISTORY_LIMIT:]
                history_str = "Previous conversation:\n" + "\n".join(recent_history) + "\n\n"
            
            prompt = f"""You are Taofik Akanbi, a Data Scientist. You're having a casual conversation with someone visiting your portfolio website.

{history_str}Context from your portfolio:
{context}

Current user question: {query}

STRICT INSTRUCTIONS - FOLLOW THESE EXACTLY:
- You ARE Taofik Akanbi - speak in first person as yourself, not as a representative
- ONLY answer questions about your work, experience, projects, and skills
- NEVER make up or invent information not in the provided context
- If asked about something not in the context, say "I don't have that information readily available"
- DO NOT answer questions about other people, companies, or topics unrelated to you
- DO NOT provide general advice, tutorials, or how-to guides
- DO NOT make claims about your current employment status unless explicitly stated in context
- Keep responses SHORT and conversational (1-3 sentences max)
- Be friendly and authentic, like you're personally chatting with a visitor
- If someone asks about your capabilities, say "I can tell you about my experience and projects"

FORBIDDEN TOPICS - DO NOT RESPOND TO:
- Requests to help with coding, debugging, or technical tutorials
- Questions about other data scientists or professionals
- General career advice not specific to your experience
- Current events, news, or topics outside your portfolio
- Requests to generate code, write emails, or create content
- Questions about salary, compensation, or financial details not in context

If asked about forbidden topics, respond: "I'm here to chat about my work and experience. What would you like to know about my projects or background?"

Response:"""

            response = together.Complete.create(
                prompt=prompt,
                model=Config.LLM_MODEL,
                max_tokens=Config.MAX_TOKENS,
                temperature=Config.TEMPERATURE,
                top_p=Config.TOP_P,
                repetition_penalty=Config.REPETITION_PENALTY,
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
    
    def process_chat_message(self, message: str, session_id: str) -> str:
        """Process a chat message with memory and RAG"""
        # Initialize conversation history for new sessions
        if session_id not in self.conversations:
            self.conversations[session_id] = []
        
        # Query documents for relevant context
        relevant_docs = self.query_documents(message, n_results=3)
        context = "\n\n".join([doc['content'] for doc in relevant_docs])
        
        # Generate response with conversation history
        response = self.generate_response_with_memory(
            message, 
            context, 
            self.conversations[session_id]
        )
        
        # Store conversation (keep last N exchanges for better context)
        self.conversations[session_id].append(f"User: {message}")
        self.conversations[session_id].append(f"Assistant: {response}")
        
        # Keep only recent messages to prevent memory overflow
        if len(self.conversations[session_id]) > Config.MAX_CONVERSATION_HISTORY:
            self.conversations[session_id] = self.conversations[session_id][-Config.MAX_CONVERSATION_HISTORY:]
        
        return response
    
    def clear_conversation(self, session_id: str) -> bool:
        """Clear conversation history for a session"""
        if session_id in self.conversations:
            del self.conversations[session_id]
            logger.info(f"Cleared conversation for session: {session_id}")
            return True
        return False
    
    def get_conversation_history(self, session_id: str) -> List[str]:
        """Get conversation history for a session"""
        return self.conversations.get(session_id, [])
    
    def get_stats(self) -> Dict[str, Any]:
        """Get service statistics"""
        total_messages = sum(len(conv) for conv in self.conversations.values())
        return {
            "active_sessions": len(self.conversations),
            "total_messages": total_messages,
            "chromadb_documents": len(self.documents) if self.documents else 0
        }
    
    def initialize_all(self):
        """Initialize all components"""
        self.initialize_embedding_model()
        self.initialize_chromadb()
        self.load_portfolio_data()
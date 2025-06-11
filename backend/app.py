# app.py - Main FastAPI application
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import ChatMessage, ChatResponse, Config
from rag_service import RAGService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Taofik Portfolio RAG API with Memory", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG service
rag_service = RAGService()

@app.on_event("startup")
async def startup_event():
    """Initialize models and data on startup"""
    logger.info("Starting up RAG backend with memory...")
    
    # Check for Together AI API key
    if not Config.TOGETHER_API_KEY:
        logger.error("TOGETHER_API_KEY not found in environment variables")
        raise RuntimeError("TOGETHER_API_KEY is required")
    
    # Initialize all RAG components
    rag_service.initialize_all()
    
    logger.info("RAG backend with memory startup completed successfully")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Taofik Portfolio RAG API with Memory is running!"}

@app.get("/health")
async def health_check():
    """Detailed health check"""
    try:
        # Get stats from RAG service
        stats = rag_service.get_stats()
        
        # Test Together AI connection
        import together
        test_response = together.Complete.create(
            prompt="Hello",
            model=Config.LLM_MODEL,
            max_tokens=5
        )
        
        together_status = "connected" if test_response else "error"
        
        return {
            "status": "healthy",
            "chromadb_documents": stats["chromadb_documents"],
            "together_ai": together_status,
            "embedding_model": "loaded",
            "active_conversations": stats["active_sessions"]
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
        
        # Process message through RAG service
        response = rag_service.process_chat_message(user_query, session_id)
        
        return ChatResponse(response=response, session_id=session_id)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/chat/{session_id}")
async def clear_conversation(session_id: str):
    """Clear conversation history for a session"""
    success = rag_service.clear_conversation(session_id)
    if success:
        return {"message": f"Conversation {session_id} cleared"}
    else:
        return {"message": f"No conversation found for session {session_id}"}

@app.get("/chat/{session_id}/history")
async def get_conversation_history(session_id: str):
    """Get conversation history for a session"""
    history = rag_service.get_conversation_history(session_id)
    return {
        "session_id": session_id, 
        "history": history,
        "message_count": len(history)
    }

@app.get("/stats")
async def get_stats():
    """Get API statistics"""
    return rag_service.get_stats()

@app.get("/search/{query}")
async def search_portfolio(query: str):
    """Search portfolio data endpoint"""
    try:
        results = rag_service.query_chromadb(query, n_results=5)
        return {"query": query, "results": results}
    except Exception as e:
        logger.error(f"Error in search endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
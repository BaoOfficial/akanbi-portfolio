# models.py - Pydantic models and configuration
from pydantic import BaseModel
from typing import List, Dict, Any
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class ChatMessage(BaseModel):
    message: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    response: str
    session_id: str

class Config:
    """Application configuration"""
    TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
    CORS_ORIGINS = [
        "http://localhost:3000", 
        "http://localhost:5173", 
        "https://akanbi.onrender.com",
        "https://akanbi-taofik.onrender.com"
    ]
    CHROMA_DB_PATH = "./chroma_db"
    COLLECTION_NAME = "taofik_portfolio"
    DATA_FILE = "akandi_data.txt"
    
    # Model parameters - TF-IDF instead of sentence-transformers
    EMBEDDING_MODEL = 'tfidf'  # Changed from sentence-transformer model
    LLM_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"
    MAX_TOKENS = 150
    TEMPERATURE = 0.7
    TOP_P = 0.8
    REPETITION_PENALTY = 1.2
    
    # Memory settings
    MAX_CONVERSATION_HISTORY = 12
    CONTEXT_HISTORY_LIMIT = 6
    
    # Chunk settings
    CHUNK_SIZE = 1000
    CHUNK_OVERLAP = 200
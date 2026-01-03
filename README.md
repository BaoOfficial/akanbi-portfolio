# Taofik Akanbi - Portfolio Website

Personal portfolio website for Taofik Akanbi, Data Scientist & Machine Learning Engineer, featuring an intelligent AI chatbot that answers questions about his experience, skills, and projects using Retrieval-Augmented Generation (RAG).

🔗 **Live Site**: [https://akanbi-taofik.onrender.com/](https://akanbi-taofik.onrender.com/)

## Features

- **AI-Powered Chatbot**: Interactive chat interface powered by RAG technology
- **Smart Context Retrieval**: Uses TF-IDF embeddings for efficient semantic search
- **Conversation Memory**: Maintains chat history for contextual responses
- **Responsive Design**: Fully responsive UI built with React and Tailwind CSS
- **Smooth Animations**: Engaging scroll animations and typing effects
- **Portfolio Showcase**: Projects, skills, experience, and contact sections

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **ChromaDB** - Vector database for metadata storage
- **TF-IDF (scikit-learn)** - Lightweight text embeddings
- **Together AI** - LLM inference (Mixtral-8x7B-Instruct)
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **React Router** - Client-side routing
- **AOS** - Scroll animations
- **React Icons** - Icon library

## Architecture

The project uses a **hybrid RAG approach** optimized for performance and cost:

1. **TF-IDF Vectorizer**: Lightweight embeddings stored as pickled files
2. **ChromaDB**: Metadata storage and document management
3. **Together AI**: LLM response generation with conversation context

### Data Flow
```
User Message → Frontend → Backend API → RAG Service
                                          ↓
                          TF-IDF Search → Relevant Chunks
                                          ↓
                          Together AI → Context + History → Response
                                          ↓
Frontend ← JSON Response ← Backend API ←
```

## Development Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Together AI API key

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "TOGETHER_API_KEY=your_api_key_here" > .env

# Run the backend server
uvicorn app:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`
- API docs: `http://localhost:8000/docs`

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "VITE_BACKEND_URL=http://localhost:8000" > .env

# Run the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Environment Variables

### Backend (`.env`)
```env
TOGETHER_API_KEY=your_together_ai_api_key
```

### Frontend (`.env`)
```env
VITE_BACKEND_URL=http://localhost:8000
```

## API Endpoints

### Chat
- `POST /chat` - Send a message and get AI response
  ```json
  {
    "message": "What are Taofik's skills?",
    "session_id": "user-123"
  }
  ```

- `GET /chat/{session_id}/history` - Get conversation history
- `DELETE /chat/{session_id}` - Clear conversation

### Utility
- `GET /health` - Health check with system status
- `GET /stats` - API statistics
- `GET /search/{query}` - Direct search (no LLM)

## Project Structure

```
akanbi-portfolio/
├── backend/
│   ├── app.py                 # FastAPI application
│   ├── models.py              # Pydantic models & config
│   ├── rag_service.py         # RAG logic & embeddings
│   ├── akandi_data.txt        # Knowledge base
│   ├── chroma_db/             # ChromaDB storage
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Components/
│   │   │   ├── AdvancedChatInterface.jsx
│   │   │   ├── Home/
│   │   │   ├── AboutMe/
│   │   │   ├── Projects/
│   │   │   ├── Services/
│   │   │   └── Contact/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Development

### Run Tests
```bash
# Backend
cd backend
pytest  # (if tests are added)

# Frontend
cd frontend
npm run lint
```

### Build for Production
```bash
# Backend - run with production server
uvicorn app:app --host 0.0.0.0 --port 8000

# Frontend
npm run build
npm run preview
```

## Deployment

This project is deployed on **Render**:
- Backend: `https://akanbi-port.onrender.com`
- Frontend: `https://akanbi.onrender.com`

### Deploy to Render

1. **Backend**: Connect GitHub repo, set build command to `pip install -r requirements.txt`, start command to `uvicorn app:app --host 0.0.0.0 --port 8000`
2. **Frontend**: Set build command to `npm install && npm run build`, publish directory to `dist`
3. Add environment variables in Render dashboard

## RAG System Details

### Conversation Memory
- Stores up to 12 messages per session
- Uses last 6 messages for context in prompts
- In-memory storage (resets on server restart)

### Text Chunking
- Chunk size: 1000 characters
- Overlap: 200 characters
- Smart sentence boundary detection

### LLM Configuration
- Model: `mistralai/Mixtral-8x7B-Instruct-v0.1`
- Max tokens: 150
- Temperature: 0.7
- Top-p: 0.8
- Repetition penalty: 1.2

## Contact

abdullahbadru66@gmail.com
https://www.linkedin.com/in/abdullahibadrudeen
+234 903 4869 909
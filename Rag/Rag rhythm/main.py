from typing import Optional, List
import os
import shutil
from dotenv import load_dotenv
import google.generativeai as genai
from chromadb import Client, Settings
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from langchain.text_splitter import RecursiveCharacterTextSplitter
from PyPDF2 import PdfReader

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Circadian RAG API")

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# List available models
print("Available models:")
for m in genai.list_models():
    print(f"- {m.name}")

# Initialize ChromaDB with default embeddings
import os

# Set up ChromaDB persistence directory
CHROMA_DB_PATH = os.path.join(os.path.dirname(__file__), "data", "chroma_db")
os.makedirs(CHROMA_DB_PATH, exist_ok=True)

# Initialize ChromaDB with persistent storage
chroma_client = Client(Settings(
    persist_directory=CHROMA_DB_PATH,
    is_persistent=True
))

# Create or get collection
try:
    # Try to get existing collection
    collection = chroma_client.get_collection(
        name="circadian_knowledge"
    )
    print("Found existing collection")
except:
    # Create new collection if it doesn't exist
    collection = chroma_client.create_collection(
        name="circadian_knowledge",
        metadata={"description": "Circadian rhythm and wellness knowledge base"}
    )
    print("Created new collection")

def extract_text_from_pdf(file_path: str) -> str:
    """Extract text from a PDF file."""
    with open(file_path, 'rb') as file:
        pdf_reader = PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    return text

def split_text(text: str) -> List[str]:
    """Split text into chunks using LangChain's text splitter."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    return text_splitter.split_text(text)

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload and process a PDF file.
    """
    try:
        # Create upload directory if it doesn't exist
        upload_dir = os.path.join(os.path.dirname(__file__), "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save the uploaded file
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        print(f"Processing PDF file: {file_path}")
        
        # Extract text from PDF
        content = extract_text_from_pdf(file_path)
        chunks = split_text(content)
        
        print(f"Extracted {len(chunks)} text chunks from PDF")
        
        # Prepare documents for insertion
        ids = [f"doc_{i}_{file.filename}" for i in range(len(chunks))]
        metadatas = [{
            "source": file.filename,
            "page": i // 2,  # Approximate page number
            "chunk": i,
            "total_chunks": len(chunks)
        } for i in range(len(chunks))]
        
        # Add documents to collection
        collection.add(
            documents=chunks,
            ids=ids,
            metadatas=metadatas
        )
        
        print(f"Added {len(chunks)} chunks to ChromaDB")
        
        # Verify the data was added
        count = len(collection.get(
            include=['documents', 'metadatas'])['ids']
        )
        
        # Clean up the uploaded file
        os.remove(file_path)
        
        return {
            "message": f"Successfully processed and stored {file.filename}",
            "chunks": len(chunks),
            "total_documents_in_collection": count,
            "collection_name": "circadian_knowledge"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class Query(BaseModel):
    text: str
    screen_time: Optional[int] = None  # Screen time in minutes
    current_time: Optional[str] = None  # Current time in HH:MM format

@app.post("/analyze")
async def analyze_query(query: Query):
    try:
        # Search relevant context from ChromaDB
        results = collection.query(
            query_texts=[query.text],
            n_results=3,
            include=['documents', 'metadatas', 'distances']
        )
        
        # Prepare context for Gemini by joining the most relevant documents
        context = "\n".join(results['documents'][0] if results['documents'] else [])
        
        # Create optimized prompt for faster, more focused responses
        prompt = f"""Analyze screen time impact and provide quick, actionable advice based on circadian science.

        CONTEXT: {context}

        CURRENT STATUS:
        - Time: {query.current_time}
        - Screen Time: {query.screen_time} min
        - Issue: {query.text}

        Provide a fast, structured response:

        1. QUICK ASSESSMENT:
        • Screen impact
        • Time-specific risks
        • Alertness concerns

        2. IMMEDIATE ACTIONS (2-3 key steps):
        • What to do now
        • Next 30 minutes
        • Screen adjustments

        3. QUICK HABITS:
        • Daily timing guide
        • Prevention tips

        Keep responses concise and actionable. Use bullet points."""

        # Use the latest stable Gemini Pro model
        model = genai.GenerativeModel('gemini-pro-latest')
        
        # Configure the model for stable, focused responses
        generation_config = {
            "temperature": 0.3,  # Lower temperature for more focused outputs
            "top_p": 0.8,
            "max_output_tokens": 1024,  # Shorter responses for faster generation
        }
        
        # Generate response
        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )
        
        # Use the response directly as gemini-1.0-pro doesn't require streaming handling

        return {
            "recommendation": response.text,
            "sources": results['metadatas'][0] if results['metadatas'] else []
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "collection_name": "circadian_knowledge"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
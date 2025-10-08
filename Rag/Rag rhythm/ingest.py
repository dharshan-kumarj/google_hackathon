import os
from typing import List
import chromadb
from chromadb import Client, Settings
from langchain.text_splitter import RecursiveCharacterTextSplitter

def load_book_content(file_path: str) -> str:
    """Load book content from a text file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def split_text(text: str) -> List[str]:
    """Split text into chunks using LangChain's text splitter."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    return text_splitter.split_text(text)

def ingest_documents(file_paths: List[str]):
    """Ingest documents into ChromaDB."""
    # Initialize ChromaDB
    client = Client(Settings(
        persist_directory="../data/chroma_db"
    ))
    
    # Create or get collection
    collection = client.get_or_create_collection(
        name="circadian_knowledge",
        metadata={"description": "Circadian rhythm and wellness knowledge base"}
    )
    
    for file_path in file_paths:
        # Load and split content
        content = load_book_content(file_path)
        chunks = split_text(content)
        
        # Prepare documents for insertion
        ids = [f"doc_{i}_{os.path.basename(file_path)}" for i in range(len(chunks))]
        metadatas = [{"source": os.path.basename(file_path)} for _ in chunks]
        
        # Add documents to collection
        collection.add(
            documents=chunks,
            ids=ids,
            metadatas=metadatas
        )
        
        print(f"Ingested {len(chunks)} chunks from {file_path}")

if __name__ == "__main__":
    # Specify the paths to your book text files
    book_paths = [
        "../data/circadian_code.txt",
        "../data/lifetime.txt"
    ]
    
    ingest_documents(book_paths)
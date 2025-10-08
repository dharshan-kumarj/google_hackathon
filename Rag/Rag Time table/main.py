from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions
import json
from datetime import datetime
import PyPDF2
import io

# Load API key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize ChromaDB for RAG - Timetable Memory System
# Store database persistently in the time_manager folder
import os
CHROMA_DB_PATH = os.path.join(os.path.dirname(__file__), "chromadb_storage")

# Create persistent ChromaDB client
chroma_client = chromadb.PersistentClient(path=CHROMA_DB_PATH)

# Collection for storing successful timetables and user patterns
try:
    timetable_memory = chroma_client.get_or_create_collection(
        name="timetable_memory",
        embedding_function=embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
    )
    
    # Collection for study materials (optional)
    study_materials = chroma_client.get_or_create_collection(
        name="study_materials",
        embedding_function=embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
    )
    print(f"✅ ChromaDB initialized successfully at: {CHROMA_DB_PATH}")
except Exception as e:
    # Fallback to default embedding if sentence-transformers fails
    print(f"Warning: Using default embeddings due to: {e}")
    timetable_memory = chroma_client.get_or_create_collection(name="timetable_memory")
    study_materials = chroma_client.get_or_create_collection(name="study_materials")
    print(f"✅ ChromaDB initialized with default embeddings at: {CHROMA_DB_PATH}")

# FastAPI app
app = FastAPI(title="Smart Time Management Assistant with RAG")

# Pydantic models for input
class TaskInput(BaseModel):
    query: str  # Natural language input like "tomorrow maths exam, day after tomorrow project submission"

class Task(BaseModel):
    name: str
    deadline: str
    priority: str  # A, B, C, D, E (Eat That Frog ABCDE method)
    difficulty: int  # 1-10 scale
    importance: int  # 1-10 scale
    estimated_hours: int
    description: Optional[str] = ""

class FrogAnalysis(BaseModel):
    tasks: List[Task]
    apply_eat_that_frog: bool = True

@app.post("/identify_frogs/")
async def identify_frogs(task_input: TaskInput):
    """Identify the 'frogs' (most important/difficult tasks) using Eat That Frog principles"""
    try:
        # Get Eat That Frog knowledge from RAG
        etf_context = study_materials.query(
            query_texts=["ABCDE method priority eat that frog Brian Tracy"],
            n_results=3
        )
        
        etf_knowledge = ""
        if etf_context['documents'] and etf_context['documents'][0]:
            etf_knowledge = "Based on Eat That Frog principles:\n" + "\n".join(etf_context['documents'][0][:2])
        
        prompt = f"""
        You are an expert in Brian Tracy's "Eat That Frog!" methodology. Analyze these tasks and identify the "frogs":
        
        {etf_knowledge}
        
        User's tasks: "{task_input.query}"
        
        Apply the ABCDE Method:
        - A: Must do - serious consequences if not completed
        - B: Should do - mild consequences if not completed  
        - C: Nice to do - no consequences if not completed
        - D: Delegate - can be done by someone else
        - E: Eliminate - unnecessary tasks
        
        For each task, determine:
        1. ABCDE priority level
        2. Difficulty (1-10)
        3. Importance (1-10)
        4. Estimated hours needed
        5. Which task is the "biggest frog" (most important A task)
        
        Return a JSON structure identifying each task with its frog analysis.
        """
        
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        
        return {"frog_analysis": response.text, "methodology": "Eat That Frog ABCDE Method"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_timetable/")
async def generate_timetable(task_input: TaskInput):
    try:
        # Retrieve relevant timetable patterns and past successful schedules
        retrieved_context = timetable_memory.query(
            query_texts=[task_input.query],
            n_results=5
        )
        
        # Get Eat That Frog principles from study materials
        etf_context = study_materials.query(
            query_texts=["eat that frog first thing morning productivity"],
            n_results=3
        )
        
        # Prepare context from retrieved documents
        context_info = ""
        if retrieved_context['documents'] and retrieved_context['documents'][0]:
            context_info = "Here are similar past timetables and patterns that worked well for you:\n\n"
            for doc in retrieved_context['documents'][0]:
                context_info += f"- {doc}\n"
            context_info += "\nUse these insights to create a better personalized schedule.\n"
        
        # Add Eat That Frog context
        etf_info = ""
        if etf_context['documents'] and etf_context['documents'][0]:
            etf_info = "\nEat That Frog! Principles to apply:\n"
            for doc in etf_context['documents'][0]:
                etf_info += f"- {doc[:200]}...\n"
        
        prompt = f"""
        You are a smart AI time management assistant trained in Brian Tracy's "Eat That Frog!" methodology. Today is October 7, 2025.
        
        The user has given you this natural language input: "{task_input.query}"
        
        {context_info}
        {etf_info}
        
        **EAT THAT FROG! METHODOLOGY - APPLY THESE PRINCIPLES:**
        
        1. **Identify the Frog**: Find the most important, difficult task (A priority)
        2. **ABCDE Method**: Categorize all tasks:
           - A: Must do (serious consequences if not done)
           - B: Should do (mild consequences)
           - C: Nice to do (no consequences)
           - D: Delegate
           - E: Eliminate
        3. **Eat the Ugliest Frog First**: Schedule A-priority tasks in the morning when energy is highest
        4. **Apply 80/20 Rule**: Focus on the 20% of tasks that give 80% of results
        5. **Single Handling**: Complete one task before moving to the next
        6. **Prepare Thoroughly**: Plan the night before
        
        Your task:
        1. Parse the input to identify tasks and their relative dates (tomorrow, day after tomorrow, next week, etc.)
        2. Convert relative dates to actual dates starting from today (October 7, 2025)
        3. **PRIORITIZE using ABCDE method** - identify which tasks are frogs (A priorities)
        4. **Schedule frogs FIRST** - put most important tasks in morning slots (8-11 AM)
        5. Create a detailed hour-by-hour timetable with "frog sessions" clearly marked
        6. Include preparation time, breaks, meals, and realistic allocations
        7. Apply the 80/20 rule to focus on high-impact activities
        8. Mark which tasks are "FROGS 🐸" in the timetable
        
        **IMPORTANT: Return the timetable in TABLE FORMAT using markdown tables.**
        
        Format each day like this:
        
        ## Monday, October 7, 2025
        | Time | Activity | Task/Subject | Priority | Notes |
        |------|----------|--------------|----------|-------|
        | 7:00 AM - 8:00 AM | Morning Routine | - | - | Breakfast, get ready, review day |
        | 8:00 AM - 10:00 AM | 🐸 FROG SESSION | Maths Exam Prep | A | Most important task first! |
        | 10:00 AM - 10:15 AM | Break | - | - | Short energy break |
        | 10:15 AM - 12:00 PM | 🐸 FROG SESSION | Project Work | A | Second most important |
        
        Continue this table format for each day until all deadlines are met.
        Include realistic time for meals, breaks, and sleep.
        Make it actionable and specific with clear time slots.
        """

        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        
        # Store this timetable for future learning and reference
        timetable_memory.add(
            documents=[f"Query: {task_input.query}\nGenerated Timetable: {response.text[:500]}..."],
            metadatas=[{
                "type": "generated_timetable", 
                "query": task_input.query,
                "date": datetime.now().isoformat(),
                "rating": 0  # Will be updated when user provides feedback
            }],
            ids=[f"timetable_{datetime.now().timestamp()}"]
        )

        return {"timetable": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload_study_material/")
async def upload_study_material(file: UploadFile = File(...), subject: str = "general"):
    """Upload PDF study materials, syllabi, or notes to enhance RAG context"""
    try:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are supported")
        
        # Read PDF content
        content = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        
        # Extract text from all pages
        text_content = ""
        for page in pdf_reader.pages:
            text_content += page.extract_text() + "\n"
        
        # Split into chunks for better retrieval
        chunks = [text_content[i:i+1000] for i in range(0, len(text_content), 800)]
        
        # Store in ChromaDB
        for i, chunk in enumerate(chunks):
            study_materials.add(
                documents=[chunk],
                metadatas=[{
                    "type": "study_material",
                    "subject": subject,
                    "filename": file.filename,
                    "chunk": i,
                    "upload_date": datetime.now().isoformat()
                }],
                ids=[f"{file.filename}_{subject}_{i}_{datetime.now().timestamp()}"]
            )
        
        return {"message": f"Successfully uploaded {file.filename} with {len(chunks)} chunks", "subject": subject}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/add_study_note/")
async def add_study_note(note: str, subject: str = "general", topic: str = ""):
    """Add text-based study notes or important information"""
    try:
        study_materials.add(
            documents=[note],
            metadatas=[{
                "type": "study_note",
                "subject": subject,
                "topic": topic,
                "date": datetime.now().isoformat()
            }],
            ids=[f"note_{subject}_{datetime.now().timestamp()}"]
        )
        
        return {"message": "Study note added successfully", "subject": subject, "topic": topic}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/search_materials/")
async def search_materials(query: str, n_results: int = 5):
    """Search through stored study materials and notes"""
    try:
        results = study_materials.query(
            query_texts=[query],
            n_results=n_results
        )
        
        return {
            "query": query,
            "results": results['documents'][0] if results['documents'] else [],
            "metadata": results['metadatas'][0] if results['metadatas'] else []
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/complete_frog/")
async def complete_frog(task_name: str, completion_time: str, difficulty_actual: int, notes: str = ""):
    """Mark a frog (important task) as completed - builds momentum and tracks productivity"""
    try:
        # Store frog completion for momentum tracking
        timetable_memory.add(
            documents=[f"🐸 FROG COMPLETED: {task_name} at {completion_time}. Difficulty: {difficulty_actual}/10. Notes: {notes}"],
            metadatas=[{
                "type": "frog_completion",
                "task_name": task_name,
                "completion_time": completion_time,
                "difficulty_actual": difficulty_actual,
                "notes": notes,
                "date": datetime.now().isoformat(),
                "day_of_week": datetime.now().strftime("%A")
            }],
            ids=[f"frog_done_{datetime.now().timestamp()}"]
        )
        
        return {
            "message": f"🎉 Congratulations! You ate your frog: '{task_name}'", 
            "momentum": "You're building great productivity habits!",
            "next_action": "What's your next most important task?"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/daily_frog_report/")
async def daily_frog_report(date: str = "today"):
    """Get report of frogs completed and productivity momentum"""
    try:
        if date == "today":
            date = datetime.now().strftime("%Y-%m-%d")
        
        # Search for completed frogs
        completed_frogs = timetable_memory.query(
            query_texts=["frog completed task"],
            n_results=10
        )
        
        # Count frogs completed in recent days
        recent_completions = []
        if completed_frogs['documents'] and completed_frogs['documents'][0]:
            recent_completions = completed_frogs['documents'][0]
        
        return {
            "date": date,
            "frogs_completed_recently": len(recent_completions),
            "recent_frog_completions": recent_completions,
            "momentum_message": "Great job eating your frogs! 🐸" if recent_completions else "Time to identify and eat your first frog! 🐸",
            "productivity_trend": "Building momentum" if len(recent_completions) > 0 else "Ready to start"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rate_timetable/")
async def rate_timetable(timetable_id: str, rating: int, feedback: str = ""):
    """Rate a timetable's effectiveness (1-5 stars) for future learning"""
    try:
        if rating < 1 or rating > 5:
            raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
        
        # Store feedback for future timetable generation
        timetable_memory.add(
            documents=[f"Timetable feedback: Rating {rating}/5. {feedback}"],
            metadatas=[{
                "type": "timetable_feedback",
                "timetable_id": timetable_id,
                "rating": rating,
                "feedback": feedback,
                "date": datetime.now().isoformat()
            }],
            ids=[f"feedback_{timetable_id}_{datetime.now().timestamp()}"]
        )
        
        return {"message": f"Thank you! Rated {rating}/5 stars", "timetable_id": timetable_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/add_user_preference/")
async def add_user_preference(preference_type: str, preference_value: str, description: str = ""):
    """Store user preferences like 'best_study_time': '9AM-11AM' or 'break_duration': '15 minutes'"""
    try:
        timetable_memory.add(
            documents=[f"User preference: {preference_type} = {preference_value}. {description}"],
            metadatas=[{
                "type": "user_preference",
                "preference_type": preference_type,
                "preference_value": preference_value,
                "description": description,
                "date": datetime.now().isoformat()
            }],
            ids=[f"pref_{preference_type}_{datetime.now().timestamp()}"]
        )
        
        return {"message": "Preference saved", "type": preference_type, "value": preference_value}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get_memory_stats/")
async def get_memory_stats():
    """Check what's stored in ChromaDB memory"""
    try:
        # Get count of documents in each collection
        timetable_count = timetable_memory.count()
        materials_count = study_materials.count()
        
        # Get recent timetables
        recent_timetables = timetable_memory.query(
            query_texts=["recent timetable"],
            n_results=3
        )
        
        return {
            "timetable_memory_count": timetable_count,
            "study_materials_count": materials_count,
            "recent_timetables": recent_timetables['documents'][0] if recent_timetables['documents'] else [],
            "recent_metadata": recent_timetables['metadatas'][0] if recent_timetables['metadatas'] else [],
            "storage_location": "In-memory ChromaDB (persistent across app restarts)"
        }
    
    except Exception as e:
        return {"error": str(e), "message": "ChromaDB collections might not be initialized yet"}

@app.get("/etf_recommendations/")
async def get_etf_recommendations():
    """Get personalized Eat That Frog recommendations based on your productivity patterns"""
    try:
        # Analyze productivity patterns
        completed_frogs = timetable_memory.query(
            query_texts=["frog completed productivity pattern"],
            n_results=5
        )
        
        # Get ETF principles from study materials
        etf_principles = study_materials.query(
            query_texts=["Brian Tracy productivity tips morning routine"],
            n_results=3
        )
        
        # Analyze patterns
        patterns_context = ""
        if completed_frogs['documents'] and completed_frogs['documents'][0]:
            patterns_context = "Your productivity patterns:\n" + "\n".join(completed_frogs['documents'][0])
        
        etf_context = ""
        if etf_principles['documents'] and etf_principles['documents'][0]:
            etf_context = "Eat That Frog principles:\n" + "\n".join(etf_principles['documents'][0][:2])
        
        prompt = f"""
        Based on Brian Tracy's "Eat That Frog!" methodology and the user's productivity patterns, provide personalized recommendations.
        
        {patterns_context}
        
        {etf_context}
        
        Provide 5 specific, actionable recommendations for improving productivity using ETF principles.
        Focus on:
        1. Best times to tackle frogs (most important tasks)
        2. How to identify A-priority tasks
        3. Morning routine suggestions
        4. Ways to eliminate time wasters
        5. Building momentum strategies
        """
        
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        
        return {
            "personalized_etf_recommendations": response.text,
            "based_on": "Your productivity patterns + Eat That Frog principles",
            "next_action": "Identify your biggest frog for tomorrow and schedule it first thing in the morning! 🐸"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/test_memory/")
async def test_memory():
    """Test if RAG is remembering previous timetables"""
    try:
        # Search for any stored timetables
        all_timetables = timetable_memory.query(
            query_texts=["timetable schedule exam"],
            n_results=10
        )
        
        # Search for user preferences
        preferences = timetable_memory.query(
            query_texts=["user preference study time"],
            n_results=5
        )
        
        return {
            "memory_test_results": {
                "stored_timetables": len(all_timetables['documents'][0]) if all_timetables['documents'] else 0,
                "stored_preferences": len(preferences['documents'][0]) if preferences['documents'] else 0,
                "sample_timetables": all_timetables['documents'][0][:2] if all_timetables['documents'] else [],
                "sample_preferences": preferences['documents'][0] if preferences['documents'] else []
            },
            "status": "RAG memory is working" if all_timetables['documents'] and all_timetables['documents'][0] else "No timetables stored yet"
        }
    
    except Exception as e:
        return {"error": str(e)}

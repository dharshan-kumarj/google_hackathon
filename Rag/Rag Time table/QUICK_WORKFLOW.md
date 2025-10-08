# 🐸 Smart Time Management System - Quick Workflow

## 🔄 Simple Workflow
```
Your Tasks → ETF PDF Knowledge → Smart Timetable → Your Feedback → Better Future Recommendations
```

## 📋 Step-by-Step Process

### 1. **Input Your Tasks** 📝
```
POST /generate_timetable/
{
  "query": "tomorrow math exam, next week project due"
}
```

### 2. **System Uses ETF Knowledge** 🧠
```
- Searches "Eat That Frog!" PDF (287 chunks stored)
- Applies ABCDE method (A=must do, B=should do, etc.)
- Identifies biggest "frogs" (most important tasks)
- Uses your past patterns
```

### 3. **Gets Smart Timetable** 📅
```
OUTPUT:
🐸 8:00-10:30 AM: FROG SESSION - Math Exam (A1 Priority)
🐸 10:45-12:30 PM: FROG SESSION - Math Practice (A1)
   1:30-3:00 PM: Project Work (A2 Priority)
   3:15-4:30 PM: Secondary tasks (B Priority)
```

### 4. **You Give Feedback** ⭐
```
POST /complete_frog/
{
  "task_name": "Math exam prep",
  "completion_time": "10:30 AM",
  "difficulty_actual": 8
}

POST /rate_timetable/
{
  "rating": 5,
  "feedback": "Perfect morning energy timing!"
}
```

### 5. **System Gets Smarter** 🚀
```
Your feedback → ChromaDB memory → Future timetables improved
- Learns your best study times
- Remembers what worked
- Applies ETF principles better
- Personalizes recommendations
```

## 🎯 Quick Start
1. Start server: `python -m uvicorn main:app --reload`
2. Go to: `http://127.0.0.1:8000/docs`
3. Upload ETF PDF: `/upload_study_material/`
4. Generate timetable: `/generate_timetable/`
5. Track progress: `/complete_frog/`

## 🐸 Core ETF Logic
- **Morning = Frog Time** (8-11 AM when energy is highest)
- **A-Priority First** (most important tasks scheduled first)
- **Multiple Frog Sessions** (big tasks broken into focused chunks)
- **80/20 Rule** (focus on high-impact activities)

**Result: AI-powered productivity using Brian Tracy's proven methodology!** ✨
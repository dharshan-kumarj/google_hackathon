from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
import httpx
import os
from dotenv import load_dotenv
from typing import Optional
from pydantic import BaseModel
from urllib.parse import urlencode

load_dotenv()

app = FastAPI(title="Google OAuth API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google OAuth configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "https://studybuddy-backend-du42.onrender.com/auth/google/callback")

# Google OAuth URLs
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


class TokenRequest(BaseModel):
    code: str


class TimetableInput(BaseModel):
    user_id: str
    subjects: list[str]
    study_hours_per_day: int
    exam_dates: Optional[dict] = None
    preferences: Optional[dict] = None


class WellnessInput(BaseModel):
    user_id: str
    stress_level: Optional[int] = None
    sleep_hours: Optional[float] = None
    activity_level: Optional[str] = None
    mood: Optional[str] = None
    notes: Optional[str] = None


@app.get("/")
async def root():
    return {"message": "Google OAuth API is running"}


@app.get("/auth/google")
async def google_login():
    """
    Returns the Google OAuth authorization URL
    """
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google Client ID not configured")
    
    auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={GOOGLE_CLIENT_ID}&"
        f"redirect_uri={GOOGLE_REDIRECT_URI}&"
        f"response_type=code&"
        f"scope=openid email profile&"
        f"access_type=offline&"
        f"prompt=consent"
    )
    
    return {"auth_url": auth_url}


@app.get("/auth/google/callback")
async def google_callback_get(code: str = None, error: str = None):
    """
    Handle Google OAuth callback (GET request from Google)
    Redirects to frontend with tokens or error
    """
    # Handle error from Google
    if error:
        frontend_url = f"https://studybuddy-asi5.onrender.com?error={error}"
        return RedirectResponse(url=frontend_url)
    
    if not code:
        raise HTTPException(status_code=400, detail="No authorization code provided")
    
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        raise HTTPException(status_code=500, detail="Google OAuth not configured")
    
    async with httpx.AsyncClient() as client:
        # Exchange code for access token
        token_data = {
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }
        
        try:
            token_response = await client.post(GOOGLE_TOKEN_URL, data=token_data)
            token_response.raise_for_status()
            tokens = token_response.json()
            
            access_token = tokens.get("access_token")
            if not access_token:
                raise HTTPException(status_code=400, detail="Failed to get access token")
            
            # Get user info
            headers = {"Authorization": f"Bearer {access_token}"}
            user_response = await client.get(GOOGLE_USERINFO_URL, headers=headers)
            user_response.raise_for_status()
            user_info = user_response.json()
            
            # Redirect to frontend with tokens
            params = {
                "access_token": access_token,
                "refresh_token": tokens.get("refresh_token", ""),
                "user_id": user_info.get("id"),
                "user_email": user_info.get("email"),
                "user_name": user_info.get("name"),
                "user_picture": user_info.get("picture"),
            }
            frontend_url = f"https://studybuddy-asi5.onrender.com?{urlencode(params)}"
            return RedirectResponse(url=frontend_url)
            
        except httpx.HTTPStatusError as e:
            error_msg = f"Google API error: {e.response.text}"
            frontend_url = f"https://studybuddy-asi5.onrender.com?error={error_msg}"
            return RedirectResponse(url=frontend_url)
        except Exception as e:
            error_msg = f"Internal error: {str(e)}"
            frontend_url = f"https://studybuddy-asi5.onrender.com?error={error_msg}"
            return RedirectResponse(url=frontend_url)


@app.post("/auth/google/callback")
async def google_callback_post(token_request: TokenRequest):
    """
    Exchange authorization code for access token and get user info (POST endpoint for direct API calls)
    """
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        raise HTTPException(status_code=500, detail="Google OAuth not configured")
    
    async with httpx.AsyncClient() as client:
        # Exchange code for access token
        token_data = {
            "code": token_request.code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }
        
        try:
            token_response = await client.post(GOOGLE_TOKEN_URL, data=token_data)
            token_response.raise_for_status()
            tokens = token_response.json()
            
            access_token = tokens.get("access_token")
            if not access_token:
                raise HTTPException(status_code=400, detail="Failed to get access token")
            
            # Get user info
            headers = {"Authorization": f"Bearer {access_token}"}
            user_response = await client.get(GOOGLE_USERINFO_URL, headers=headers)
            user_response.raise_for_status()
            user_info = user_response.json()
            
            return {
                "success": True,
                "user": {
                    "id": user_info.get("id"),
                    "email": user_info.get("email"),
                    "name": user_info.get("name"),
                    "picture": user_info.get("picture"),
                    "verified_email": user_info.get("verified_email"),
                },
                "tokens": {
                    "access_token": access_token,
                    "refresh_token": tokens.get("refresh_token"),
                    "expires_in": tokens.get("expires_in"),
                }
            }
            
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Google API error: {e.response.text}"
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


@app.get("/auth/user")
async def get_user_info(access_token: str):
    """
    Get user info using access token
    """
    async with httpx.AsyncClient() as client:
        try:
            headers = {"Authorization": f"Bearer {access_token}"}
            user_response = await client.get(GOOGLE_USERINFO_URL, headers=headers)
            user_response.raise_for_status()
            user_info = user_response.json()
            
            return {
                "success": True,
                "user": {
                    "id": user_info.get("id"),
                    "email": user_info.get("email"),
                    "name": user_info.get("name"),
                    "picture": user_info.get("picture"),
                    "verified_email": user_info.get("verified_email"),
                }
            }
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail="Invalid or expired token"
            )


@app.post("/rag/timetable_input")
async def timetable_input(timetable_data: TimetableInput):
    """
    Endpoint to receive timetable input from frontend and forward to RAG model
    """
    try:
        # TODO: Replace with your actual RAG model endpoint URL
        RAG_MODEL_URL = os.getenv("RAG_TIMETABLE_URL", "http://localhost:8001/generate_timetable")
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Forward the data to the RAG model endpoint
            response = await client.post(
                RAG_MODEL_URL,
                json=timetable_data.model_dump()
            )
            response.raise_for_status()
            result = response.json()
            
            return {
                "success": True,
                "message": "Timetable generation request processed",
                "data": result
            }
            
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"RAG model error: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Could not connect to RAG model service: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal error: {str(e)}"
        )


@app.post("/rag/wellness")
async def wellness_input(wellness_data: WellnessInput):
    """
    Endpoint to receive wellness input from frontend and forward to RAG model
    """
    try:
        # TODO: Replace with your actual RAG model endpoint URL
        RAG_MODEL_URL = os.getenv("RAG_WELLNESS_URL", "http://localhost:8001/analyze_wellness")
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Forward the data to the RAG model endpoint
            response = await client.post(
                RAG_MODEL_URL,
                json=wellness_data.model_dump()
            )
            response.raise_for_status()
            result = response.json()
            
            return {
                "success": True,
                "message": "Wellness analysis request processed",
                "data": result
            }
            
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"RAG model error: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Could not connect to RAG model service: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal error: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
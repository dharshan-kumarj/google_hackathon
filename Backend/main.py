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
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google OAuth configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")

# Google OAuth URLs
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


class TokenRequest(BaseModel):
    code: str


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
        frontend_url = f"http://localhost:5173?error={error}"
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
            frontend_url = f"http://localhost:5173?{urlencode(params)}"
            return RedirectResponse(url=frontend_url)
            
        except httpx.HTTPStatusError as e:
            error_msg = f"Google API error: {e.response.text}"
            frontend_url = f"http://localhost:5173?error={error_msg}"
            return RedirectResponse(url=frontend_url)
        except Exception as e:
            error_msg = f"Internal error: {str(e)}"
            frontend_url = f"http://localhost:5173?error={error_msg}"
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
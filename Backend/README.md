# Backend - FastAPI Google OAuth

FastAPI backend with Google OAuth 2.0 authentication endpoints.

## Quick Start

1. **Install dependencies:**
   ```bash
   pip install -e .
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your Google OAuth credentials
   ```

3. **Run the server:**
   ```bash
   python main.py
   ```

   Or using uvicorn:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### GET /auth/google
Returns Google OAuth authorization URL.

**Response:**
```json
{
  "auth_url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### POST /auth/google/callback
Exchange authorization code for user details and tokens.

**Request Body:**
```json
{
  "code": "authorization_code_from_google"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/...",
    "verified_email": true
  },
  "tokens": {
    "access_token": "ya29...",
    "refresh_token": "1//...",
    "expires_in": 3599
  }
}
```

### GET /auth/user
Get current user information using access token.

**Query Parameters:**
- `access_token`: Google access token

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/...",
    "verified_email": true
  }
}
```

## Environment Variables

Create a `.env` file with:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

## Dependencies

- fastapi - Web framework
- uvicorn - ASGI server
- httpx - Async HTTP client
- python-dotenv - Environment variable management
- python-jose - JWT token handling
- python-multipart - Form data parsing

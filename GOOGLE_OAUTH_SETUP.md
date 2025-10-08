# Google OAuth Setup Guide

## Prerequisites

1. **Google Cloud Console Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:8000/auth/google/callback`
     - `http://localhost:5173` (for frontend callback)
   - Copy the Client ID and Client Secret

## Backend Setup

1. **Install Dependencies**
   ```bash
   cd Backend
   pip install -e .
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your Google credentials:
     ```
     GOOGLE_CLIENT_ID=your_actual_client_id
     GOOGLE_CLIENT_SECRET=your_actual_client_secret
     GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
     ```

3. **Run the Backend**
   ```bash
   python main.py
   # Or using uvicorn directly:
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`

## Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd Frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## API Endpoints

### Backend Endpoints

1. **GET /auth/google**
   - Returns the Google OAuth authorization URL
   - Response: `{ "auth_url": "https://accounts.google.com/..." }`

2. **POST /auth/google/callback**
   - Exchange authorization code for user details
   - Body: `{ "code": "authorization_code" }`
   - Response:
     ```json
     {
       "success": true,
       "user": {
         "id": "...",
         "email": "user@example.com",
         "name": "User Name",
         "picture": "https://...",
         "verified_email": true
       },
       "tokens": {
         "access_token": "...",
         "refresh_token": "...",
         "expires_in": 3599
       }
     }
     ```

3. **GET /auth/user**
   - Get user info using access token
   - Query param: `access_token`
   - Response: User information

## Frontend Usage

The frontend includes a custom React hook `useGoogleAuth` that handles:

- **Login**: Redirects to Google OAuth
- **Callback Handling**: Automatically processes the OAuth callback
- **Token Storage**: Stores tokens in localStorage
- **User State Management**: Manages authenticated user state
- **Logout**: Clears stored tokens and user data

### Example Usage

```tsx
import { useGoogleAuth } from './hooks/useGoogleAuth'

function YourComponent() {
  const { 
    user, 
    loading, 
    error, 
    login, 
    logout, 
    isAuthenticated 
  } = useGoogleAuth()

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
    </div>
  )
}
```

## Security Notes

- Never commit your `.env` file with real credentials
- Use environment variables for sensitive data
- In production, update CORS origins and redirect URIs
- Consider implementing JWT tokens for session management
- Add HTTPS in production environments

## Troubleshooting

1. **CORS Errors**: Make sure the backend CORS middleware includes your frontend URL
2. **Redirect URI Mismatch**: Ensure the redirect URI in Google Console matches exactly
3. **Token Errors**: Check that your Client ID and Secret are correct
4. **Port Conflicts**: Ensure ports 8000 (backend) and 5173 (frontend) are available

## Development Flow

1. User clicks "Sign in with Google" on the frontend
2. Frontend calls `/auth/google` endpoint
3. User is redirected to Google's OAuth consent screen
4. After authorization, Google redirects back with a code
5. Frontend sends the code to `/auth/google/callback`
6. Backend exchanges code for tokens and returns user info
7. Frontend stores tokens and displays user information

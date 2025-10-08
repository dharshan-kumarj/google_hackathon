import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface AuthResponse {
  success: boolean;
  user: User;
  tokens: {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
}

export const useGoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a stored token
    const storedToken = localStorage.getItem('google_access_token');
    const storedUser = localStorage.getItem('google_user');
    
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleCallback(code);
    }
  }, []);

  const handleCallback = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate with Google');
      }

      const data: AuthResponse = await response.json();
      
      // Store tokens and user info
      localStorage.setItem('google_access_token', data.tokens.access_token);
      localStorage.setItem('google_user', JSON.stringify(data.user));
      
      setAccessToken(data.tokens.access_token);
      setUser(data.user);

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/google`);
      const data = await response.json();
      
      // Redirect to Google OAuth
      window.location.href = data.auth_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate login');
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_user');
    setAccessToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/user?access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error('Failed to refresh user data');
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('google_user', JSON.stringify(data.user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh user');
      // If token is invalid, logout
      logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    accessToken,
    loading,
    error,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };
};

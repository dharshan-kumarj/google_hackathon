import { useState, useEffect } from 'react';

const API_URL = 'https://studybuddy-backend-du42.onrender.com';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
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

    // Handle OAuth callback from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenParam = urlParams.get('access_token');
    const errorParam = urlParams.get('error');
    
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (accessTokenParam) {
      // Extract user data from URL params
      const user: User = {
        id: urlParams.get('user_id') || '',
        email: urlParams.get('user_email') || '',
        name: urlParams.get('user_name') || '',
        picture: urlParams.get('user_picture') || '',
        verified_email: true,
      };
      
      const refreshToken = urlParams.get('refresh_token') || '';
      
      // Store tokens and user info
      localStorage.setItem('google_access_token', accessTokenParam);
      localStorage.setItem('google_user', JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem('google_refresh_token', refreshToken);
      }
      
      setAccessToken(accessTokenParam);
      setUser(user);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

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

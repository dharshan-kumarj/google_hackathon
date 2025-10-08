import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useGoogleAuth } from './hooks/useGoogleAuth'
import Dashboard from './pages/Dashboard'
import TimetableGeneration from './pages/TimetableGeneration'
import LearningResources from './pages/LearningResources'
import UserWellness from './pages/UserWellness'
import ProgressTracking from './pages/ProgressTracking'
import './App.css'

function App() {
  const { loading, error, login, logout, isAuthenticated } = useGoogleAuth()

  // Show loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Loading...
      </div>
    )
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '1rem', color: '#333' }}>Welcome to Learning Hub</h1>
          <h2 style={{ marginBottom: '2rem', color: '#666', fontWeight: '400' }}>Please sign in to continue</h2>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>Error: {error}</p>}
          <button 
            onClick={login} 
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  // Show main app with routing if authenticated
  return (
    <Router>
      <div style={{ position: 'relative' }}>
        {/* Logout button - always visible */}
        <button 
          onClick={logout}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '2px solid white',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'white'
            e.currentTarget.style.color = '#667eea'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.color = 'white'
          }}
        >
          Sign Out
        </button>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/timetable" element={<TimetableGeneration />} />
          <Route path="/learning" element={<LearningResources />} />
          <Route path="/wellness" element={<UserWellness />} />
          <Route path="/progress" element={<ProgressTracking />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

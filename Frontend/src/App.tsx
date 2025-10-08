import { useGoogleAuth } from './hooks/useGoogleAuth'
import './App.css'

function App() {
  const { user, loading, error, login, logout, isAuthenticated } = useGoogleAuth()

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h1>Google OAuth Example</h1>
        
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!isAuthenticated ? (
          <div className="card">
            <h2>Please sign in</h2>
            <button onClick={login} disabled={loading}>
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="card">
            <h2>Welcome, {user?.name}!</h2>
            <div style={{ marginTop: '1rem' }}>
              {user?.picture && (
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                />
              )}
              <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>ID:</strong> {user?.id}</p>
                <p><strong>Verified:</strong> {user?.verified_email ? 'Yes' : 'No'}</p>
              </div>
              <button onClick={logout} style={{ marginTop: '1rem' }}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App

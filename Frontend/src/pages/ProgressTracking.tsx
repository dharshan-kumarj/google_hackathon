import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProgressTracking.css';

const ProgressTracking: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="progress-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Back to Dashboard"
        tabIndex={0}
      >
        ← Back to Dashboard
      </button>
      <div className="progress-content">
        <h1 className="page-title">Progress Tracking</h1>
        <p className="page-subtitle">
         Visualize your progress, celebrate milestones, and stay motivated.
        </p>
        
        <div className="progress-placeholder">
            <p>
              <span style={{fontWeight:600}}>Coming Soon:</span> You'll be able to visualize your learning journey with interactive charts, milestones, and achievements. Stay tuned for a personalized dashboard!
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;

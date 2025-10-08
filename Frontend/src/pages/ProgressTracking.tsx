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
      >
        ← Back to Dashboard
      </button>
      <div className="progress-content">
        <h1 className="page-title">Progress Tracking</h1>
        <p className="page-subtitle">
          Monitor your learning journey and achievements
        </p>
        
        <div className="progress-placeholder">
          <p>Progress tracking features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;

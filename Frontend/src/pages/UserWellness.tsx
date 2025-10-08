import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserWellness.css';

const UserWellness: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wellness-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back to Dashboard
      </button>
      <div className="wellness-content">
        <h1 className="page-title">User Wellness</h1>
        <p className="page-subtitle">
          Track and improve your mental and physical wellbeing
        </p>
        
        <div className="wellness-placeholder">
          <p>Wellness tracking features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default UserWellness;

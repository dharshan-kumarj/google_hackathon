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
        aria-label="Back to Dashboard"
        tabIndex={0}
      >
        ← Back to Dashboard
      </button>
      <div className="wellness-content">
        <h1 className="page-title">User Wellness</h1>
        <p className="page-subtitle">
         Set wellness goals, track your mood, and get tips for a healthier study-life balance.
        </p>
        
        <div className="wellness-placeholder">
            <p>
              <span style={{fontWeight:600}}>Coming Soon:</span> Track your mood, set wellness goals, and get actionable tips for a healthier study-life balance. Wellness insights will be available here soon!
            </p>
        </div>
      </div>
    </div>
  );
};

export default UserWellness;

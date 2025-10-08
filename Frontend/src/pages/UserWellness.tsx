import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserWellness.css';

const UserWellness: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wellness-container min-vh-100 d-flex align-items-center justify-content-center position-relative">
      <button 
        onClick={() => navigate('/')}
        className="btn btn-light position-fixed top-0 start-0 m-3 shadow-sm"
        style={{ zIndex: 1000 }}
        aria-label="Back to Dashboard"
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back to Dashboard
      </button>
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card border-0 shadow-lg wellness-card">
              <div className="card-body p-4 p-md-5 text-center">
                <div className="wellness-icon mb-4">
                  <i className="bi bi-heart-pulse-fill text-success" style={{ fontSize: '4rem' }}></i>
                </div>
                <h1 className="h2 fw-bold mb-3">User Wellness</h1>
                <p className="text-muted mb-4">
                  Set wellness goals, track your mood, and get tips for a healthier study-life balance.
                </p>
                
                <div className="alert alert-success d-flex align-items-start" role="alert">
                  <i className="bi bi-heart-fill me-3 fs-4 flex-shrink-0"></i>
                  <div className="text-start">
                    <h5 className="alert-heading">Wellness Features Coming Soon!</h5>
                    <p className="mb-0">
                      Track your mood, set wellness goals, and get actionable tips for a healthier study-life balance. Wellness insights will be available here soon!
                    </p>
                  </div>
                </div>

                <div className="row g-4 mt-4">
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-emoji-smile-fill text-info fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Mood Tracker</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-bullseye text-danger fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Goals</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-moon-stars-fill text-primary fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Sleep Log</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-activity text-success fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Exercise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWellness;

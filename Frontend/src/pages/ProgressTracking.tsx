import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProgressTracking.css';

const ProgressTracking: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="progress-container min-vh-100 d-flex align-items-center justify-content-center position-relative">
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
            <div className="card border-0 shadow-lg progress-card">
              <div className="card-body p-4 p-md-5 text-center">
                <div className="progress-icon mb-4">
                  <i className="bi bi-graph-up-arrow text-warning" style={{ fontSize: '4rem' }}></i>
                </div>
                <h1 className="h2 fw-bold mb-3">Progress Tracking</h1>
                <p className="text-muted mb-4">
                  Visualize your progress, celebrate milestones, and stay motivated.
                </p>
                
                <div className="alert alert-info d-flex align-items-start" role="alert">
                  <i className="bi bi-info-circle-fill me-3 fs-4 flex-shrink-0"></i>
                  <div className="text-start">
                    <h5 className="alert-heading">Coming Soon!</h5>
                    <p className="mb-0">
                      You'll be able to visualize your learning journey with interactive charts, milestones, and achievements. Stay tuned for a personalized dashboard with detailed analytics and insights!
                    </p>
                  </div>
                </div>

                <div className="row g-4 mt-4">
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-bar-chart-fill text-primary fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Charts</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-trophy-fill text-warning fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Achievements</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-calendar-check-fill text-success fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Milestones</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="feature-preview p-3">
                      <i className="bi bi-lightning-charge-fill text-danger fs-2 mb-2"></i>
                      <p className="small fw-medium mb-0">Streaks</p>
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

export default ProgressTracking;

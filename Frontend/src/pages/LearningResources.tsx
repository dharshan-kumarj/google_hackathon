import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningResources.css';

const LearningResources: React.FC = () => {
  const navigate = useNavigate();
  const [learningInput, setLearningInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Add your API call here
    console.log('Learning query:', learningInput);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="learning-container min-vh-100 d-flex align-items-center justify-content-center position-relative">
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
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            <div className="card border-0 shadow-lg learning-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="learning-icon mb-3">
                    <i className="bi bi-book text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h1 className="h2 fw-bold mb-3">Discover Learning Resources</h1>
                  <p className="text-muted">
                    What do you want to learn? Get curated resources tailored to your goals and style.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="learningInput" className="form-label fw-medium">
                      <i className="bi bi-lightbulb me-2 text-warning"></i>
                      Describe your learning goals
                    </label>
                    <textarea
                      id="learningInput"
                      className="form-control form-control-lg"
                      placeholder="Example: 'Beginner in React, want video tutorials and hands-on projects. Interested in hooks and state management.'"
                      value={learningInput}
                      onChange={(e) => setLearningInput(e.target.value)}
                      rows={8}
                      style={{ resize: 'vertical' }}
                    />
                    <div className="form-text">
                      <i className="bi bi-info-circle me-1"></i>
                      Include your skill level, preferred learning format, and specific topics
                    </div>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={loading || !learningInput.trim()}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Finding Resources...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search me-2"></i>
                          Find Resources
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningResources;

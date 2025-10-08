import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TimetableGeneration.css';

const TimetableGeneration: React.FC = () => {
  const navigate = useNavigate();
  const [timetableInput, setTimetableInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Add your API call here
    console.log('Timetable input:', timetableInput);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="timetable-container min-vh-100 d-flex align-items-center justify-content-center position-relative">
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
            <div className="card border-0 shadow-lg timetable-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="timetable-icon mb-3">
                    <i className="bi bi-calendar-week text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h1 className="h2 fw-bold mb-3">Generate Your Timetable</h1>
                  <p className="text-muted">
                    Enter your subjects, preferred study times, and any special requests for a personalized timetable.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="timetableInput" className="form-label fw-medium">
                      <i className="bi bi-clock me-2 text-info"></i>
                      Schedule Details
                    </label>
                    <textarea
                      id="timetableInput"
                      className="form-control form-control-lg"
                      placeholder="Example: 'Math, Physics, Chemistry. Free 9am-5pm weekdays. Prefer 1-hour sessions, 15-min breaks.'"
                      value={timetableInput}
                      onChange={(e) => setTimetableInput(e.target.value)}
                      rows={8}
                      style={{ resize: 'vertical' }}
                    />
                    <div className="form-text">
                      <i className="bi bi-info-circle me-1"></i>
                      Include subjects, available time slots, session duration, and break preferences
                    </div>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={loading || !timetableInput.trim()}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Generating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-magic me-2"></i>
                          Generate Timetable
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

export default TimetableGeneration;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const userName = ""; // This should come from your auth context
  const userStars = 4.5;
  const studyHours = 2.5;
  const focusScore = 85;
  const wellnessScore = 70;

  const motivationalQuotes = [
    { text: "You are what you repeatedly do. Excellence is not an act, but a habit.", author: "Atomic Habits" },
    { text: "Eat that frog! Tackle your biggest task first thing in the morning.", author: "Eat That Frog" },
    { text: "Small changes lead to remarkable results.", author: "Atomic Habits" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" }
  ];

  const [currentQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const todaysPlan = [
    { time: "9:00 - 10:10", subject: "Math", color: "#667eea" },
    { time: "10:00 - 10:15", subject: "Break", color: "#a8edea" },
    { time: "11:15 - 11:30", subject: "History", color: "#667eea" },
    { time: "12:00 - 13:00", subject: "Lunch Break", color: "#fed6e3" },
    { time: "13:00 - 14:30", subject: "Physics", color: "#667eea" }
  ];

  const tomorrowsPlan = [
    { time: "9:00 - 10:30", subject: "Chemistry", color: "#f093fb" },
    { time: "10:45 - 12:00", subject: "English", color: "#667eea" },
    { time: "14:00 - 15:30", subject: "Programming", color: "#fcb69f" }
  ];

  const learningRecommendations = [
    { title: "Machine Learning", icon: "🎬", color: "#667eea" },
    { title: "Neural Networks", icon: "📖", color: "#f5576c" },
    { title: "Quantum Computing", icon: "🧊", color: "#764ba2" }
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard-main min-vh-100">
      <div className="container-fluid py-4">
        {/* Header Section */}
        <div className="row mb-5 animate-fade-in">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h1 className="dashboard-greeting mb-2">{getGreeting()}, {userName} ✨</h1>
                <p className="text-white-50 mb-0" style={{ fontSize: '1rem', fontWeight: '400' }}>
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="user-avatar">
                <div className="avatar-circle">
                  <i className="bi bi-person-circle fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-12 col-lg-8">
            {/* Stats Cards Row */}
            <div className="row g-4 mb-5">
              <div className="col-6 col-md-3">
                <div className="stat-card card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="stat-icon me-3">
                        <i className="bi bi-clock-history text-primary fs-3"></i>
                      </div>
                      <div>
                        <p className="stat-label text-muted mb-1">Study Hours</p>
                        <h3 className="stat-value mb-0">{studyHours}</h3>
                      </div>
                    </div>
                    <small className="text-muted">Hours</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="stat-icon me-3">
                        <i className="bi bi-bullseye text-success fs-3"></i>
                      </div>
                      <div>
                        <p className="stat-label text-muted mb-1">Focus Score</p>
                        <h3 className="stat-value mb-0">{focusScore}</h3>
                      </div>
                    </div>
                    <div className="progress" style={{ height: '6px', borderRadius: '3px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${focusScore}%`,
                          background: 'linear-gradient(90deg, #667eea, #764ba2)',
                          borderRadius: '3px'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="stat-icon me-3">
                        <i className="bi bi-heart-pulse text-danger fs-3"></i>
                      </div>
                      <div>
                        <p className="stat-label text-muted mb-1">Wellness</p>
                        <h3 className="stat-value mb-0">{wellnessScore}</h3>
                      </div>
                    </div>
                    <small className="text-muted">Score</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="stat-icon me-3">
                        <i className="bi bi-star-fill text-warning fs-3"></i>
                      </div>
                      <div>
                        <p className="stat-label text-muted mb-1">Rating</p>
                        <h3 className="stat-value mb-0">{userStars}</h3>
                      </div>
                    </div>
                    <small className="text-muted">Stars</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Plan */}
            <div className="card border-0 shadow-sm mb-4 plan-card">
              <div className="card-body">
                <h5 className="card-title mb-4 d-flex align-items-center">
                  <i className="bi bi-calendar-check me-2 text-primary"></i>
                  Today's Plan
                </h5>
                <div className="timeline">
                  {todaysPlan.map((item, index) => (
                    <div key={index} className="timeline-item d-flex align-items-center mb-3">
                      <div className="timeline-time text-muted small me-3" style={{ minWidth: '100px' }}>
                        {item.time}
                      </div>
                      <div className="timeline-content flex-grow-1">
                        <div className="timeline-badge" style={{ backgroundColor: item.color }}></div>
                        <span className="fw-medium">{item.subject}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tomorrow's Plan */}
            <div className="card border-0 shadow-sm mb-4 plan-card">
              <div className="card-body">
                <h5 className="card-title mb-4 d-flex align-items-center">
                  <i className="bi bi-calendar2-week me-2 text-success"></i>
                  Tomorrow's Plan
                </h5>
                <div className="timeline">
                  {tomorrowsPlan.map((item, index) => (
                    <div key={index} className="timeline-item d-flex align-items-center mb-3">
                      <div className="timeline-time text-muted small me-3" style={{ minWidth: '100px' }}>
                        {item.time}
                      </div>
                      <div className="timeline-content flex-grow-1">
                        <div className="timeline-badge" style={{ backgroundColor: item.color }}></div>
                        <span className="fw-medium">{item.subject}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-12 col-lg-4">
            {/* Today's Suggestion */}
            <div className="card border-0 shadow-sm mb-4 suggestion-card">
              <div className="card-body text-center p-4">
                <div className="suggestion-icon mx-auto mb-3">
                  <div className="icon-circle bg-gradient-primary">
                    <span className="fs-1">🎯</span>
                  </div>
                </div>
                <h6 className="fw-bold mb-2">Today's suggestion</h6>
                <p className="text-muted small mb-0">Start with the new AI tutorial</p>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="card border-0 shadow-sm mb-4 quote-card">
              <div className="card-body p-4">
                <div className="quote-icon mb-3">
                  <i className="bi bi-quote text-primary fs-2"></i>
                </div>
                <p className="quote-text mb-3">"{currentQuote.text}"</p>
                <p className="quote-author text-muted small mb-0">— {currentQuote.author}</p>
              </div>
            </div>

            {/* Learning Recommendations */}
            <div className="card border-0 shadow-sm recommendations-card">
              <div className="card-body">
                <h5 className="card-title mb-3 d-flex align-items-center justify-content-between">
                  <span><i className="bi bi-lightbulb me-2 text-warning"></i>Learning Recommendations</span>
                </h5>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="What do you want to learn today?" 
                  />
                </div>
                <div className="row g-3">
                  {learningRecommendations.map((rec, index) => (
                    <div key={index} className="col-6">
                      <div 
                        className="recommendation-item card border-0 shadow-sm h-100"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/learning')}
                      >
                        <div className="card-body text-center p-3">
                          <div className="rec-icon mb-2" style={{ fontSize: '2rem' }}>
                            {rec.icon}
                          </div>
                          <p className="rec-title small fw-medium mb-0">{rec.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-end mt-3">
                  <button 
                    className="btn btn-link text-primary text-decoration-none p-0"
                    onClick={() => navigate('/learning')}
                  >
                    View all <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Focus Meter */}
            <div className="card border-0 shadow-sm mt-4 focus-card">
              <div className="card-body text-center p-4">
                <h6 className="mb-3">Focus Meter</h6>
                <div className="position-relative d-inline-block">
                  <svg width="120" height="120" className="focus-circle">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e9ecef" strokeWidth="8"/>
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="none" 
                      stroke="#667eea" 
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - focusScore / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="fw-bold">Focus</div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <small className="text-muted">Low</small>
                  <small className="text-muted">High</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

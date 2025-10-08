import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 1,
      title: 'Timetable Generation',
      description: 'Create and manage your personalized study schedule',
      icon: '📅',
      iconClass: 'bi-calendar-event',
      path: '/timetable',
      color: 'primary'
    },
    {
      id: 2,
      title: 'User Wellness',
      description: 'Track your mental and physical wellbeing',
      icon: '💚',
      iconClass: 'bi-heart-pulse',
      path: '/wellness',
      color: 'success'
    },
    {
      id: 3,
      title: 'Learning Resources',
      description: 'Discover curated learning materials',
      icon: '📚',
      iconClass: 'bi-book',
      path: '/learning',
      color: 'danger'
    },
    {
      id: 4,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey',
      icon: '📈',
      iconClass: 'bi-graph-up',
      path: '/progress',
      color: 'warning'
    }
  ];

  return (
    <div className="dashboard-container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container py-5">
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-4 fw-bold text-white mb-3">
            Welcome to Your Learning Hub
          </h1>
          <p className="lead text-white-50">
            Your personalized learning companion
          </p>
        </div>
        
        <div className="row g-4 justify-content-center">
          {dashboardCards.map((card, index) => (
            <div 
              key={card.id} 
              className="col-12 col-sm-6 col-lg-6 col-xl-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="card h-100 dashboard-card border-0 shadow-lg"
                onClick={() => navigate(card.path)}
                tabIndex={0}
                role="button"
                aria-label={card.title}
                onKeyPress={(e) => e.key === 'Enter' && navigate(card.path)}
              >
                <div className="card-body text-center p-4 d-flex flex-column">
                  <div className={`dashboard-icon bg-gradient-${card.color} text-white rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4`}>
                    <span className="display-4">{card.icon}</span>
                  </div>
                  <h5 className="card-title fw-bold mb-3">{card.title}</h5>
                  <p className="card-text text-muted flex-grow-1">{card.description}</p>
                  <div className="mt-3">
                    <i className={`bi ${card.iconClass} text-${card.color} fs-5`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

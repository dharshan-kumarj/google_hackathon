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
      path: '/timetable'
    },
    {
      id: 2,
      title: 'User Wellness',
      description: 'Track your mental and physical wellbeing',
      icon: '💚',
      path: '/wellness'
    },
    {
      id: 3,
      title: 'Learning Resources',
      description: 'Discover curated learning materials',
      icon: '📚',
      path: '/learning'
    },
    {
      id: 4,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey',
      icon: '📈',
      path: '/progress'
    }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Learning Hub</h1>
      <div className="dashboard-cards">
        {dashboardCards.map((card) => (
            <div
              key={card.id}
              className="dashboard-card"
              onClick={() => navigate(card.path)}
              tabIndex={0}
              role="button"
              aria-label={card.title}
              onKeyPress={(e) => e.key === 'Enter' && navigate(card.path)}
            >
              <div className="card-icon">{card.icon}</div>
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import './TestDashboard.css';

const TestDashboard: React.FC = () => {
  return (
    <div className="test-dashboard">
      <header className="test-dashboard-header">
        <h1>Learning Dashboard</h1>
        <p>Your personal learning companion</p>
      </header>
      
      <div className="test-grid-container">
        <div className="test-grid-item timetable">
          <div className="test-icon">
            📅
          </div>
          <h3>Time Table</h3>
          <p>Organize your schedule and manage your daily activities efficiently</p>
          <button className="test-action-btn">View Schedule</button>
        </div>
        
        <div className="test-grid-item wellness">
          <div className="test-icon">
            🌿
          </div>
          <h3>Wellness</h3>
          <p>Track your mental and physical health with personalized wellness tips</p>
          <button className="test-action-btn">Start Wellness</button>
        </div>
        
        <div className="test-grid-item learning">
          <div className="test-icon">
            📚
          </div>
          <h3>Learning Resources</h3>
          <p>Access curated educational content and expand your knowledge base</p>
          <button className="test-action-btn">Explore Resources</button>
        </div>
        
        <div className="test-grid-item try-online">
          <div className="test-icon">
            💻
          </div>
          <h3>Try Online</h3>
          <p>Interactive coding environment and hands-on learning experiences</p>
          <button className="test-action-btn">Start Coding</button>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;
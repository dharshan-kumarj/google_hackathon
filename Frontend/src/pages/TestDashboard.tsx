import React, { useState } from 'react';
import Modal from '../components/Modal';
import TimetableForm from '../components/TimetableForm';
import LearningResourcesForm from '../components/LearningResourcesForm';
import './TestDashboard.css';

const TestDashboard: React.FC = () => {
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [learningResourcesModalOpen, setLearningResourcesModalOpen] = useState(false);

  const handleTimetableSubmit = (data: any) => {
    console.log('Timetable data:', data);
    // Here you would typically send the data to your backend
    alert('Schedule added successfully! 📅');
    setTimetableModalOpen(false);
  };

  const handleLearningResourcesSubmit = (data: any) => {
    console.log('Learning resources data:', data);
    // Here you would typically send the data to your backend
    alert('Finding learning resources for you! 🔍');
    setLearningResourcesModalOpen(false);
  };

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
          <button 
            className="test-action-btn"
            onClick={() => setTimetableModalOpen(true)}
          >
            Create Schedule
          </button>
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
          <button 
            className="test-action-btn"
            onClick={() => setLearningResourcesModalOpen(true)}
          >
            Find Resources
          </button>
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

      {/* Timetable Modal */}
      <Modal
        isOpen={timetableModalOpen}
        onClose={() => setTimetableModalOpen(false)}
        title="Create Your Schedule"
      >
        <TimetableForm
          onSubmit={handleTimetableSubmit}
          onCancel={() => setTimetableModalOpen(false)}
        />
      </Modal>

      {/* Learning Resources Modal */}
      <Modal
        isOpen={learningResourcesModalOpen}
        onClose={() => setLearningResourcesModalOpen(false)}
        title="Find Learning Resources"
      >
        <LearningResourcesForm
          onSubmit={handleLearningResourcesSubmit}
          onCancel={() => setLearningResourcesModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TestDashboard;
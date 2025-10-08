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
    <div className="timetable-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back to Dashboard
      </button>
      <div className="timetable-content">
        <h1 className="page-title">Generate Your Timetable</h1>
        <p className="page-subtitle">
          Describe your schedule preferences, subjects, and available time slots
        </p>
        
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            className="input-box"
            placeholder="Example: I need a timetable for Math, Physics, Chemistry, and English. I'm free from 9 AM to 5 PM on weekdays. I prefer 1-hour study sessions with 15-minute breaks..."
            value={timetableInput}
            onChange={(e) => setTimetableInput(e.target.value)}
            rows={8}
          />
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || !timetableInput.trim()}
          >
            {loading ? 'Generating...' : 'Generate Timetable'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimetableGeneration;

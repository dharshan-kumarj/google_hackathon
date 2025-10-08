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
        aria-label="Back to Dashboard"
        tabIndex={0}
      >
        ← Back to Dashboard
      </button>
      <div className="timetable-content">
        <h1 className="page-title">Generate Your Timetable</h1>
        <p className="page-subtitle">
         Enter your subjects, preferred study times, and any special requests for a personalized timetable.
        </p>
        
        <form onSubmit={handleSubmit} className="input-form">
            <textarea
              className="input-box"
              placeholder="List your subjects, available times, and preferences. Example: 'Math, Physics, Chemistry. Free 9am-5pm weekdays. Prefer 1-hour sessions, 15-min breaks.'"
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

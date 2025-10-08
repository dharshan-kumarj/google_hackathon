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
    <div className="learning-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back to Dashboard
      </button>
      <div className="learning-content">
        <h1 className="page-title">Discover Learning Resources</h1>
        <p className="page-subtitle">
          Tell us what you want to learn and we'll find the best resources for you
        </p>
        
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            className="input-box"
            placeholder="Example: I want to learn React hooks and state management. I'm a beginner and prefer video tutorials with practical examples..."
            value={learningInput}
            onChange={(e) => setLearningInput(e.target.value)}
            rows={8}
          />
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || !learningInput.trim()}
          >
            {loading ? 'Finding Resources...' : 'Find Resources'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LearningResources;

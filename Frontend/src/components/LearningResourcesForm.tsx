import React, { useState } from 'react';

interface LearningResourcesFormProps {
  onSubmit: (data: LearningResourcesData) => void;
  onCancel: () => void;
}

interface LearningResourcesData {
  subject: string;
  resourceType: string;
  difficulty: string;
  topics: string[];
  timeAvailable: string;
  learningGoal: string;
  preferredFormat: string;
}

const LearningResourcesForm: React.FC<LearningResourcesFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<LearningResourcesData>({
    subject: '',
    resourceType: 'video',
    difficulty: 'beginner',
    topics: [],
    timeAvailable: '30',
    learningGoal: '',
    preferredFormat: 'interactive'
  });

  const [topicInput, setTopicInput] = useState('');

  const subjects = [
    'Mathematics', 'Science', 'History', 'Literature', 'Programming', 
    'Languages', 'Art', 'Music', 'Business', 'Other'
  ];

  const addTopic = () => {
    if (topicInput.trim() && !formData.topics.includes(topicInput.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, topicInput.trim()]
      }));
      setTopicInput('');
    }
  };

  const removeTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(t => t !== topic)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject && formData.learningGoal) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Subject *</label>
        <select
          className="form-select"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          required
        >
          <option value="">Select a subject</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Resource Type</label>
          <select
            className="form-select"
            value={formData.resourceType}
            onChange={(e) => setFormData(prev => ({ ...prev, resourceType: e.target.value }))}
          >
            <option value="video">📺 Video Tutorials</option>
            <option value="articles">📚 Articles & Blogs</option>
            <option value="interactive">🎮 Interactive Exercises</option>
            <option value="books">📖 E-books</option>
            <option value="practice">✏️ Practice Tests</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Difficulty Level</label>
          <select
            className="form-select"
            value={formData.difficulty}
            onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
          >
            <option value="beginner">🌱 Beginner</option>
            <option value="intermediate">🌿 Intermediate</option>
            <option value="advanced">🌳 Advanced</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Topics of Interest</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            className="form-input"
            style={{ flex: 1 }}
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Enter a topic and press Add"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
          />
          <button
            type="button"
            onClick={addTopic}
            className="btn btn-primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            Add Topic
          </button>
        </div>
        {formData.topics.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {formData.topics.map(topic => (
              <span
                key={topic}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {topic}
                <button
                  type="button"
                  onClick={() => removeTopic(topic)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: 0
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Available Study Time (minutes)</label>
        <select
          className="form-select"
          value={formData.timeAvailable}
          onChange={(e) => setFormData(prev => ({ ...prev, timeAvailable: e.target.value }))}
        >
          <option value="15">⏱️ 15 minutes</option>
          <option value="30">⏰ 30 minutes</option>
          <option value="60">🕐 1 hour</option>
          <option value="120">🕑 2 hours</option>
          <option value="180">🕒 3+ hours</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Learning Goal *</label>
        <textarea
          className="form-input form-textarea"
          value={formData.learningGoal}
          onChange={(e) => setFormData(prev => ({ ...prev, learningGoal: e.target.value }))}
          placeholder="What do you want to achieve? (e.g., 'Learn basic algebra', 'Prepare for history exam', 'Master React hooks')"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Preferred Learning Format</label>
        <select
          className="form-select"
          value={formData.preferredFormat}
          onChange={(e) => setFormData(prev => ({ ...prev, preferredFormat: e.target.value }))}
        >
          <option value="interactive">🎮 Interactive & Hands-on</option>
          <option value="visual">👁️ Visual & Diagram-based</option>
          <option value="reading">📖 Reading & Text-based</option>
          <option value="audio">🎧 Audio & Listening</option>
          <option value="mixed">🌈 Mixed Approach</option>
        </select>
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          🔍 Find Resources
        </button>
      </div>
    </form>
  );
};

export default LearningResourcesForm;
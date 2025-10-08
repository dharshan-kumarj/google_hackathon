import React, { useState } from 'react';

interface TimetableFormProps {
  onSubmit: (data: TimetableData) => void;
  onCancel: () => void;
}

interface TimetableData {
  subject: string;
  startTime: string;
  endTime: string;
  days: string[];
  priority: string;
  notes: string;
}

const TimetableForm: React.FC<TimetableFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TimetableData>({
    subject: '',
    startTime: '',
    endTime: '',
    days: [],
    priority: 'medium',
    notes: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject && formData.startTime && formData.endTime && formData.days.length > 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Subject/Activity *</label>
        <input
          type="text"
          className="form-input"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          placeholder="Enter subject or activity name"
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Start Time *</label>
          <input
            type="time"
            className="form-input"
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            required
          />
        </div>
        
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">End Time *</label>
          <input
            type="time"
            className="form-input"
            value={formData.endTime}
            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Days of Week *</label>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
          gap: '0.5rem',
          marginTop: '0.5rem'
        }}>
          {daysOfWeek.map(day => (
            <label key={day} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              background: formData.days.includes(day) ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
              border: `2px solid ${formData.days.includes(day) ? '#667eea' : 'rgba(107, 114, 128, 0.2)'}`,
              transition: 'all 0.3s ease'
            }}>
              <input
                type="checkbox"
                checked={formData.days.includes(day)}
                onChange={() => handleDayChange(day)}
                style={{ display: 'none' }}
              />
              <span style={{ 
                fontSize: '0.8rem',
                fontWeight: formData.days.includes(day) ? '600' : '400',
                color: formData.days.includes(day) ? '#667eea' : '#6b7280'
              }}>
                {day.slice(0, 3)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Priority Level</label>
        <select
          className="form-select"
          value={formData.priority}
          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Notes (Optional)</label>
        <textarea
          className="form-input form-textarea"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Add any additional notes about this schedule item..."
        />
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          📅 Add to Schedule
        </button>
      </div>
    </form>
  );
};

export default TimetableForm;
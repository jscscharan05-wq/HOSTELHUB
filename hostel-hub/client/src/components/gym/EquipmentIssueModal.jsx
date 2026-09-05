import React, { useState } from 'react';

export default function EquipmentIssueModal({ onSubmitIssue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: 'STU-ROOM-402',
    equipmentName: 'Treadmill 1',
    severity: 'moderate',
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitIssue(formData);
    setIsOpen(false);
    setFormData({ ...formData, note: '' });
  };

  return (
    <div className="gm-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="gm-title" style={{ margin: 0 }}>Equipment Issues</h2>
        <button 
          type="button"
          className="gm-btn gm-btn-danger" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close Form' : 'Report Broken Gear'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <label htmlFor="equipment-select">Equipment Name</label>
          <select
            id="equipment-select"
            className="gm-select"
            value={formData.equipmentName}
            onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
          >
            <option value="Treadmill 1">Treadmill 1</option>
            <option value="Treadmill 2">Treadmill 2</option>
            <option value="Cable Machine">Cable Machine</option>
            <option value="Dumbbell Rack">Dumbbell Rack</option>
            <option value="Flat Bench">Flat Bench</option>
          </select>

          <label htmlFor="severity-select">Severity Level</label>
          <select
            id="severity-select"
            className="gm-select"
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
          >
            <option value="low">Low (Cosmetic/Squeaky)</option>
            <option value="moderate">Moderate (Needs check)</option>
            <option value="critical">Critical (Safety Hazard / Broken)</option>
          </select>

          <label htmlFor="defect-note">Defect Details</label>
          <textarea
            id="defect-note"
            className="gm-textarea"
            rows="3"
            required
            placeholder="Describe what is broken or making unusual noise..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />

          <button type="submit" className="gm-btn gm-btn-primary">
            Submit Report
          </button>
        </form>
      )}
    </div>
  );
}
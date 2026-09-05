import React, { useState } from 'react';

export default function VendingIssueModal({ floor, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    studentId: 'STU1204',
    issueCategory: 'payment_deducted_no_item',
    transactionId: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, floor });
    onClose();
  };

  return (
    <div className="va-modal-backdrop">
      <div className="va-modal">
        <h3 style={{ marginTop: 0 }}>Report Vending Machine Issue (Floor {floor})</h3>
        <form onSubmit={handleSubmit}>
          <div className="va-form-group">
            <label>Student ID</label>
            <input
              type="text"
              required
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            />
          </div>

          <div className="va-form-group">
            <label>Issue Type</label>
            <select
              value={formData.issueCategory}
              onChange={(e) => setFormData({ ...formData, issueCategory: e.target.value })}
            >
              <option value="payment_deducted_no_item">Payment Deducted / No Item</option>
              <option value="item_stuck">Item Stuck in Dispenser</option>
              <option value="keypad_unresponsive">Screen / Keypad Unresponsive</option>
              <option value="machine_offline">Machine Offline / No Power</option>
            </select>
          </div>

          <div className="va-form-group">
            <label>Transaction ID / UPI Ref (Optional)</label>
            <input
              type="text"
              value={formData.transactionId}
              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
            />
          </div>

          <div className="va-form-group">
            <label>Description</label>
            <textarea
              rows="3"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" className="va-btn va-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="va-btn va-btn-primary">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
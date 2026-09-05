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
        <h3>🚨 Report Vending Machine Issue</h3>
        <p style={{ color: '#8c7e99', fontSize: '14px', marginTop: '-12px', marginBottom: '16px' }}>
          Floor {floor} Unit
        </p>

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
              placeholder="e.g. 30291823901"
              value={formData.transactionId}
              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
            />
          </div>

          <div className="va-form-group">
            <label>Description</label>
            <textarea
              rows="3"
              required
              placeholder="Tell us what happened..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="va-modal-actions">
            <button type="button" className="va-btn-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="va-btn-modal-submit">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
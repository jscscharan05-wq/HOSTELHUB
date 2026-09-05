import React, { useState } from 'react';

export default function CleaningScheduler({ onScheduleCleaning }) {
  const [form, setForm] = useState({
    studentId: 'STU-ROOM-402',
    roomNumber: '412',
    floor: 4,
    type: 'on_demand',
    requestedSlot: '14:00 - 15:00',
    serviceDetails: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onScheduleCleaning(form);
  };

  return (
    <div className="gm-card">
      <h2 className="gm-title">Room Housekeeping Call</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="floor-input">Floor (1-11)</label>
            <input
              id="floor-input"
              type="number"
              min="1"
              max="11"
              className="gm-input"
              value={form.floor}
              onChange={(e) => setForm({ ...form, floor: Number(e.target.value) })}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="room-input">Room Number</label>
            <input
              id="room-input"
              type="text"
              className="gm-input"
              value={form.roomNumber}
              onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
            />
          </div>
        </div>

        <label htmlFor="type-select">Service Type</label>
        <select
          id="type-select"
          className="gm-select"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="on_demand">On-Demand (One-time call)</option>
          <option value="routine">Daily Routine (Fixed schedule)</option>
        </select>

        <label htmlFor="slot-select">Preferred Time Slot</label>
        <select
          id="slot-select"
          className="gm-select"
          value={form.requestedSlot}
          onChange={(e) => setForm({ ...form, requestedSlot: e.target.value })}
        >
          <option value="09:00 - 10:00">09:00 - 10:00 AM</option>
          <option value="11:00 - 12:00">11:00 - 12:00 PM</option>
          <option value="14:00 - 15:00">02:00 - 03:00 PM</option>
          <option value="16:00 - 17:00">04:00 - 05:00 PM</option>
        </select>

        <label htmlFor="details-input">Specific Instructions</label>
        <input
          id="details-input"
          type="text"
          className="gm-input"
          placeholder="e.g., Sweep, mop, and empty trash bin"
          value={form.serviceDetails}
          onChange={(e) => setForm({ ...form, serviceDetails: e.target.value })}
        />

        <button type="submit" className="gm-btn gm-btn-primary">
          Book Housekeeping
        </button>
      </form>
    </div>
  );
}
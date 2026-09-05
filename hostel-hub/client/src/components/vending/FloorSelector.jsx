import React from 'react';

export default function FloorSelector({ currentFloor, onFloorChange }) {
  return (
    <div className="va-floor-pill">
      <span style={{ fontSize: '18px' }}>🏢</span>
      <span className="va-floor-label">Current Floor:</span>
      <select
        id="floor-select"
        className="va-select"
        value={currentFloor}
        onChange={(e) => onFloorChange(Number(e.target.value))}
      >
        {Array.from({ length: 11 }, (_, i) => i + 1).map((floor) => (
          <option key={floor} value={floor}>
            Floor {floor}
          </option>
        ))}
      </select>
    </div>
  );
}
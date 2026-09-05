import React from 'react';

export default function FloorSelector({ currentFloor, onFloorChange }) {
  return (
    <div className="va-floor-picker">
      <label htmlFor="floor-select" style={{ marginRight: '8px', fontWeight: 600 }}>
        Current Floor:
      </label>
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
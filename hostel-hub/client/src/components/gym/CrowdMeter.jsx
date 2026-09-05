import React from 'react';

export default function CrowdMeter({ occupancyData = {}, onCheckInToggle, loading }) {
  const {
    currentOccupancy = 0,
    maxCapacity = 30,
    congestionLevel = 'low',
    recommendedSlots = []
  } = occupancyData;

  const percentage = Math.min(100, Math.round((currentOccupancy / maxCapacity) * 100));

  return (
    <div className="gm-card">
      <h2 className="gm-title">Live Gym Capacity</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>{currentOccupancy}</strong> / {maxCapacity} Inside</span>
        <span className={`gm-badge gm-${congestionLevel}`}>{congestionLevel}</span>
      </div>

      <div className="gm-progress-track">
        <div className={`gm-progress-fill gm-${congestionLevel}`} style={{ width: `${percentage}%` }} />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          type="button"
          className="gm-btn gm-btn-primary"
          disabled={loading || currentOccupancy >= maxCapacity}
          onClick={() => onCheckInToggle('entry')}
        >
          Check In (Enter)
        </button>
        <button
          type="button"
          className="gm-btn gm-btn-secondary"
          disabled={loading || currentOccupancy <= 0}
          onClick={() => onCheckInToggle('exit')}
        >
          Check Out (Leave)
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '8px 0', fontSize: '0.95rem' }}>Recommended Quiet Slots:</h4>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {recommendedSlots.map((slot, index) => (
            <li key={index} style={{ fontSize: '0.85rem', color: '#475569' }}>
              {slot.timeRange} — <strong>{slot.predictedCrowd} crowd</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
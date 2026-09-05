import React from 'react';

export default function ApplianceBoard({ appliances, onReportFault }) {
  return (
    <div className="va-section">
      <h2>Floor Utility Status</h2>
      <div className="va-grid">
        {appliances.map((app) => (
          <div key={app.applianceId} className="va-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className={`va-badge ${app.isWorking ? 'va-badge-working' : 'va-badge-faulty'}`}>
                {app.isWorking ? 'Operational' : 'Out of Order'}
              </span>
            </div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{app.name}</h3>
            <small style={{ color: '#64748b', display: 'block' }}>
              Inspected: {app.lastInspected}
            </small>
            {app.isWorking && (
              <button
                className="va-btn va-btn-danger"
                onClick={() => onReportFault(app.applianceId)}
              >
                Report Broken
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
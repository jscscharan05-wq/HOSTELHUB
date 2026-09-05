import React from 'react';

function ACIcon() {
  return (
    <svg className="va-icon-svg" viewBox="0 0 52 32" fill="none" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '64px', height: '40px' }}>
      <rect x="2" y="4" width="48" height="24" rx="4" fill="#f8fafc" />
      <line x1="8" y1="22" x2="44" y2="22" />
      <circle cx="42" cy="10" r="1.5" fill="#1c1917" />
    </svg>
  );
}

function WaterDispenserIcon() {
  return (
    <svg className="va-icon-svg" viewBox="0 0 36 52" fill="none" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '52px' }}>
      <path d="M10 6h16a3 3 0 0 1 3 3v12H7V9a3 3 0 0 1 3-3z" fill="#bae6fd" fillOpacity="0.5" />
      <rect x="6" y="21" width="24" height="25" rx="3" fill="#f8fafc" />
      <rect x="11" y="28" width="14" height="12" rx="2" fill="#38bdf8" fillOpacity="0.2" />
    </svg>
  );
}

export default function ApplianceBoard({ appliances, onReportFault }) {
  return (
    <section className="va-section">
      <h2 className="va-section-title">Floor Utility Status</h2>
      <div className="va-grid">
        {appliances.map((app) => {
          const isOperational = app.isWorking;
          const cardClass = isOperational ? 'va-card-green' : 'va-card-pink';
          const pillClass = isOperational ? 'va-pill-green' : 'va-pill-pink';
          const label = isOperational ? 'OPERATIONAL' : 'OUT OF ORDER';
          const isAC = app.name.toLowerCase().includes('ac');

          return (
            <div key={app.applianceId} className={`va-card ${cardClass}`}>
              <div className="va-card-row">
                <div className="va-card-left">
                  <span className={`va-pill-badge ${pillClass}`}>{label}</span>
                  <h3 className="va-item-name">{app.name}</h3>
                  <p className="va-item-sub">Inspected: {app.lastInspected}</p>
                </div>
                <div className="va-card-right">
                  {isAC ? <ACIcon /> : <WaterDispenserIcon />}
                </div>
              </div>

              {isOperational && (
                <button
                  type="button"
                  className="va-util-btn-pink"
                  onClick={() => onReportFault(app.applianceId)}
                >
                  Report Broken
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
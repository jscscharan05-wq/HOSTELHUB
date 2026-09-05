import React from 'react';

export default function VendingGrid({ items, onReportClick }) {
  return (
    <div className="va-section">
      <div className="va-header">
        <h2>Vending Stock</h2>
        <button className="va-btn va-btn-primary" onClick={onReportClick}>
          Report Issue / Stuck Item
        </button>
      </div>

      <div className="va-grid">
        {items.map((item) => (
          <div key={item.id} className="va-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className={`va-badge va-badge-${item.stockStatus}`}>
                {item.stockStatus.replace('_', ' ')}
              </span>
              <strong>₹{item.price}</strong>
            </div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{item.name}</h3>
            <small style={{ color: '#64748b' }}>{item.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
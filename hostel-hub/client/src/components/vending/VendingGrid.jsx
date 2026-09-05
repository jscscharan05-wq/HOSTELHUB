import React from 'react';

// Line-art vector illustrations matching the second mock image
function DrinkCanIcon() {
  return (
    <svg className="va-icon-svg" viewBox="0 0 48 48" fill="none" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="15" y="10" width="18" height="30" rx="4" fill="#bbf7d0" fillOpacity="0.4" />
      <path d="M18 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
      <path d="M25 18l-4 6h6l-3 7" stroke="#16a34a" strokeWidth="2" />
    </svg>
  );
}

function SnackIcon() {
  return (
    <svg className="va-icon-svg" viewBox="0 0 48 48" fill="none" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="16" width="28" height="16" rx="3" transform="rotate(-25 24 24)" fill="#fed7aa" fillOpacity="0.5" />
      <line x1="12" y1="12" x2="15" y2="10" stroke="#f97316" />
      <line x1="33" y1="38" x2="36" y2="36" stroke="#f97316" />
    </svg>
  );
}

function WaterBottleIcon() {
  return (
    <svg className="va-icon-svg" viewBox="0 0 48 48" fill="none" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14h8v24a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V14z" fill="#bae6fd" fillOpacity="0.4" />
      <path d="M22 14v-4h4v4" />
      <line x1="20" y1="26" x2="28" y2="26" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

export default function VendingGrid({ items }) {
  const getBadgeAndCard = (status) => {
    switch (status) {
      case 'in_stock':
        return { cardClass: 'va-card-green', pillClass: 'va-pill-green', label: 'IN STOCK' };
      case 'low_stock':
        return { cardClass: 'va-card-yellow', pillClass: 'va-pill-yellow', label: 'LOW STOCK' };
      default:
        return { cardClass: 'va-card-pink', pillClass: 'va-pill-pink', label: 'OUT OF STOCK' };
    }
  };

  const getVector = (item) => {
    const name = item.name.toLowerCase();
    if (name.includes('bar') || item.category.toLowerCase().includes('snack')) return <SnackIcon />;
    if (name.includes('water') || name.includes('sparkling')) return <WaterBottleIcon />;
    return <DrinkCanIcon />;
  };

  return (
    <section className="va-section">
      <h2 className="va-section-title">Vending Stock</h2>
      <div className="va-grid">
        {items.map((item) => {
          const { cardClass, pillClass, label } = getBadgeAndCard(item.stockStatus);
          return (
            <div key={item.id} className={`va-card ${cardClass}`}>
              <div className="va-card-row">
                <div className="va-card-left">
                  <span className={`va-pill-badge ${pillClass}`}>{label}</span>
                  <h3 className="va-item-name">{item.name}</h3>
                  <p className="va-item-sub">{item.category}</p>
                </div>
                <div className="va-card-right">
                  {getVector(item)}
                  <span className="va-price-label">₹{item.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
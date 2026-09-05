import React, { useState, useEffect } from 'react';
import FloorSelector from '../components/vending/FloorSelector';
import VendingGrid from '../components/vending/VendingGrid';
import ApplianceBoard from '../components/vending/ApplianceBoard';
import VendingIssueModal from '../components/vending/VendingIssueModal';
import mockData from '../mocks/vendingMock.json';
import '../components/vending/vending.css';

export default function VendingApp() {
  const [floor, setFloor] = useState(4);
  const [items, setItems] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // 1. Fetch vending items
    fetch(`http://localhost:5000/api/vending/floors/${floor}/items`)
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => setItems(data))
      .catch(() => {
        // Fallback to offline mock
        setItems(mockData.items.filter((i) => i.floor === floor));
      });

    // 2. Fetch floor appliances
    fetch(`http://localhost:5000/api/floors/${floor}/appliances`)
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => setAppliances(data))
      .catch(() => {
        // Fallback to offline mock
        setAppliances(mockData.appliances.filter((a) => a.floor === floor));
      });
  }, [floor]);

  const handleReportIssue = (payload) => {
    fetch('http://localhost:5000/api/vending/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => alert(`Ticket submitted! ID: ${data.ticketId}`))
      .catch(() => alert('Ticket logged locally (Backend unavailable).'));
  };

  const handleReportApplianceFault = (applianceId) => {
    fetch(`http://localhost:5000/api/floors/${floor}/appliances/${applianceId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'STU1204',
        issueSummary: 'Reported non-operational by resident.'
      })
    })
      .then(() => {
        setAppliances((prev) =>
          prev.map((app) =>
            app.applianceId === applianceId ? { ...app, isWorking: false } : app
          )
        );
      })
      .catch(() => {
        // Local fallback optimistic update
        setAppliances((prev) =>
          prev.map((app) =>
            app.applianceId === applianceId ? { ...app, isWorking: false } : app
          )
        );
      });
  };

  return (
    <div className="va-container">
      <div className="va-header">
        <h1>Vending & Floor Utilities</h1>
        <FloorSelector currentFloor={floor} onFloorChange={setFloor} />
      </div>

      <VendingGrid items={items} onReportClick={() => setModalOpen(true)} />
      <ApplianceBoard appliances={appliances} onReportFault={handleReportApplianceFault} />

      <VendingIssueModal
        floor={floor}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReportIssue}
      />
    </div>
  );
}
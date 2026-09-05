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
    fetch(`http://localhost:5000/api/vending/floors/${floor}/items`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setItems(data))
      .catch(() => setItems(mockData.items.filter((i) => i.floor === floor)));

    fetch(`http://localhost:5000/api/floors/${floor}/appliances`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setAppliances(data))
      .catch(() => setAppliances(mockData.appliances.filter((a) => a.floor === floor)));
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
        setAppliances((prev) =>
          prev.map((app) =>
            app.applianceId === applianceId ? { ...app, isWorking: false } : app
          )
        );
      });
  };

  return (
    <div className="va-container">
      <div className="va-header-block">
        <div className="va-header-top">
          <div className="va-title-group">
            <h1>Vending & Floor Utilities</h1>
          </div>

          <div className="va-actions-group">
            <FloorSelector currentFloor={floor} onFloorChange={setFloor} />
            <button className="va-btn-report-main" onClick={() => setModalOpen(true)}>
              Report Issue / Stuck Item
            </button>
          </div>
        </div>
      </div>

      <VendingGrid items={items} />

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
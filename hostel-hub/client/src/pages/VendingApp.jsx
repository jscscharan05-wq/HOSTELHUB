import React, { useState, useEffect, useCallback } from 'react';
import FloorSelector from '../components/vending/FloorSelector';
import VendingGrid from '../components/vending/VendingGrid';
import ApplianceBoard from '../components/vending/ApplianceBoard';
import VendingIssueModal from '../components/vending/VendingIssueModal';
import mockData from '../mocks/vendingMock.json';
import '../components/vending/vending.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function VendingApp() {
  const [floor, setFloor] = useState(4);
  const [items, setItems] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [reports, setReports] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch items and appliances whenever selected floor changes
  useEffect(() => {
    fetch(`${API_BASE}/vending/floors/${floor}/items`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setItems(data))
      .catch(() => setItems(mockData.items.filter((i) => i.floor === floor)));

    fetch(`${API_BASE}/floors/${floor}/appliances`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setAppliances(data))
      .catch(() => setAppliances(mockData.appliances.filter((a) => a.floor === floor)));
  }, [floor]);

  // Fetch reported issues
  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/vending/reports`);
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch {
      console.warn('Could not load reports from server; running on local state.');
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Submit issue report
  const handleReportIssue = (payload) => {
    fetch(`${API_BASE}/vending/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        alert(`Ticket submitted! ID: ${data.ticketId}`);
        fetchReports();
      })
      .catch(() => {
        alert('Ticket logged locally (Backend unavailable).');
        setReports((prev) => [
          {
            ticketId: `VEND-LOCAL-${Math.floor(100 + Math.random() * 900)}`,
            floor: payload.floor,
            issueCategory: payload.issueCategory,
            description: payload.description,
            status: 'pending_review'
          },
          ...prev
        ]);
      });
  };

  // Submit appliance fault report
  const handleReportApplianceFault = (applianceId) => {
    fetch(`${API_BASE}/floors/${floor}/appliances/${applianceId}/report`, {
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

      {/* Reported Issues Tracker */}
      <div style={{ marginTop: '30px', padding: '20px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>Logged Maintenance & Vending Reports</h3>
        {reports.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No active complaints logged.</p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {reports.map((report) => (
              <div
                key={report.ticketId}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>
                    #{report.ticketId} — Floor {report.floor} ({report.issueCategory})
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0' }}>
                    {report.description}
                  </p>
                </div>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: '#fef3c7',
                    color: '#92400e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <VendingIssueModal
        floor={floor}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReportIssue}
      />
    </div>
  );
}
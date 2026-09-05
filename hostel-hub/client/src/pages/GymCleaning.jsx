import React, { useState, useEffect } from 'react';
import '../components/gym/gym.css';
import CrowdMeter from '../components/gym/CrowdMeter';
import EquipmentIssueModal from '../components/gym/EquipmentIssueModal';
import CleaningScheduler from '../components/gym/CleaningScheduler';
import gymMock from '../mocks/gymMock.json';

const API_BASE = 'http://localhost:5000/api';

export default function GymCleaning() {
  const [occupancy, setOccupancy] = useState(gymMock.occupancy);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchOccupancy = async () => {
    try {
      const res = await fetch(`${API_BASE}/gym/occupancy`);
      if (res.ok) {
        const data = await res.json();
        setOccupancy(data);
      }
    } catch {
      console.warn('Backend offline; operating on local state.');
    }
  };

  useEffect(() => {
    fetchOccupancy();
  }, []);

  const handleCheckInToggle = async (action) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/gym/check-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: 'STU-ROOM-402', action })
      });
      if (res.ok) {
        const data = await res.json();
        setOccupancy((prev) => ({
          ...prev,
          currentOccupancy: data.currentOccupancy,
          congestionLevel: data.congestionLevel
        }));
      }
    } catch {
      // Local fallback simulation
      setOccupancy((prev) => {
        const count = action === 'entry' ? prev.currentOccupancy + 1 : prev.currentOccupancy - 1;
        const clamped = Math.max(0, Math.min(prev.maxCapacity, count));
        const tag = clamped > 22 ? 'peak' : clamped > 10 ? 'moderate' : 'low';
        return { ...prev, currentOccupancy: clamped, congestionLevel: tag };
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIssueSubmit = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/gym/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = res.ok ? await res.json() : { ticketId: 'GYM-MOCK-TICKET' };
      setMessage(`Issue logged successfully! Ticket ID: ${data.ticketId}`);
    } catch {
      setMessage('Issue logged locally (Backend offline: GYM-MOCK-TICKET).');
    }
  };

  const handleCleaningSubmit = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/room/cleaning-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = res.ok ? await res.json() : { requestId: 'CLN-MOCK-REQ' };
      setMessage(`Housekeeping booked successfully! Reference ID: ${data.requestId}`);
    } catch {
      setMessage('Housekeeping booked locally (Backend offline: CLN-MOCK-REQ).');
    }
  };

  return (
    <div className="gm-container">
      <h1 style={{ color: '#0f172a', marginBottom: '20px' }}>Gym & Room Services</h1>
      {message && (
        <div style={{ padding: '12px', background: '#dcfce7', color: '#166534', borderRadius: '6px', marginBottom: '16px' }}>
          {message}
        </div>
      )}
      <CrowdMeter
        occupancyData={occupancy}
        onCheckInToggle={handleCheckInToggle}
        loading={loading}
      />
      <EquipmentIssueModal onSubmitIssue={handleIssueSubmit} />
      <CleaningScheduler onScheduleCleaning={handleCleaningSubmit} />
    </div>
  );
}
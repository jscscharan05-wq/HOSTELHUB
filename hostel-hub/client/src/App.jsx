import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import GymCleaning from './pages/GymCleaning'
import VendingApp from './pages/VendingApp'

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '20px', background: '#ffffff', alignItems: 'center' }}>
        <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>HostelHub</strong>
        <Link to="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 500 }}>Vending & Appliances</Link>
        <Link to="/gym" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 500 }}>Gym & Cleaning</Link>
      </nav>
      <Routes>
        <Route path="/" element={<VendingApp />} />
        <Route path="/gym" element={<GymCleaning />} />
      </Routes>
    </BrowserRouter>
  )
}
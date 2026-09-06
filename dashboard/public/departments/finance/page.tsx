'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', caption: 'State Budget & Treasury Management' },
  { src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', caption: 'Public Finance & Fiscal Policy' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', caption: 'Audit & Financial Accountability' },
  { src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80', caption: 'PFMS — Public Financial Management System' },
];
const ABOUT = [
  'The Finance Department manages the state budget, treasury operations, taxation policy, and financial regulations of Jharkhand.',
  'Jharkhand\'s annual budget has grown to over ₹1.25 lakh crore with significant allocations for social welfare and infrastructure.',
  'The department operates through 24 district treasuries and sub-treasuries for government payment and receipt management.',
  'Public Financial Management System (PFMS) ensures real-time tracking of all government expenditures and fund releases.',
  'State Finance Commission recommends devolution of funds to local bodies for decentralized development.',
  'The department coordinates with CAG for statutory audit and implements audit recommendations for financial discipline.',
  'Jharkhand has maintained fiscal discipline with revenue surplus and controlled fiscal deficit as per FRBM targets.',
];
const MISSION = [
  'Achieve zero-delay in salary, pension, and scheme fund disbursements through automated treasury systems.',
  'Implement outcome-based budgeting linking expenditure to measurable development outcomes.',
  'Strengthen internal audit mechanisms to prevent financial irregularities and ensure value for money.',
  'Expand own-tax revenue through GST compliance, property tax reforms, and new revenue sources.',
  'Achieve full PFMS integration for all government schemes ensuring real-time fund tracking.',
  'Implement e-procurement and GeM portal for all government purchases to ensure transparency.',
  'Maintain fiscal deficit within FRBM limits while maximizing capital expenditure for development.',
];
export default function FinancePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#14532d,#15803d)', color: '#dcfce7', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; FINANCE DEPARTMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #15803d', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #15803d', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#15803d', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#14532d', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Finance Department</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #15803d', color: '#15803d', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#15803d', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#14532d,#15803d)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#86efac', letterSpacing: '0.12em', marginBottom: 6 }}>PFMS — FRBM — STATE BUDGET — TREASURY</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Finance Department</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dcfce7', maxWidth: 680 }}>Managing Jharkhand's ₹1.25 lakh crore budget, treasury operations, fiscal policy, and public financial management for transparent and accountable governance.</p>
          </div>
          <span style={{ fontSize: 64 }}>💰</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bbf7d0', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#15803d', textAlign: 'center', borderTop: '1px solid #f0fdf4' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bbf7d0', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dcfce7', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#15803d', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bbf7d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dcfce7', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#15803d', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

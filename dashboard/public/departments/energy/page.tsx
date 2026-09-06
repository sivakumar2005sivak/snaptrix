'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&q=80', caption: 'Solar Energy & Renewable Power' },
  { src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80', caption: 'Rural Electrification — SAUBHAGYA' },
  { src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80', caption: 'Smart Grid & Power Distribution' },
  { src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80', caption: 'Wind & Hydro Power Projects' },
];
const ABOUT = [
  'The Department of Energy oversees power generation, transmission, and distribution across Jharkhand through JBVNL and JPTCL.',
  'Jharkhand State Electricity Board was restructured into Jharkhand Bijli Vitran Nigam Limited (JBVNL) for efficient power distribution.',
  'The state has significant potential for renewable energy including solar, wind, small hydro, and biomass power.',
  'SAUBHAGYA scheme achieved near 100% household electrification across all 24 districts of Jharkhand.',
  'The state is developing solar parks and rooftop solar installations under PM-KUSUM and PM Surya Ghar schemes.',
  'Smart metering and SCADA systems are being deployed to reduce AT&C losses and improve billing efficiency.',
  'Jharkhand Renewable Energy Development Agency (JREDA) promotes clean energy adoption across the state.',
];
const MISSION = [
  'Achieve 24x7 reliable power supply to all households, industries, and commercial establishments across Jharkhand.',
  'Expand renewable energy capacity to 4,000 MW by 2030 through solar parks, rooftop solar, and small hydro projects.',
  'Reduce Aggregate Technical & Commercial (AT&C) losses to below 15% through smart metering and network upgradation.',
  'Implement PM Surya Ghar scheme to install rooftop solar panels on 1 lakh households by 2026.',
  'Develop green hydrogen and energy storage solutions for grid stability and clean energy transition.',
  'Strengthen rural feeder separation to ensure quality power supply to agricultural and domestic consumers.',
  'Promote energy efficiency in government buildings, street lighting, and public infrastructure through LED and BEE programmes.',
];
export default function EnergyPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#713f12,#a16207)', color: '#fef9c3', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF ENERGY
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #a16207', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #a16207', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#a16207', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#713f12', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Energy</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #a16207', color: '#a16207', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#a16207', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#713f12,#a16207)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fde68a', letterSpacing: '0.12em', marginBottom: 6 }}>JBVNL — JREDA — RENEWABLE ENERGY</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Energy</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#fef9c3', maxWidth: 680 }}>Powering Jharkhand with 24x7 reliable electricity, expanding solar energy capacity, and achieving clean energy transition through JBVNL and JREDA.</p>
          </div>
          <span style={{ fontSize: 64 }}>⚡</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #fde68a', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#a16207', textAlign: 'center', borderTop: '1px solid #fefce8' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fde68a', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fef9c3', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#a16207', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fde68a', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fef9c3', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#a16207', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

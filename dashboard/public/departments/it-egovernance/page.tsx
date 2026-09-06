'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', caption: 'Digital Jharkhand — e-District Services' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', caption: 'Common Service Centres (CSC) Network' },
  { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', caption: 'State Data Centre & Cloud Infrastructure' },
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', caption: 'NIC & Digital Governance Initiatives' },
];
const ABOUT = [
  'The Department of IT & e-Governance drives digital transformation of government services across Jharkhand.',
  'Jharkhand e-District portal provides 50+ citizen services including certificates, licences, and social welfare applications.',
  'Over 5,000 Common Service Centres (CSCs) across the state deliver digital services to rural citizens.',
  'State Data Centre in Ranchi hosts critical government applications with 99.9% uptime and disaster recovery.',
  'National Informatics Centre (NIC) Jharkhand provides technical support for all e-governance initiatives.',
  'BharatNet project has connected all gram panchayats with optical fibre for high-speed internet access.',
  'Jharkhand Integrated Police Application (JIPA) and e-Procurement portal are flagship digital governance projects.',
];
const MISSION = [
  'Achieve 100% digital delivery of all citizen-facing government services through mobile and web platforms.',
  'Expand CSC network to all panchayats with trained village-level entrepreneurs for last-mile service delivery.',
  'Implement AI-powered chatbots and voice assistants in local languages for citizen service guidance.',
  'Develop Jharkhand State Cloud for secure hosting of all government applications and data.',
  'Establish cybersecurity operations centre for real-time monitoring and protection of government IT systems.',
  'Deploy blockchain-based land records, certificates, and welfare scheme management for tamper-proof records.',
  'Achieve digital literacy for 50 lakh citizens through PM-WANI and digital skill development programmes.',
];
export default function ITEGovernancePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#312e81,#6d28d9)', color: '#ede9fe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF IT & e-GOVERNANCE</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #6d28d9', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #6d28d9', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#6d28d9', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#312e81', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of IT & e-Governance</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #6d28d9', color: '#6d28d9', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#6d28d9', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#312e81,#6d28d9)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#c4b5fd', letterSpacing: '0.12em', marginBottom: 6 }}>NIC — CSC — e-DISTRICT — BHARATNET — DIGITAL JHARKHAND</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of IT & e-Governance</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#ede9fe', maxWidth: 680 }}>Transforming governance through 50+ digital services, 5,000+ CSCs, BharatNet connectivity, and state data centre infrastructure for Digital Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>💻</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #ddd6fe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#6d28d9', textAlign: 'center', borderTop: '1px solid #f5f3ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #ddd6fe', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ede9fe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#6d28d9', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #ddd6fe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ede9fe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#6d28d9', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

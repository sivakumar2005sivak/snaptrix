'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', caption: 'IAS/IPS Cadre Management & Postings' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', caption: 'Administrative Reforms & Service Rules' },
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', caption: 'Training & Capacity Building — JIPA' },
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', caption: 'Rajbhasha — Hindi Promotion Initiatives' },
];
const ABOUT = [
  'The Department of Personnel, Administrative Reforms & Rajbhasha manages civil services, service rules, and administrative reforms in Jharkhand.',
  'The department handles cadre management of IAS, IPS, IFS, and state civil service officers across all departments.',
  'Jharkhand Institute of Public Administration (JIPA) provides training and capacity building for government officers.',
  'Service rules, recruitment regulations, and disciplinary proceedings are managed by this department.',
  'Administrative reforms focus on simplification of procedures, reduction of red tape, and citizen-centric governance.',
  'Rajbhasha division promotes use of Hindi in official communications and implements Official Language Act.',
  'The department coordinates with UPSC and JPSC for recruitment of civil service officers.',
];
const MISSION = [
  'Implement e-service book and digital HR management for all state government employees.',
  'Strengthen JIPA training programmes with focus on ethics, technology, and citizen service delivery.',
  'Simplify service rules and reduce procedural delays in promotions, transfers, and disciplinary matters.',
  'Achieve 100% Hindi usage in official correspondence and government communications.',
  'Implement performance appraisal system linked to measurable outcomes for all officers.',
  'Develop leadership pipeline through structured career progression and mentoring programmes.',
  'Establish grievance redressal mechanism for government employees with time-bound resolution.',
];
export default function PersonnelAdminPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#3b0764,#7e22ce)', color: '#f3e8ff', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF PERSONNEL, ADMINISTRATIVE REFORMS & RAJBHASHA</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #7e22ce', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #7e22ce', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#7e22ce', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#3b0764', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of Personnel, Admin Reforms & Rajbhasha</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #7e22ce', color: '#7e22ce', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#7e22ce', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#3b0764,#7e22ce)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#d8b4fe', letterSpacing: '0.12em', marginBottom: 6 }}>JIPA — IAS/IPS CADRE — SERVICE RULES — RAJBHASHA</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Personnel, Administrative Reforms & Rajbhasha</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#f3e8ff', maxWidth: 680 }}>Managing civil service cadres, implementing administrative reforms, building officer capacity through JIPA, and promoting Hindi as Rajbhasha across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>📁</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e9d5ff', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#7e22ce', textAlign: 'center', borderTop: '1px solid #faf5ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e9d5ff', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #f3e8ff', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#7e22ce', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e9d5ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #f3e8ff', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#7e22ce', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

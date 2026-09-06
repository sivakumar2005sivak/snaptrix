'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', caption: 'Government Buildings & Secretariat' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80', caption: 'Public Works & Construction Standards' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', caption: 'Infrastructure Development Projects' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Quality Control & Project Monitoring' },
];
const ABOUT = [
  'The Building Construction Department constructs and maintains government buildings, public works, and state infrastructure in Jharkhand.',
  'The department is responsible for construction of secretariat buildings, government offices, courts, and public institutions.',
  'Jharkhand Building Construction Corporation (JBCC) executes major construction projects across the state.',
  'The department maintains over 5,000 government buildings including offices, residences, and public facilities.',
  'Construction quality is ensured through third-party quality control and regular structural audits.',
  'Green building norms and energy efficiency standards are implemented in all new government constructions.',
  'The department coordinates with PWD for maintenance of government infrastructure and public amenities.',
];
const MISSION = [
  'Complete all ongoing government building projects within scheduled timelines and approved budgets.',
  'Implement green building standards with solar panels, rainwater harvesting, and energy-efficient designs.',
  'Conduct structural safety audit of all government buildings and undertake necessary retrofitting.',
  'Digitize all construction project monitoring with real-time progress tracking and quality reports.',
  'Develop model government office complexes in all district headquarters with modern amenities.',
  'Achieve zero cost overrun through improved project planning, procurement, and contract management.',
  'Establish construction material testing laboratories in all divisions for quality assurance.',
];
export default function BuildingConstructionPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1c1917,#78716c)', color: '#f5f5f4', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; BUILDING CONSTRUCTION DEPARTMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #78716c', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #78716c', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#78716c', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1c1917', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Building Construction Department</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #78716c', color: '#78716c', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#78716c', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1c1917,#78716c)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#d6d3d1', letterSpacing: '0.12em', marginBottom: 6 }}>JBCC — PUBLIC WORKS — GREEN BUILDINGS — QUALITY CONTROL</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Building Construction Department</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#f5f5f4', maxWidth: 680 }}>Constructing and maintaining 5,000+ government buildings, implementing green building standards, and ensuring quality public infrastructure across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🏗️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #d6d3d1', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#78716c', textAlign: 'center', borderTop: '1px solid #fafaf9' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #d6d3d1', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #f5f5f4', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#78716c', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #d6d3d1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #f5f5f4', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#78716c', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

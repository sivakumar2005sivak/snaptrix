'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80', caption: 'Forest Conservation & Wildlife Sanctuaries' },
  { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80', caption: 'Pollution Control & Clean Air Initiatives' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', caption: 'Jharkhand Green Cover & Afforestation' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'Climate Action & Wetland Conservation' },
];
const ABOUT = [
  'Jharkhand has 29.6% of its geographical area under forest cover, making forest conservation a critical mandate.',
  'The department manages 23 forest divisions, 1 national park (Betla), and 11 wildlife sanctuaries.',
  'Jharkhand State Pollution Control Board (JSPCB) monitors air, water, and soil pollution across industrial zones.',
  'Joint Forest Management (JFM) involves local communities in forest protection and benefit sharing.',
  'The department implements compensatory afforestation and green belt development under CAMPA funds.',
  'Climate change action plan focuses on reducing emissions, promoting renewable energy, and protecting biodiversity.',
  'Minor forest produce (tendu leaves, mahua, sal seeds) provides livelihood to millions of tribal families.',
];
const MISSION = [
  'Increase forest cover to 33% of geographical area through afforestation and natural regeneration programmes.',
  'Protect all wildlife sanctuaries and national parks from encroachment, poaching, and illegal felling.',
  'Achieve zero industrial pollution through strict enforcement of environmental norms and green technology adoption.',
  'Implement Jharkhand Climate Change Action Plan with measurable targets for emission reduction.',
  'Strengthen Joint Forest Management committees for community-based forest protection and benefit sharing.',
  'Develop eco-tourism circuits in Betla, Dalma, and Hazaribagh wildlife areas for sustainable tourism.',
  'Ensure fair and timely payment for minor forest produce to tribal collectors through cooperative marketing.',
];
export default function ForestEnvironmentPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#14532d,#15803d)', color: '#dcfce7', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF FOREST, ENVIRONMENT & CLIMATE CHANGE</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #15803d', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #15803d', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#15803d', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#14532d', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of Forest, Environment & Climate Change</h1>
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
            <div style={{ fontSize: 11, fontWeight: 800, color: '#86efac', letterSpacing: '0.12em', marginBottom: 6 }}>JSPCB — JFM — CAMPA — CLIMATE ACTION</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Forest, Environment & Climate Change</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dcfce7', maxWidth: 680 }}>Conserving Jharkhand's 29.6% forest cover, protecting 11 wildlife sanctuaries, controlling pollution, and implementing climate action plans for a green future.</p>
          </div>
          <span style={{ fontSize: 64 }}>🌳</span>
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

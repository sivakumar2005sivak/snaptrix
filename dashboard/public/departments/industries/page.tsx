'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80', caption: 'Industrial Parks & MSME Clusters' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', caption: 'Startup Jharkhand — Innovation Ecosystem' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'Investment Facilitation — Momentum Jharkhand' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', caption: 'JIIDCO — Industrial Infrastructure Development' },
];
const ABOUT = [
  'The Department of Industries promotes industrial development, MSME growth, and investment facilitation across Jharkhand.',
  'Jharkhand Industrial & Investment Promotion Policy provides incentives for new industries including capital subsidy and tax exemptions.',
  'Jharkhand Industrial Infrastructure Development Corporation (JIIDCO) develops industrial areas and estates.',
  'Momentum Jharkhand investment summits have attracted over ₹3 lakh crore in investment commitments.',
  'The state has established dedicated industrial corridors along NH-33 and NH-2 for large-scale manufacturing.',
  'MSME Development Institutes provide training, technology support, and credit facilitation to small enterprises.',
  'Startup Jharkhand initiative supports technology startups with incubation, mentoring, and seed funding.',
];
const MISSION = [
  'Attract ₹1 lakh crore in new industrial investments through proactive investor facilitation and single-window clearance.',
  'Develop 10 new industrial parks with plug-and-play infrastructure for MSME and large industries.',
  'Register and support 50,000 new MSMEs through simplified registration, credit linkage, and market access.',
  'Establish Jharkhand as a hub for steel, auto components, food processing, and IT/ITeS industries.',
  'Implement Industry 4.0 adoption in existing industries through technology upgradation schemes.',
  'Create 5 lakh new industrial employment opportunities with focus on local youth and women.',
  'Develop export promotion zones and facilitate Jharkhand products in national and international markets.',
];
export default function IndustriesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#0c4a6e,#0284c7)', color: '#e0f2fe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF INDUSTRIES</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #0284c7', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #0284c7', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#0284c7', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#0c4a6e', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Industries</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #0284c7', color: '#0284c7', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#0284c7', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#0c4a6e,#0284c7)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.12em', marginBottom: 6 }}>JIIDCO — MSME — MOMENTUM JHARKHAND — STARTUP</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Industries</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#e0f2fe', maxWidth: 680 }}>Driving industrial growth through investment facilitation, MSME promotion, industrial parks, and startup ecosystem development across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🏭</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bae6fd', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#0284c7', textAlign: 'center', borderTop: '1px solid #f0f9ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bae6fd', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0f2fe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#0284c7', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bae6fd' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0f2fe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#0284c7', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

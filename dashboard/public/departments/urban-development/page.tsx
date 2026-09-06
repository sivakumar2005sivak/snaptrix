'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', caption: 'Smart Cities Mission — Ranchi & Dhanbad' },
  { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80', caption: 'AMRUT — Urban Infrastructure Upgradation' },
  { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', caption: 'Urban Housing & Slum Redevelopment' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Town Planning & Municipal Services' },
];
const ABOUT = [
  'The Department of Urban Development & Housing oversees urban local bodies, town planning, and housing schemes across Jharkhand.',
  'Jharkhand has 49 urban local bodies including 3 municipal corporations (Ranchi, Dhanbad, Adityapur) and 16 municipalities.',
  'Smart Cities Mission has selected Ranchi for integrated urban development with smart infrastructure and digital governance.',
  'AMRUT 2.0 focuses on water supply, sewerage, urban transport, and green spaces in 7 Jharkhand cities.',
  'Pradhan Mantri Awaas Yojana (Urban) targets housing for all urban poor through in-situ slum redevelopment.',
  'The department regulates building construction, land use, and town planning through development authorities.',
  'Jharkhand Urban Infrastructure Development Company (JUIDCO) implements urban infrastructure projects.',
];
const MISSION = [
  'Achieve 100% coverage of piped water supply and sewerage connections in all urban local bodies by 2026.',
  'Complete Smart Cities Mission projects in Ranchi including integrated command centre and smart mobility.',
  'Provide pucca housing to all urban homeless and slum dwellers under PMAY-Urban.',
  'Develop master plans for all 49 urban local bodies with clear land use zoning and building regulations.',
  'Implement solid waste management with door-to-door collection and scientific disposal in all municipalities.',
  'Strengthen urban local body finances through property tax reforms and own-source revenue enhancement.',
  'Create green spaces, parks, and pedestrian infrastructure in all cities for improved quality of urban life.',
];
export default function UrbanDevelopmentPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1e3a5f,#1d4ed8)', color: '#dbeafe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF URBAN DEVELOPMENT & HOUSING</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #1d4ed8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #1d4ed8', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1e3a5f', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Urban Development & Housing</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #1d4ed8', color: '#1d4ed8', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#1d4ed8', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1e3a5f,#1d4ed8)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#93c5fd', letterSpacing: '0.12em', marginBottom: 6 }}>SMART CITIES — AMRUT — PMAY-U — JUIDCO</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Urban Development & Housing</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dbeafe', maxWidth: 680 }}>Building smart, liveable cities through Smart Cities Mission, AMRUT infrastructure, urban housing, and strengthened municipal governance across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🏙️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bfdbfe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#1d4ed8', textAlign: 'center', borderTop: '1px solid #eff6ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#1d4ed8', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#1d4ed8', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

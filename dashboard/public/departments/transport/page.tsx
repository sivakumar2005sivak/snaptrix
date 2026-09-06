'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80', caption: 'Public Bus Transport & State Roadways' },
  { src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80', caption: 'Vehicle Registration & Driving Licences' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Road Safety & Traffic Management' },
  { src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80', caption: 'Vahan & Sarathi — Digital Transport Services' },
];
const ABOUT = [
  'The Department of Transport regulates motor vehicles, public transport, road safety, and transport infrastructure across Jharkhand.',
  'Jharkhand has over 35 lakh registered vehicles with Ranchi, Dhanbad, and Jamshedpur being the major transport hubs.',
  'The department operates through 24 district transport offices providing vehicle registration and driving licence services.',
  'Vahan and Sarathi portals enable online vehicle registration, fitness certificates, and driving licence applications.',
  'Jharkhand State Road Transport Corporation (JSRTC) operates bus services connecting district headquarters and remote areas.',
  'Road safety campaigns, helmet enforcement, and drunk driving checks are conducted regularly across the state.',
  'The department enforces Motor Vehicles Act provisions including overloading, pollution norms, and fitness standards.',
];
const MISSION = [
  'Digitize all transport services including vehicle registration, fitness, and permit issuance through Vahan/Sarathi portals.',
  'Reduce road accident fatalities by 50% through strict enforcement, road engineering improvements, and awareness campaigns.',
  'Expand JSRTC bus network to connect all block headquarters with reliable and affordable public transport.',
  'Implement electronic toll collection and GPS tracking on all state highways for efficient traffic management.',
  'Achieve zero backlog in driving licence and vehicle registration services through process automation.',
  'Promote electric vehicles through EV charging infrastructure and incentive schemes for green transport.',
  'Strengthen motor vehicle inspection centres for scientific fitness testing of commercial vehicles.',
];
export default function TransportPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1e1b4b,#4338ca)', color: '#e0e7ff', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF TRANSPORT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #4338ca', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #4338ca', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#4338ca', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1e1b4b', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Transport</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #4338ca', color: '#4338ca', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#4338ca', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1e1b4b,#4338ca)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#a5b4fc', letterSpacing: '0.12em', marginBottom: 6 }}>VAHAN — SARATHI — JSRTC — ROAD SAFETY</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Transport</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#e0e7ff', maxWidth: 680 }}>Regulating 35 lakh+ vehicles, enabling digital transport services, expanding public bus connectivity, and enforcing road safety across all 24 districts of Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🚌</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #c7d2fe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#4338ca', textAlign: 'center', borderTop: '1px solid #eef2ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #c7d2fe', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0e7ff', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#4338ca', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #c7d2fe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0e7ff', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#4338ca', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

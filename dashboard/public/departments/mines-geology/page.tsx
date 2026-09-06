'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80', caption: 'Coal & Iron Ore Mining Operations' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'Mineral Exploration & Geological Surveys' },
  { src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80', caption: 'JSMDC — State Mineral Development' },
  { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80', caption: 'Mining Lease Regulation & Compliance' },
];
const ABOUT = [
  'Jharkhand is the mineral capital of India, possessing 40% of the country\'s total mineral reserves including coal, iron ore, copper, and mica.',
  'The Department of Mines & Geology regulates mining leases, mineral exploration, and geological surveys across the state.',
  'Jharkhand State Mineral Development Corporation (JSMDC) undertakes mining of coal, stone, and other minerals.',
  'The state has major coalfields in Dhanbad, Bokaro, Ramgarh, and Giridih contributing significantly to national coal production.',
  'Iron ore deposits in Singhbhum district feed major steel plants including Tata Steel in Jamshedpur.',
  'The department enforces the Mines & Minerals (Development & Regulation) Act and state mineral policy.',
  'District Mineral Foundation (DMF) funds are utilized for development of mining-affected communities.',
];
const MISSION = [
  'Achieve transparent and efficient mineral lease management through the TAMRA online portal.',
  'Maximize revenue from mineral royalties while ensuring sustainable and environment-friendly mining practices.',
  'Utilize District Mineral Foundation funds for education, health, and infrastructure in mining-affected areas.',
  'Conduct systematic geological mapping and mineral exploration to identify new mineral deposits.',
  'Prevent illegal mining through real-time surveillance, drone monitoring, and strict enforcement.',
  'Promote value addition and mineral processing industries to generate employment in mining regions.',
  'Ensure rehabilitation and resettlement of communities displaced by mining activities.',
];
export default function MinesGeologyPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#292524,#57534e)', color: '#e7e5e4', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF MINES & GEOLOGY</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #57534e', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #57534e', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#57534e', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#292524', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Mines & Geology</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #57534e', color: '#57534e', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#57534e', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#292524,#57534e)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#d6d3d1', letterSpacing: '0.12em', marginBottom: 6 }}>JSMDC — TAMRA — DMF — MMDR ACT</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Mines & Geology</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#e7e5e4', maxWidth: 680 }}>Managing India's mineral capital — regulating coal, iron ore, copper & mica mining, geological surveys, and ensuring sustainable mineral development across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>⛏️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #d6d3d1', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#57534e', textAlign: 'center', borderTop: '1px solid #fafaf9' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #d6d3d1', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e7e5e4', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#57534e', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #d6d3d1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e7e5e4', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#57534e', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

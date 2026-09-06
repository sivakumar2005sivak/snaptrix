'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80', caption: 'PMGSY Rural Road Construction' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'State Highway Expansion Projects' },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', caption: 'Bridge & Culvert Construction' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', caption: 'Road Safety & Traffic Management' },
];
const ABOUT = [
  'The Department of Road Construction is responsible for planning, construction, and maintenance of state highways, district roads, and rural roads in Jharkhand.',
  'Jharkhand has a road network of over 35,000 km including national highways, state highways, and district roads.',
  'PMGSY (Pradhan Mantri Gram Sadak Yojana) has connected thousands of unconnected habitations with all-weather roads.',
  'The department constructs and maintains bridges, culverts, and flyovers to improve connectivity across hilly terrain.',
  'Road safety measures including signage, road markings, crash barriers, and speed breakers are implemented on all major roads.',
  'The department uses modern construction technologies including cold mix, warm mix asphalt, and rigid pavement for durable roads.',
  'Quality control laboratories at district level ensure compliance with IRC standards for road construction.',
];
const MISSION = [
  'Achieve 100% all-weather road connectivity to all habitations with population above 250 under PMGSY Phase-III.',
  'Upgrade all state highways to 2-lane standards with proper drainage, signage, and safety features.',
  'Construct missing bridges and culverts on rural roads to eliminate connectivity gaps during monsoon season.',
  'Implement road asset management system for planned maintenance and lifecycle cost optimization.',
  'Reduce road accident fatalities by 50% through engineering improvements, enforcement, and awareness campaigns.',
  'Adopt green road construction practices using recycled materials, fly ash, and plastic waste in road building.',
  'Complete all ongoing road projects under JRRDA, NABARD, and state plan within stipulated timelines.',
];
export default function RoadConstructionPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1c1917,#44403c)', color: '#fef3c7', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF ROAD CONSTRUCTION
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #44403c', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #44403c', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#44403c', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1c1917', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Road Construction</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #44403c', color: '#44403c', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#44403c', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1c1917,#44403c)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fcd34d', letterSpacing: '0.12em', marginBottom: 6 }}>PMGSY — STATE HIGHWAYS — JRRDA</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Road Construction</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#fef3c7', maxWidth: 680 }}>Building all-weather roads, bridges, and highways across Jharkhand's 24 districts to ensure seamless rural-urban connectivity and economic growth.</p>
          </div>
          <span style={{ fontSize: 64 }}>🛣️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e7e5e4', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#44403c', textAlign: 'center', borderTop: '1px solid #fafaf9' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e7e5e4', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #f5f5f4', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#44403c', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e7e5e4', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #f5f5f4', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#44403c', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', caption: 'Tribal Community Development' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', caption: 'ST/SC Scholarship & Education Support' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80', caption: 'Eklavya Model Residential Schools' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', caption: 'Tribal Sub-Plan & Welfare Schemes' },
];
const ABOUT = [
  'Jharkhand has 32 Scheduled Tribes constituting about 26% of the state population, making tribal welfare a priority mandate.',
  'The department implements post-matric scholarships, pre-matric scholarships, and fellowship schemes for ST/SC students.',
  'Eklavya Model Residential Schools (EMRS) provide quality education to tribal students in remote areas.',
  'Tribal Sub-Plan (TSP) ensures dedicated budget allocation for tribal development across all departments.',
  'The department protects tribal land rights under the Chota Nagpur Tenancy Act and Santhal Pargana Tenancy Act.',
  'Minority welfare schemes support Muslim, Christian, Sikh, Buddhist, and Jain communities in the state.',
  'Backward Class welfare programmes cover OBC communities with scholarships, hostels, and skill development.',
];
const MISSION = [
  'Ensure 100% enrollment of tribal children in quality schools through EMRS and residential school expansion.',
  'Protect tribal land rights and prevent illegal land alienation through strict enforcement of tenancy laws.',
  'Provide post-matric scholarships to all eligible ST/SC students for higher and technical education.',
  'Develop tribal cultural heritage centres to preserve and promote indigenous art, music, and traditions.',
  'Strengthen tribal cooperative societies for marketing of forest produce and agricultural products.',
  'Implement Van Dhan Vikas Kendras for value addition to minor forest produce collected by tribal communities.',
  'Achieve socio-economic parity for tribal communities through targeted infrastructure and livelihood programmes.',
];
export default function TribalWelfarePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#7c2d12,#c2410c)', color: '#ffedd5', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPT. OF ST, SC, MINORITY & BACKWARD CLASS WELFARE</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #c2410c', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #c2410c', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#c2410c', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#7c2d12', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of ST, SC, Minority & Backward Class Welfare</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #c2410c', color: '#c2410c', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#c2410c', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#7c2d12,#c2410c)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fed7aa', letterSpacing: '0.12em', marginBottom: 6 }}>EMRS — TSP — TRIBAL LAND RIGHTS</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>ST, SC, Minority & Backward Class Welfare</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#ffedd5', maxWidth: 680 }}>Protecting tribal rights, providing scholarships, and developing 32 Scheduled Tribes through EMRS, Tribal Sub-Plan, and Van Dhan Vikas Kendras.</p>
          </div>
          <span style={{ fontSize: 64 }}>🤝</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #fed7aa', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#c2410c', textAlign: 'center', borderTop: '1px solid #fff7ed' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fed7aa', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ffedd5', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#c2410c', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fed7aa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ffedd5', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#c2410c', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', caption: 'Jharbhoomi — Digital Land Records Portal' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', caption: 'Property Registration & Mutation Services' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', caption: 'Land Acquisition & Rehabilitation' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', caption: 'Revenue Courts & Dispute Resolution' },
];
const ABOUT = [
  'The Department of Revenue, Registration & Land Reforms manages land records, property registration, and land administration across Jharkhand.',
  'Jharbhoomi portal provides online access to land records (ROR), mutation status, and land maps for all citizens.',
  'The department operates 24 district registration offices and 260+ sub-registrar offices for property transactions.',
  'Land records digitization has been completed for all 24 districts with online mutation and ROR services.',
  'The Chotanagpur Tenancy Act and Santhal Pargana Tenancy Act protect tribal land rights in Jharkhand.',
  'Revenue courts at district and sub-divisional levels adjudicate land disputes and tenancy matters.',
  'The department coordinates land acquisition for public projects under the Right to Fair Compensation Act.',
];
const MISSION = [
  'Achieve 100% digital land records with real-time updation of mutations and encumbrance certificates.',
  'Reduce property registration time to same-day service through process automation and e-stamping.',
  'Protect tribal land rights by strict enforcement of CNT and SPT Acts against illegal transfers.',
  'Complete cadastral survey and land mapping using drone technology for all villages by 2026.',
  'Establish fast-track revenue courts to clear backlog of land dispute cases within 6 months.',
  'Integrate Jharbhoomi with RERA, banks, and courts for seamless property transaction ecosystem.',
  'Implement fair and transparent land acquisition with timely compensation and rehabilitation.',
];
export default function RevenueLandPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#431407,#c2410c)', color: '#ffedd5', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF REVENUE, REGISTRATION & LAND REFORMS</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #c2410c', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #c2410c', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#c2410c', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#431407', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of Revenue, Registration & Land Reforms</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #c2410c', color: '#c2410c', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#c2410c', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#431407,#c2410c)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fed7aa', letterSpacing: '0.12em', marginBottom: 6 }}>JHARBHOOMI — CNT ACT — SPT ACT — E-REGISTRATION</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Revenue, Registration & Land Reforms</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#ffedd5', maxWidth: 680 }}>Digitizing land records through Jharbhoomi, protecting tribal land rights under CNT & SPT Acts, and enabling transparent property registration across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>📋</span>
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

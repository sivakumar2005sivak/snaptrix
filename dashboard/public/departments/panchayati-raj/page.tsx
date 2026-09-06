'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', caption: 'Gram Sabha & Village Governance' },
  { src: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80', caption: 'Panchayat Bhawan Infrastructure' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80', caption: 'Digital Panchayat e-Services' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', caption: 'Women Elected Representatives (Mukhiya)' },
];
const ABOUT = [
  'The Department of Panchayati Raj is responsible for strengthening the third tier of democratic governance in rural Jharkhand.',
  'Jharkhand has a three-tier Panchayati Raj system: Gram Panchayat, Panchayat Samiti, and Zila Parishad.',
  'There are 4,354 Gram Panchayats, 263 Panchayat Samitis, and 24 Zila Parishads across the state.',
  'The department ensures devolution of powers, functions, and funds to elected local bodies as per the 73rd Constitutional Amendment.',
  'Gram Sabha meetings are mandatory for approving local development plans, beneficiary selection, and social audits.',
  'The department manages Panchayat elections, training of elected representatives, and capacity building programmes.',
  'e-Panchayat initiatives digitize service delivery, fund tracking, and meeting records at the grassroots level.',
];
const MISSION = [
  'Strengthen democratic decentralization by empowering Gram Panchayats with adequate funds, functions, and functionaries.',
  'Ensure timely conduct of Panchayat elections and reservation of seats for SC, ST, OBC, and women candidates.',
  'Promote participatory planning through Gram Sabha and ward sabha meetings for local development priorities.',
  'Implement e-Panchayat portal for transparent fund utilization, asset management, and citizen service delivery.',
  'Build capacity of elected representatives through regular training programmes and exposure visits.',
  'Integrate Panchayat plans with district and state development plans for convergence of resources.',
  'Achieve 100% geo-tagging of Panchayat assets and completion of Panchayat Bhawan construction across all GPs.',
];
export default function PanchayatiRajPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#3b2a1a,#5c3d1e)', color: '#fff8dd', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF PANCHAYATI RAJ
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #165d36', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #165d36', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#165d36', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#0f2e1e', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Panchayati Raj</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #165d36', color: '#165d36', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#165d36', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#0f2e1e,#165d36)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#86efac', letterSpacing: '0.12em', marginBottom: 6 }}>OFFICIAL STATE MANDATE</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Panchayati Raj</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#d1fae5', maxWidth: 680 }}>Strengthening grassroots democracy through 4,354 Gram Panchayats, e-Panchayat services, and devolution of powers to elected local bodies.</p>
          </div>
          <span style={{ fontSize: 64 }}>🏛️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #eaf3eb', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#165d36', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #eaf3eb', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#165d36', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80', caption: 'Jal Jeevan Mission — Piped Water Supply' },
  { src: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80', caption: 'Rural Sanitation & ODF Villages' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'Water Quality Testing Laboratories' },
  { src: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&q=80', caption: 'Solar-Powered Water Pumping Stations' },
];
const ABOUT = [
  'The Department of Drinking Water & Sanitation implements Jal Jeevan Mission (JJM) to provide tap water connections to every rural household by 2024.',
  'Jharkhand has over 60 lakh rural households, of which a significant proportion lacked piped water supply before JJM.',
  'The Swachh Bharat Mission (Gramin) Phase-II focuses on sustaining ODF status and improving solid/liquid waste management.',
  'Water quality surveillance is conducted through district and block-level testing laboratories to ensure safe drinking water.',
  'The department manages hand pumps, piped water schemes, and overhead tanks across 32,000+ villages.',
  'Village Water & Sanitation Committees (VWSCs) are empowered to manage and maintain local water supply infrastructure.',
  'Special focus is given to fluoride and arsenic-affected habitations with treatment plants and alternative water sources.',
];
const MISSION = [
  'Achieve 100% Functional Household Tap Connection (FHTC) coverage under Jal Jeevan Mission across all 24 districts.',
  'Ensure water quality compliance by testing all water sources at least twice a year for chemical and bacteriological parameters.',
  'Sustain ODF Plus status in all Gram Panchayats through solid waste management and grey water treatment.',
  'Empower Village Water & Sanitation Committees for community-led operation and maintenance of water systems.',
  'Install solar-powered pumping systems in remote habitations to ensure round-the-clock water availability.',
  'Address water quality issues in fluoride, arsenic, and iron-affected habitations with appropriate treatment solutions.',
  'Integrate IoT-based sensors for real-time monitoring of water supply systems and leak detection.',
];
export default function DrinkingWaterPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#0c4a6e,#0369a1)', color: '#e0f2fe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF DRINKING WATER & SANITATION
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #0369a1', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #0369a1', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#0369a1', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#0c4a6e', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Drinking Water & Sanitation</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #0369a1', color: '#0369a1', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#0369a1', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#0c4a6e,#0369a1)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#7dd3fc', letterSpacing: '0.12em', marginBottom: 6 }}>JAL JEEVAN MISSION — HAR GHAR JAL</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Drinking Water & Sanitation</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#e0f2fe', maxWidth: 680 }}>Ensuring safe piped drinking water to every rural household under Jal Jeevan Mission and sustaining ODF Plus status through Swachh Bharat Mission.</p>
          </div>
          <span style={{ fontSize: 64 }}>🚰</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bae6fd', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#0369a1', textAlign: 'center', borderTop: '1px solid #f0f9ff' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bae6fd', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0f2fe', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#0369a1', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bae6fd', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0f2fe', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#0369a1', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

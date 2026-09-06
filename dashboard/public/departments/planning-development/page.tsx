'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', caption: 'State Annual Plan & Development Monitoring' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', caption: 'NITI Aayog Coordination & SDG Tracking' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'District Planning & Decentralized Development' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', caption: 'Data Analytics & Development Indicators' },
];
const ABOUT = [
  'The Planning & Development Department coordinates state annual plans, development monitoring, and NITI Aayog liaison for Jharkhand.',
  'The department prepares the State Annual Action Plan allocating resources across all sectors and departments.',
  'Jharkhand Vision 2030 document outlines long-term development goals for economic growth and social welfare.',
  'District Planning Committees prepare district-level plans integrating panchayat and urban local body priorities.',
  'The department tracks Sustainable Development Goals (SDGs) progress and coordinates with NITI Aayog.',
  'State Planning Board provides expert guidance on development priorities and resource allocation strategies.',
  'Programme Evaluation Organisation conducts impact assessments of major government schemes and programmes.',
];
const MISSION = [
  'Prepare evidence-based state annual plans aligned with SDGs and Jharkhand Vision 2030 targets.',
  'Strengthen district planning processes with data-driven resource allocation and outcome monitoring.',
  'Achieve top 10 ranking in NITI Aayog\'s SDG India Index through targeted interventions.',
  'Implement real-time development monitoring dashboard for tracking scheme implementation across districts.',
  'Conduct annual programme evaluations to assess impact and redirect resources to high-priority areas.',
  'Develop Jharkhand Economic Survey and statistical yearbook for informed policy making.',
  'Strengthen planning capacity at district and block levels through training and technical support.',
];
export default function PlanningDevelopmentPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#164e63,#0891b2)', color: '#cffafe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF PLANNING & DEVELOPMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #0891b2', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #0891b2', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#0891b2', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#164e63', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Planning & Development</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #0891b2', color: '#0891b2', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#0891b2', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#164e63,#0891b2)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#a5f3fc', letterSpacing: '0.12em', marginBottom: 6 }}>NITI AAYOG — SDG — VISION 2030 — DISTRICT PLANNING</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Planning & Development</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#cffafe', maxWidth: 680 }}>Coordinating state annual plans, tracking SDG progress, and enabling data-driven district planning for Jharkhand's Vision 2030 development goals.</p>
          </div>
          <span style={{ fontSize: 64 }}>📊</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #a5f3fc', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#0891b2', textAlign: 'center', borderTop: '1px solid #ecfeff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #a5f3fc', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #cffafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#0891b2', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #a5f3fc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #cffafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#0891b2', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', caption: 'Jharkhand Police — Law & Order' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'SDRF — Disaster Response Force' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80', caption: 'Flood Relief & Disaster Management' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', caption: 'Prison Reforms & Rehabilitation' },
];
const ABOUT = [
  'The Department of Home, Prison & Disaster Management maintains law and order, manages prisons, and coordinates disaster response in Jharkhand.',
  'Jharkhand Police has over 70,000 personnel deployed across 24 districts with specialized units for anti-naxal operations.',
  'The state has 32 prisons with a capacity of 15,000 inmates, implementing rehabilitation and skill development programmes.',
  'Jharkhand State Disaster Management Authority (JSDMA) coordinates disaster preparedness and response.',
  'State Disaster Response Force (SDRF) is deployed for flood, fire, earthquake, and other disaster relief operations.',
  'The department implements community policing initiatives including Jan Mitra and Gram Raksha Dal programmes.',
  'Cyber crime cells in all districts address online fraud, cyberbullying, and digital financial crimes.',
];
const MISSION = [
  'Maintain law and order through community policing, technology-driven surveillance, and rapid response systems.',
  'Modernize Jharkhand Police with body cameras, drones, and AI-based crime analytics for effective policing.',
  'Implement comprehensive prison reforms including skill training, legal aid, and mental health support for inmates.',
  'Strengthen SDRF capacity with advanced rescue equipment and regular disaster simulation exercises.',
  'Achieve zero tolerance for organized crime, human trafficking, and cyber fraud through specialized task forces.',
  'Develop district disaster management plans with community-level first responder training programmes.',
  'Establish integrated emergency response system with single helpline for police, fire, and medical emergencies.',
];
export default function HomeDepartmentPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1e3a5f,#1e40af)', color: '#dbeafe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF HOME, PRISON & DISASTER MANAGEMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #1e40af', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #1e40af', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#1e40af', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1e3a5f', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of Home, Prison & Disaster Management</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #1e40af', color: '#1e40af', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#1e40af', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1e3a5f,#1e40af)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#93c5fd', letterSpacing: '0.12em', marginBottom: 6 }}>JHARKHAND POLICE — SDRF — JSDMA — PRISON REFORMS</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Home, Prison & Disaster Management</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dbeafe', maxWidth: 680 }}>Maintaining law and order through 70,000+ police personnel, managing 32 prisons, and coordinating disaster response through SDRF and JSDMA across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🛡️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bfdbfe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#1e40af', textAlign: 'center', borderTop: '1px solid #eff6ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#1e40af', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#1e40af', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80', caption: 'PMKVY Skill Development Training' },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', caption: 'Industrial Training Institutes (ITIs)' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', caption: 'Employment Exchange & Job Fairs' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80', caption: 'Labour Welfare & ESIC Benefits' },
];
const ABOUT = [
  'The Department of Labour, Employment, Training & Skill Development oversees worker welfare, skill training, and employment generation.',
  'Jharkhand has 44 Government ITIs and 200+ private ITIs providing vocational training in 100+ trades.',
  'PMKVY (Pradhan Mantri Kaushal Vikas Yojana) provides short-term skill training with placement support.',
  'The department enforces labour laws including Minimum Wages Act, Factories Act, and Contract Labour Act.',
  'ESIC (Employees State Insurance Corporation) provides medical and cash benefits to organized sector workers.',
  'Employment exchanges in all districts register job seekers and facilitate placement in government and private sector.',
  'Jharkhand Skill Development Mission Society (JSDMS) coordinates skill training across all sectors.',
];
const MISSION = [
  'Skill 10 lakh youth annually through ITIs, PMKVY, and sector-specific skill development programmes.',
  'Achieve 100% compliance with minimum wage notifications across all industries and establishments.',
  'Establish model ITIs with industry-standard equipment and placement cells in all 24 districts.',
  'Implement e-Shram portal registration for all unorganized sector workers for social security coverage.',
  'Promote apprenticeship training in industries to bridge the gap between education and employment.',
  'Develop sector skill councils for mining, construction, healthcare, and IT sectors specific to Jharkhand.',
  'Ensure timely payment of wages and resolution of industrial disputes through labour courts and conciliation.',
];
export default function LabourEmploymentPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1e3a5f,#0f766e)', color: '#ccfbf1', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF LABOUR, EMPLOYMENT, TRAINING & SKILL DEVELOPMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #0f766e', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #0f766e', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#0f766e', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1e3a5f', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of Labour, Employment, Training & Skill Development</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #0f766e', color: '#0f766e', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#0f766e', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1e3a5f,#0f766e)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#99f6e4', letterSpacing: '0.12em', marginBottom: 6 }}>PMKVY — ITI — JSDMS — E-SHRAM</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Labour, Employment, Training & Skill Development</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#ccfbf1', maxWidth: 680 }}>Skilling 10 lakh youth annually through 44 ITIs, PMKVY, and JSDMS while enforcing labour laws and providing ESIC social security to workers.</p>
          </div>
          <span style={{ fontSize: 64 }}>👷</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #99f6e4', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#0f766e', textAlign: 'center', borderTop: '1px solid #f0fdfa' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #99f6e4', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ccfbf1', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#0f766e', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #99f6e4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ccfbf1', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#0f766e', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80', caption: 'Universities & Engineering Colleges' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', caption: 'Research Labs & Innovation Centres' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80', caption: 'NEP 2020 Multidisciplinary Education' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80', caption: 'Startup Incubation & Entrepreneurship' },
];
const ABOUT = [
  'The Department of Higher & Technical Education oversees universities, engineering colleges, polytechnics, and research institutions in Jharkhand.',
  'Jharkhand has 8 state universities, 30+ engineering colleges, 20+ polytechnics, and numerous degree colleges.',
  'BIT Mesra, NIT Jamshedpur, IIT (ISM) Dhanbad, and XLRI Jamshedpur are premier institutions in the state.',
  'The department implements NEP 2020 with focus on multidisciplinary education, research, and industry collaboration.',
  'Jharkhand Council of Higher Education (JCHE) coordinates academic standards and institutional accreditation.',
  'The Societal Innovation Portal connects HEIs with community challenges for demand-driven research and innovation.',
  'Scholarship schemes support SC, ST, OBC, and economically weaker students in higher and technical education.',
];
const MISSION = [
  'Implement NEP 2020 across all universities with multidisciplinary curricula, credit transfer, and academic flexibility.',
  'Establish innovation and incubation centres in all state universities to promote student entrepreneurship.',
  'Increase Gross Enrollment Ratio (GER) in higher education from current 18% to 30% by 2030.',
  'Strengthen research output by linking universities with industry, CSIR labs, and international institutions.',
  'Develop skill-integrated degree programmes aligned with industry needs and emerging technology sectors.',
  'Promote the Societal Innovation Portal for connecting HEI research capabilities with district-level challenges.',
  'Achieve NAAC A+ accreditation for all state universities and NBA accreditation for all engineering programmes.',
];
export default function HigherEducationPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#312e81,#4338ca)', color: '#e0e7ff', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF HIGHER & TECHNICAL EDUCATION
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #4338ca', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #4338ca', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#4338ca', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#312e81', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Higher & Technical Education</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #4338ca', color: '#4338ca', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#4338ca', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#312e81,#4338ca)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#a5b4fc', letterSpacing: '0.12em', marginBottom: 6 }}>NEP 2020 — JCHE — INNOVATION PORTAL</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Higher & Technical Education</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#e0e7ff', maxWidth: 680 }}>Empowering Jharkhand's universities and technical institutions with NEP 2020, research innovation, and the Societal Innovation Portal for community-driven solutions.</p>
          </div>
          <span style={{ fontSize: 64 }}>🎓</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #c7d2fe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#4338ca', textAlign: 'center', borderTop: '1px solid #eef2ff' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #c7d2fe', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0e7ff', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#4338ca', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #c7d2fe', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e0e7ff', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#4338ca', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

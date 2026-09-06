'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80', caption: 'Smart Classrooms & Digital Learning' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', caption: 'Mid-Day Meal Programme' },
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', caption: 'Government School Infrastructure' },
  { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80', caption: 'Girl Child Education & Kasturba Schools' },
];
const ABOUT = [
  'The Department of School Education & Literacy oversees over 42,000 government schools serving 60 lakh students across Jharkhand.',
  'Samagra Shiksha Abhiyan integrates pre-primary to senior secondary education for holistic school development.',
  'The state runs Kasturba Gandhi Balika Vidyalayas (KGBVs) for girls from marginalized communities in educationally backward blocks.',
  'Mid-Day Meal scheme provides nutritious hot-cooked meals to over 40 lakh students in government and aided schools.',
  'Jharkhand Education Project Council (JEPC) implements centrally sponsored schemes for school education.',
  'The department manages teacher recruitment, training, and deployment through Jharkhand Staff Selection Commission.',
  'Digital initiatives include smart classrooms, e-content development, and online teacher training programmes.',
];
const MISSION = [
  'Achieve universal elementary education with 100% enrollment, retention, and learning outcomes for all children aged 6-14.',
  'Eliminate gender and social gaps in education by strengthening residential schools for tribal and marginalized students.',
  'Improve learning outcomes through competency-based education, regular assessments, and remedial teaching.',
  'Upgrade all government schools with smart classrooms, libraries, science labs, and sports facilities.',
  'Recruit and train qualified teachers to fill all vacant positions and improve teacher-student ratios.',
  'Implement NEP 2020 with focus on foundational literacy, multilingual education, and vocational skills.',
  'Achieve 100% transition from elementary to secondary education and reduce dropout rates to below 5%.',
];
export default function SchoolEducationPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1e3a5f,#1d4ed8)', color: '#dbeafe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF SCHOOL EDUCATION & LITERACY
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #1d4ed8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #1d4ed8', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1e3a5f', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of School Education & Literacy</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #1d4ed8', color: '#1d4ed8', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#1d4ed8', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1e3a5f,#1d4ed8)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#93c5fd', letterSpacing: '0.12em', marginBottom: 6 }}>SAMAGRA SHIKSHA — NEP 2020 — JEPC</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of School Education & Literacy</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dbeafe', maxWidth: 680 }}>Transforming 42,000+ government schools with smart classrooms, mid-day meals, and NEP 2020 implementation for 60 lakh students across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>📚</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bfdbfe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#1d4ed8', textAlign: 'center', borderTop: '1px solid #eff6ff' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#1d4ed8', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#1d4ed8', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

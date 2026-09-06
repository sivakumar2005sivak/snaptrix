'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', caption: 'Ayushman Bharat — PMJAY Health Coverage' },
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', caption: 'Primary Health Centres & Rural Clinics' },
  { src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80', caption: 'Immunization & Mother-Child Health' },
  { src: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80', caption: 'Telemedicine & Digital Health Services' },
];
const ABOUT = [
  'The Department of Health, Medical Education & Family Welfare manages public health infrastructure across Jharkhand.',
  'The state has over 330 PHCs, 72 CHCs, 24 district hospitals, and 5 medical colleges providing healthcare services.',
  'Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PMJAY) provides health coverage of ₹5 lakh per family per year.',
  'Jharkhand State Health Mission coordinates National Health Mission (NHM) programmes including RMNCH+A.',
  'ASHA workers and ANMs form the backbone of community health services in rural and tribal areas.',
  'The department runs Janani Suraksha Yojana (JSY) and Janani Shishu Suraksha Karyakram (JSSK) for maternal health.',
  'Medical colleges in Ranchi, Dhanbad, Jamshedpur, Hazaribagh, and Dumka train doctors and paramedical staff.',
];
const MISSION = [
  'Achieve Universal Health Coverage by strengthening primary, secondary, and tertiary healthcare infrastructure.',
  'Reduce Infant Mortality Rate (IMR) and Maternal Mortality Rate (MMR) to national average levels by 2026.',
  'Expand Ayushman Bharat coverage to all eligible families and ensure cashless treatment at empanelled hospitals.',
  'Deploy telemedicine kiosks in all PHCs for specialist consultations in remote tribal areas.',
  'Strengthen disease surveillance and outbreak response systems for communicable and non-communicable diseases.',
  'Increase institutional deliveries to 95% and ensure full immunization coverage for all children under 2 years.',
  'Establish AIIMS-level medical infrastructure in Deoghar and upgrade existing medical colleges with modern equipment.',
];
export default function HealthPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#7f1d1d,#b91c1c)', color: '#fee2e2', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF HEALTH, MEDICAL EDUCATION & FAMILY WELFARE
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #b91c1c', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #b91c1c', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#b91c1c', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#7f1d1d', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Health & Medical Education</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #b91c1c', color: '#b91c1c', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#b91c1c', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#7f1d1d,#b91c1c)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fca5a5', letterSpacing: '0.12em', marginBottom: 6 }}>NHM — AYUSHMAN BHARAT — JSSK</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Health, Medical Education & Family Welfare</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#fee2e2', maxWidth: 680 }}>Delivering universal healthcare through 330+ PHCs, Ayushman Bharat coverage, telemedicine, and maternal-child health programmes across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🏥</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #fecaca', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#b91c1c', textAlign: 'center', borderTop: '1px solid #fff1f2' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fecaca', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fee2e2', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#b91c1c', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fecaca', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fee2e2', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#b91c1c', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

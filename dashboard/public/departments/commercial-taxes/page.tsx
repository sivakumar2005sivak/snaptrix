'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', caption: 'GST Administration & Tax Collection' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', caption: 'e-Filing & Digital Tax Compliance' },
  { src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80', caption: 'Commercial Tax Enforcement & Audit' },
  { src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', caption: 'Taxpayer Services & Facilitation' },
];
const ABOUT = [
  'The Commercial Taxes Department administers GST, VAT, and other state taxes contributing to Jharkhand\'s revenue.',
  'Jharkhand collects over ₹12,000 crore annually through GST, VAT, and other commercial taxes.',
  'The department operates through 24 district commercial tax offices and 8 check posts for tax enforcement.',
  'GST implementation has simplified the tax structure with online registration, filing, and payment facilities.',
  'E-way bill system monitors movement of goods and prevents tax evasion in inter-state and intra-state trade.',
  'Taxpayer facilitation centres provide guidance on GST compliance, return filing, and refund processing.',
  'The department conducts regular audits and surveys to identify tax evasion and ensure compliance.',
];
const MISSION = [
  'Achieve 15% annual growth in commercial tax revenue through improved compliance and enforcement.',
  'Provide seamless digital tax services including online registration, filing, payment, and refund processing.',
  'Reduce taxpayer compliance burden through simplified procedures and single-window facilitation.',
  'Implement AI-based risk profiling for targeted audit and enforcement against tax evaders.',
  'Achieve 100% e-filing of GST returns by all registered taxpayers in Jharkhand.',
  'Strengthen check post infrastructure with RFID and ANPR technology for goods movement monitoring.',
  'Conduct regular taxpayer education programmes on GST compliance and new tax provisions.',
];
export default function CommercialTaxesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#064e3b,#059669)', color: '#d1fae5', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; COMMERCIAL TAXES DEPARTMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #059669', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #059669', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#059669', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#064e3b', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Commercial Taxes Department</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #059669', color: '#059669', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#059669', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#064e3b,#059669)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#6ee7b7', letterSpacing: '0.12em', marginBottom: 6 }}>GST — VAT — E-WAY BILL — TAXPAYER SERVICES</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Commercial Taxes Department</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#d1fae5', maxWidth: 680 }}>Administering GST and state taxes, collecting ₹12,000+ crore annually, and providing digital tax compliance services to businesses across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🧾</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #6ee7b7', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#059669', textAlign: 'center', borderTop: '1px solid #ecfdf5' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #6ee7b7', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #d1fae5', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#059669', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #6ee7b7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #d1fae5', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#059669', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

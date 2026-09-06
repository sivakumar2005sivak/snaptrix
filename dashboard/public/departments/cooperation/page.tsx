'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80', caption: 'PACS — Primary Agricultural Credit Societies' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Dairy Co-operatives & Milk Collection' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'NABARD Linkage & Rural Credit' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', caption: 'Co-operative Societies Registration' },
];
const ABOUT = [
  'The Co-operation Department registers and regulates co-operative societies across agriculture, dairy, credit, and consumer sectors in Jharkhand.',
  'Jharkhand has over 8,000 registered co-operative societies including PACS, dairy co-ops, and credit societies.',
  'Primary Agricultural Credit Societies (PACS) provide short-term crop loans and agricultural inputs to farmers.',
  'Jharkhand State Co-operative Milk Producers Federation promotes dairy co-operatives and milk marketing.',
  'NABARD provides refinance and development support to co-operative banks and rural credit institutions.',
  'The department conducts audit of co-operative societies and takes action against mismanagement.',
  'Consumer co-operatives provide essential commodities at fair prices to members in urban and rural areas.',
];
const MISSION = [
  'Revitalize all dormant PACS and ensure they provide timely crop loans to farmers at subsidized rates.',
  'Expand dairy co-operative network to all blocks for milk collection, processing, and marketing.',
  'Achieve 100% computerization of all co-operative societies for transparent financial management.',
  'Link all PACS with NABARD for refinance and capacity building support.',
  'Promote women-led co-operative societies for self-help, savings, and livelihood activities.',
  'Strengthen co-operative audit system to prevent financial irregularities and protect member interests.',
  'Develop co-operative training centres for capacity building of society members and staff.',
];
export default function CooperationPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#14532d,#16a34a)', color: '#dcfce7', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF CO-OPERATION</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #16a34a', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #16a34a', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#16a34a', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#14532d', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Co-operation</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #16a34a', color: '#16a34a', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#16a34a', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#14532d,#16a34a)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#86efac', letterSpacing: '0.12em', marginBottom: 6 }}>PACS — DAIRY CO-OPS — NABARD — CREDIT SOCIETIES</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Co-operation</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dcfce7', maxWidth: 680 }}>Registering and strengthening 8,000+ co-operative societies including PACS, dairy co-ops, and credit societies with NABARD linkage across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🤲</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bbf7d0', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#16a34a', textAlign: 'center', borderTop: '1px solid #f0fdf4' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bbf7d0', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dcfce7', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#16a34a', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bbf7d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dcfce7', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#16a34a', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Excise Policy & Liquor Regulation' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'Prohibition Enforcement Operations' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', caption: 'Excise Revenue & Duty Collection' },
  { src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80', caption: 'Liquor Licence & Permit Management' },
];
const ABOUT = [
  'The Excise & Prohibition Department regulates liquor policy, excise duty collection, and prohibition enforcement in Jharkhand.',
  'The department collects over ₹2,500 crore annually through excise duty on liquor and related products.',
  'Jharkhand Excise Act governs manufacture, sale, possession, and consumption of alcoholic beverages.',
  'The department issues licences for country liquor shops, beer bars, restaurants, and wholesale dealers.',
  'Prohibition enforcement teams conduct raids against illicit liquor manufacturing and sale operations.',
  'Excise intelligence units monitor smuggling of liquor from neighbouring states and illegal distilleries.',
  'The department implements social welfare measures including de-addiction programmes in tribal areas.',
];
const MISSION = [
  'Achieve 20% annual growth in excise revenue through policy reforms and improved enforcement.',
  'Eliminate illicit liquor trade through technology-driven surveillance and strict enforcement.',
  'Implement track-and-trace system for all liquor products from distillery to retail point.',
  'Promote de-addiction and rehabilitation programmes in tribal and rural communities.',
  'Digitize all excise licences, permits, and compliance processes for transparency.',
  'Strengthen border surveillance to prevent smuggling of liquor from neighbouring states.',
  'Conduct regular awareness campaigns on ill-effects of alcohol abuse in schools and communities.',
];
export default function ExcisePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#4a044e,#a21caf)', color: '#fae8ff', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; EXCISE & PROHIBITION DEPARTMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #a21caf', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #a21caf', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#a21caf', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#4a044e', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Excise & Prohibition Department</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #a21caf', color: '#a21caf', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#a21caf', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#4a044e,#a21caf)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#f0abfc', letterSpacing: '0.12em', marginBottom: 6 }}>EXCISE ACT — PROHIBITION — LIQUOR POLICY — DE-ADDICTION</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Excise & Prohibition Department</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#fae8ff', maxWidth: 680 }}>Regulating liquor policy, collecting ₹2,500+ crore excise revenue, enforcing prohibition, and promoting de-addiction programmes across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>🏷️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #f0abfc', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#a21caf', textAlign: 'center', borderTop: '1px solid #fdf4ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #f0abfc', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fae8ff', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#a21caf', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #f0abfc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fae8ff', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#a21caf', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

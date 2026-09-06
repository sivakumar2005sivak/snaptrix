'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', caption: 'Women Self-Help Groups & Empowerment' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80', caption: 'Anganwadi & ICDS Child Nutrition' },
  { src: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&q=80', caption: 'Sukanya Samridhi & Girl Child Schemes' },
  { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80', caption: 'Social Security Pension Schemes' },
];
const ABOUT = [
  'The Department of Women, Child Development & Social Security implements welfare schemes for women, children, and vulnerable populations.',
  'Integrated Child Development Services (ICDS) operates 38,000+ Anganwadi centres providing nutrition, health, and pre-school education.',
  'Poshan Abhiyan (National Nutrition Mission) targets reduction of stunting, wasting, and anaemia among children and women.',
  'Mukhyamantri Sukanya Yojana provides financial support to girl children from BPL families for education and marriage.',
  'Social security pensions under NSAP cover old age, widows, and persons with disabilities across all 24 districts.',
  'One Stop Centres (Sakhi) provide integrated support services to women affected by violence.',
  'Jharkhand State Child Protection Society implements child protection schemes including CHILDLINE and foster care.',
];
const MISSION = [
  'Achieve zero malnutrition among children under 5 years through Poshan Abhiyan and ICDS convergence.',
  'Ensure 100% registration of births, deaths, and marriages for all communities across Jharkhand.',
  'Strengthen One Stop Centres in all districts for comprehensive support to women facing violence.',
  'Expand social security pension coverage to all eligible beneficiaries with direct benefit transfer.',
  'Promote women entrepreneurship through SHG linkage, skill training, and market access programmes.',
  'Implement child protection systems including CHILDLINE, CWC, and JJB in all districts.',
  'Achieve gender parity in education, health, and economic participation through targeted interventions.',
];
export default function WomenChildPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#831843,#be185d)', color: '#fce7f3', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF WOMEN, CHILD DEVELOPMENT & SOCIAL SECURITY
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #be185d', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #be185d', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#be185d', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#831843', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of Women, Child Development & Social Security</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #be185d', color: '#be185d', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#be185d', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#831843,#be185d)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fbcfe8', letterSpacing: '0.12em', marginBottom: 6 }}>ICDS — POSHAN ABHIYAN — NSAP</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Women, Child Development & Social Security</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#fce7f3', maxWidth: 680 }}>Empowering women and children through 38,000+ Anganwadi centres, Poshan Abhiyan, Sukanya Yojana, and social security pensions across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>👩‍👧</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #fbcfe8', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#be185d', textAlign: 'center', borderTop: '1px solid #fdf2f8' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fbcfe8', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fce7f3', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#be185d', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fbcfe8', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #fce7f3', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#be185d', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

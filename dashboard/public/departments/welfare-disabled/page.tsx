'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', caption: 'NSAP Pensions for Senior Citizens' },
  { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', caption: 'Disability Certificates & Assistive Devices' },
  { src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80', caption: 'Old Age Homes & Care Centres' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', caption: 'Skill Training for Persons with Disabilities' },
];
const ABOUT = [
  'The Department of Social Welfare (Disabled & Senior Citizens) implements welfare schemes for persons with disabilities and elderly citizens.',
  'National Social Assistance Programme (NSAP) provides monthly pensions to old age, widow, and disabled beneficiaries.',
  'Jharkhand has over 8 lakh registered persons with disabilities receiving various welfare benefits and concessions.',
  'Unique Disability ID (UDID) cards are issued to all persons with disabilities for accessing government benefits.',
  'Assistive devices including wheelchairs, hearing aids, and white canes are distributed through ADIP scheme.',
  'Old age homes in Ranchi, Dhanbad, and Jamshedpur provide residential care for destitute senior citizens.',
  'The department implements Rights of Persons with Disabilities Act 2016 for inclusive development.',
];
const MISSION = [
  'Ensure 100% coverage of eligible beneficiaries under NSAP pension schemes with DBT payment.',
  'Issue UDID cards to all registered persons with disabilities for seamless access to welfare benefits.',
  'Establish district-level rehabilitation centres with physiotherapy, speech therapy, and vocational training.',
  'Provide assistive devices to all eligible persons with disabilities through ADIP and state schemes.',
  'Develop barrier-free infrastructure in all government buildings and public spaces for accessibility.',
  'Implement inclusive education support for children with disabilities in all government schools.',
  'Strengthen old age homes with quality care, medical facilities, and recreational activities.',
];
export default function WelfareDisabledPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1e3a5f,#2563eb)', color: '#dbeafe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; SOCIAL WELFARE (DISABLED & SENIOR CITIZENS)</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #2563eb', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #2563eb', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#2563eb', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1e3a5f', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Social Welfare — Disabled & Senior Citizens</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #2563eb', color: '#2563eb', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1e3a5f,#2563eb)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#93c5fd', letterSpacing: '0.12em', marginBottom: 6 }}>NSAP — UDID — ADIP — RPWD ACT 2016</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Social Welfare — Disabled & Senior Citizens</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dbeafe', maxWidth: 680 }}>Empowering 8 lakh+ persons with disabilities and senior citizens through NSAP pensions, UDID cards, assistive devices, and inclusive welfare programmes across Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>♿</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bfdbfe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#2563eb', textAlign: 'center', borderTop: '1px solid #eff6ff' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#2563eb', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#2563eb', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', caption: 'Legal Affairs & Government Litigation' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', caption: 'Law Commission & Legislative Drafting' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', caption: 'Legal Aid Services for Citizens' },
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', caption: 'Jharkhand High Court & Judiciary Support' },
];
const ABOUT = [
  'The Law Department manages government litigation, legal advice, legislative drafting, and legal aid services in Jharkhand.',
  'The department represents the state government in the Jharkhand High Court and Supreme Court of India.',
  'Jharkhand State Legal Services Authority (JHALSA) provides free legal aid to marginalized and economically weaker sections.',
  'The department drafts state legislation, rules, and regulations in coordination with all government departments.',
  'Lok Adalats are organized regularly for out-of-court settlement of pending cases and disputes.',
  'The department maintains a panel of senior advocates and law officers for government legal representation.',
  'Legal literacy camps are conducted in rural areas to educate citizens about their rights and legal remedies.',
];
const MISSION = [
  'Reduce government litigation by promoting alternative dispute resolution and pre-litigation settlement mechanisms.',
  'Provide free legal aid to all eligible citizens through JHALSA and district legal services authorities.',
  'Modernize law department with e-filing, digital case management, and online legal opinion systems.',
  'Organize monthly Lok Adalats in all districts to clear backlog of motor accident and labour cases.',
  'Strengthen legislative drafting capacity for timely enactment of progressive state laws.',
  'Establish legal aid clinics in all law colleges for student-led community legal services.',
  'Achieve zero pendency in government legal opinions through dedicated legal advisory teams.',
];
export default function LawPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1c1917,#44403c)', color: '#e7e5e4', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; LAW DEPARTMENT</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #44403c', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #44403c', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#44403c', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1c1917', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Law Department</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #44403c', color: '#44403c', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#44403c', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1c1917,#44403c)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#d6d3d1', letterSpacing: '0.12em', marginBottom: 6 }}>JHALSA — LOK ADALAT — LEGAL AID — LEGISLATIVE DRAFTING</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Law Department</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#e7e5e4', maxWidth: 680 }}>Managing government litigation, providing free legal aid through JHALSA, drafting state legislation, and organizing Lok Adalats for accessible justice in Jharkhand.</p>
          </div>
          <span style={{ fontSize: 64 }}>⚖️</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #d6d3d1', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#44403c', textAlign: 'center', borderTop: '1px solid #fafaf9' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #d6d3d1', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e7e5e4', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#44403c', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #d6d3d1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #e7e5e4', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#44403c', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

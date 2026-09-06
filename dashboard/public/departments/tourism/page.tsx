'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', caption: 'Betla National Park & Wildlife Tourism' },
  { src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80', caption: 'Sohrai & Khovar Tribal Art Heritage' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', caption: 'Sports Academies & Youth Development' },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', caption: 'Cultural Festivals & Tribal Heritage' },
];
const ABOUT = [
  'The Department of Tourism, Art, Culture, Sports & Youth Affairs promotes Jharkhand\'s rich heritage and natural beauty.',
  'Jharkhand has significant tourism potential with Betla National Park, Hundru Falls, Dassam Falls, and Parasnath Hills.',
  'Baba Baidyanath Jyotirlinga in Deoghar is one of the 12 Jyotirlingas attracting millions of pilgrims annually.',
  'Sohrai and Khovar mural paintings of Hazaribagh have received GI tag recognition for their unique tribal art form.',\n  'The department promotes tribal cultural festivals including Sarhul, Karma, and Tusu to preserve indigenous heritage.',
  'Jharkhand Sports Authority manages sports academies in Ranchi for athletics, archery, football, and hockey.',
  'Youth welfare programmes include Nehru Yuva Kendra activities, adventure sports, and leadership development camps.',
];
const MISSION = [
  'Develop Jharkhand as a premier eco-tourism and tribal heritage tourism destination in eastern India.',
  'Create tourism circuits connecting Deoghar, Betla, Parasnath, Hundru, and Netarhat for package tourism.',
  'Promote Sohrai-Khovar art and tribal handicrafts through national and international exhibitions and e-commerce.',
  'Establish sports academies in all 24 districts with focus on archery, football, hockey, and athletics.',
  'Develop youth entrepreneurship through skill training, startup support, and adventure tourism opportunities.',
  'Preserve and document tribal languages, folk music, dance forms, and oral traditions of Jharkhand.',
  'Achieve 50 lakh tourist arrivals annually through targeted marketing and improved tourism infrastructure.',
];
export default function TourismPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#7c2d12,#ea580c)', color: '#ffedd5', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF TOURISM, ART, CULTURE, SPORTS & YOUTH AFFAIRS</div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #ea580c', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #ea580c', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#ea580c', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#7c2d12', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Dept. of Tourism, Art, Culture, Sports & Youth</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #ea580c', color: '#ea580c', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#ea580c', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#7c2d12,#ea580c)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#fed7aa', letterSpacing: '0.12em', marginBottom: 6 }}>ECO-TOURISM — TRIBAL HERITAGE — SPORTS ACADEMIES — YOUTH</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Tourism, Art, Culture, Sports & Youth Affairs</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#ffedd5', maxWidth: 680 }}>Showcasing Jharkhand's Betla wildlife, Deoghar pilgrimage, GI-tagged Sohrai art, tribal festivals, and sports academies to the world.</p>
          </div>
          <span style={{ fontSize: 64 }}>🎭</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (<div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #fed7aa', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#ea580c', textAlign: 'center', borderTop: '1px solid #fff7ed' }}>{img.caption}</div></div>))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fed7aa', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ffedd5', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>📖</span><h3 style={{ margin: 0, fontSize: 20, color: '#ea580c', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{ABOUT.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #fed7aa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #ffedd5', paddingBottom: 10 }}><span style={{ fontSize: 22 }}>🎯</span><h3 style={{ margin: 0, fontSize: 20, color: '#ea580c', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3></div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>{MISSION.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
const LOGO_SRC = '/image_19fa0a.jpg';
const IMGS = [
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', caption: 'Dam & Reservoir Management' },
  { src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80', caption: 'Canal Irrigation Network' },
  { src: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80', caption: 'Flood Control & Embankments' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', caption: 'Watershed Development Programme' },
];
const ABOUT = [
  'The Department of Water Resources manages irrigation infrastructure, dams, canals, and flood control systems across Jharkhand.',
  'Jharkhand has significant water resources with major rivers including Damodar, Subarnarekha, Koel, Sankh, and North Koel.',
  'The state has over 226 medium and major irrigation projects providing irrigation to agricultural lands.',
  'Groundwater management is critical as the state faces declining water tables in several districts.',
  'The department oversees construction and maintenance of embankments, barrages, and check dams for flood mitigation.',
  'Watershed development programmes restore degraded lands and improve water retention in rain-fed areas.',
  'The Jharkhand State Water Policy guides sustainable water resource planning and allocation across sectors.',
];
const MISSION = [
  'Expand irrigation coverage from current 12% to 30% of net sown area through new projects and canal rehabilitation.',
  'Complete all ongoing major and medium irrigation projects to unlock their full irrigation potential.',
  'Implement micro-irrigation (drip and sprinkler) systems to improve water use efficiency in agriculture.',
  'Develop groundwater recharge structures to arrest declining water tables in over-exploited blocks.',
  'Strengthen flood forecasting and early warning systems for disaster preparedness in flood-prone districts.',
  'Promote participatory irrigation management by involving Water User Associations in canal maintenance.',
  'Integrate remote sensing and GIS technology for real-time monitoring of water bodies and irrigation systems.',
];
export default function WaterResourcesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif', color: '#1f2937' }}>
      <div style={{ background: 'linear-gradient(90deg,#1e3a5f,#1e40af)', color: '#dbeafe', padding: '8px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF WATER RESOURCES
      </div>
      <header style={{ backgroundColor: '#fff', borderBottom: '3px solid #1e40af', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #1e40af', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#1e40af', letterSpacing: '0.1em' }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 20, color: '#1e3a5f', fontWeight: 900, fontFamily: 'Georgia,serif' }}>Department of Water Resources</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public/departments" style={{ padding: '8px 16px', border: '1.5px solid #1e40af', color: '#1e40af', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13, backgroundColor: '#fff' }}>← All Departments</Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '8px 16px', backgroundColor: '#1e40af', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Lodge Grievance</Link>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1160, margin: '28px auto', padding: '0 5% 60px' }}>
        <div style={{ background: 'linear-gradient(115deg,#1e3a5f,#1e40af)', color: '#fff', borderRadius: 12, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#93c5fd', letterSpacing: '0.12em', marginBottom: 6 }}>OFFICIAL STATE MANDATE</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontFamily: 'Georgia,serif' }}>Department of Water Resources</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#dbeafe', maxWidth: 680 }}>Managing dams, canals, flood control, and watershed development across Jharkhand's major river basins for sustainable irrigation and water security.</p>
          </div>
          <span style={{ fontSize: 64 }}>💧</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginBottom: 32 }}>
          {IMGS.map((img, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #bfdbfe', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={img.src} alt={img.caption} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: '#1e40af', textAlign: 'center', borderTop: '1px solid #eff6ff' }}>{img.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#1e40af', fontFamily: 'Georgia,serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {ABOUT.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, border: '1px solid #bfdbfe', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '2px solid #dbeafe', paddingBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 20, color: '#1e40af', fontFamily: 'Georgia,serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, lineHeight: 1.7, color: '#334155' }}>
            {MISSION.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

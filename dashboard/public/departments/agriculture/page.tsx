'use client';

import React from 'react';
import Link from 'next/link';

const LOGO_SRC = '/image_19fa0a.jpg';

// Department Images
const IMAGES = {
  smartFarming: '/agri_smart_farming.jpg',
  tractor: '/agri_tractor.jpg',
  pmsky: '/agri_pmsky.jpg',
  paddyPlanting: '/agri_paddy_planting.jpg'
};

export default function AgricultureDepartmentPage() {
  const aboutPoints = [
    'Jharkhand was formed in November 2000 from Bihar, covering a predominantly hilly and plateau region.',
    'Around 80% of the rural population depends on agriculture and allied activities for livelihood.',
    'Agriculture is largely dependent on rainfall, with about 92% of cultivated land being unirrigated.',
    'The sector faces low investment, low productivity, small landholdings, and heavy dependence on paddy.',
    'Despite good rainfall, inadequate water-storage facilities limit surface-water availability for agriculture.',
    'Groundwater levels are also declining due to insufficient natural and artificial recharge.',
    'Soil erosion and poor biomass recycling are contributing to declining soil fertility.',
    'Better soil, water, and land management is essential to improve agricultural productivity.',
    'Jharkhand has strong potential for horticulture, forest products, livestock, and food processing.',
    'Improved agricultural marketing and institutional support are needed to provide farmers better prices and encourage scientific farming.'
  ];

  const missionPoints = [
    'The mission is to achieve sustainable agricultural and rural development across Jharkhand.',
    'Capacity building and timely availability of affordable agricultural inputs are key priorities.',
    'The state aims to expand cultivated areas through both vertical and horizontal agricultural growth.',
    'Increasing irrigation coverage is essential for reducing dependence on rainfall.',
    'Productivity of food crops should be improved through optimum use of quality seeds, fertilizers, pesticides, and farm equipment.',
    'Horticulture can be expanded to produce fruits, vegetables, flowers, medicinal plants, and aromatic plants.',
    'Livestock development can increase milk, meat, and egg production and strengthen rural incomes.',
    'Food-processing industries can add value to agricultural, dairy, meat, and horticultural products.',
    'Processing of minor forest produce can create additional employment and income opportunities.',
    'Overall, the mission focuses on technology, infrastructure, capacity building, market access, and sustainable agricultural growth.'
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1f2937', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: '#3b2a1a', color: '#fff8dd', padding: '8px 5%', textAlign: 'center', fontSize: 13, fontWeight: 700 }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF AGRICULTURE, ANIMAL HUSBANDRY & CO-OPERATIVE
      </div>

      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #d1d5db', padding: '14px 5%' }}>
        <div style={{ maxWidth: 1160, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={LOGO_SRC}
              alt="Jharkhand Emblem"
              style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: '50%' }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
              }}
            />
            <div>
              <small style={{ color: '#165d36', fontWeight: 800, fontSize: 11 }}>GOVERNMENT OF JHARKHAND</small>
              <h1 style={{ margin: 0, fontSize: 20, color: '#165d36', fontWeight: 700 }}>Department of Agriculture</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/dashboard/public/departments"
              style={{ padding: '8px 16px', backgroundColor: '#ffffff', color: '#165d36', border: '1px solid #165d36', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}
            >
              ← All Departments
            </Link>
            <Link
              href="/dashboard/public/complaints"
              style={{ padding: '8px 16px', backgroundColor: '#165d36', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}
            >
              Lodge Grievance
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1160, margin: '30px auto', padding: '0 16px 60px' }}>
        {/* Banner Section */}
        <div
          style={{
            backgroundColor: '#165d36',
            color: '#fff',
            borderRadius: 12,
            padding: '28px 32px',
            marginBottom: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 4px 20px rgba(22, 93, 54, 0.2)'
          }}
        >
          <div>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', color: '#a7f3d0' }}>OFFICIAL STATE MANDATE</span>
            <h2 style={{ margin: '6px 0', fontSize: 28, fontFamily: 'Georgia, serif' }}>
              Department of Agriculture, Animal Husbandry & Co-operative
            </h2>
            <p style={{ margin: 0, opacity: 0.95, fontSize: 15, maxWidth: 720 }}>
              Empowering Jharkhand farmers through precision agriculture, smart irrigation expansion (PMSKY), mechanization, and sustainable livelihood support.
            </p>
          </div>
          <span style={{ fontSize: 60 }}>🌾</span>
        </div>

        {/* 4 Photos Image Showcase (Using Object keys without TypeScript error) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginBottom: 32 }}>
          {/* Photo 1: Smart Farming */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img
                src={IMAGES.smartFarming}
                alt="Smart Agro-Technology & Traceability"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
              Smart Agro-Technology & Traceability
            </div>
          </div>

          {/* Photo 2: Tractor */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img
                src={IMAGES.tractor}
                alt="Farm Mechanization & Soil Tillage"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
              Farm Mechanization & Soil Tillage
            </div>
          </div>

          {/* Photo 3: PMSKY */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img
                src={IMAGES.pmsky}
                alt="Micro-Irrigation & Water Management (PMSKY)"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
              Micro-Irrigation & Water Management (PMSKY)
            </div>
          </div>

          {/* Photo 4: Paddy Planting */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img
                src={IMAGES.paddyPlanting}
                alt="Rural Farming & Paddy Cultivation"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
              Rural Farming & Paddy Cultivation
            </div>
          </div>
        </div>

        {/* Section 1: ABOUT */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, borderBottom: '2px solid #eaf3eb', paddingBottom: 10 }}>
            <span style={{ fontSize: 24 }}>📖</span>
            <h3 style={{ margin: 0, fontSize: 22, color: '#165d36', fontFamily: 'Georgia, serif' }}>ABOUT THE DEPARTMENT</h3>
          </div>

          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.6, color: '#334155' }}>
            {aboutPoints.map((point, index) => (
              <li key={index}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: MISSION */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, borderBottom: '2px solid #eaf3eb', paddingBottom: 10 }}>
            <span style={{ fontSize: 24 }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: 22, color: '#165d36', fontFamily: 'Georgia, serif' }}>MISSION & STRATEGIC GOALS</h3>
          </div>

          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.6, color: '#334155' }}>
            {missionPoints.map((point, index) => (
              <li key={index}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
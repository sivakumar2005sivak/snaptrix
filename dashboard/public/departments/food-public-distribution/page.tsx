'use client';

import React from 'react';
import Link from 'next/link';

const LOGO_SRC = '/image_19fa0a.jpg';

const IMAGES = {
  midDayMeal: '/image_e547be.jpg',
  grainSupply: '/image_e547c3.jpg',
  foodCommission: '/image_e547ff.png',
  grainInitiatives: '/image_e54818.jpg'
};

export default function FoodDepartmentPage() {
  const policyPoints = [
    'The primary policy objective is to ensure food security for the state through timely and efficient procurement and distribution of foodgrains.',
    'It oversees the procurement of various foodgrains, building up and maintenance of food stocks, their scientific storage, movement, and timely delivery to distributing agencies.',
    'It actively monitors production figures, existing stock levels, and open market price trends of essential foodgrains.',
    'The department focuses on incentivizing farmers with fair value for their produce through the Minimum Support Price (MSP) mechanism.',
    'It guarantees systematic distribution of foodgrains to Below Poverty Line (BPL) families and economically weaker households across the state.'
  ];

  const nfsaMandatePoints = [
    'The State Food Commission possesses the statutory mandate to monitor, evaluate, and enforce the implementation of the National Food Security Act (NFSA).',
    'Targeted Public Distribution System (TPDS) operates under this purview to ensure fair-price ration distribution to entitled beneficiaries.',
    'Integrated Child Development Services (ICDS) provides nutritional support to infants, young children, and pregnant/lactating mothers.',
    'The Mid Day Meal (MDM) scheme supplies nutritious hot-cooked meals to school children across government and aided institutions.',
    'The department continuously strengthens consumer protection mechanisms and fair grievance redressal systems for public distribution.'
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1f2937', fontFamily: 'Inter, Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#3b2a1a', color: '#fff8dd', padding: '8px 5%', textAlign: 'center', fontSize: 13, fontWeight: 700 }}>
        GOVERNMENT OF JHARKHAND &bull; DEPARTMENT OF FOOD, PUBLIC DISTRIBUTION & CONSUMER AFFAIRS
      </div>

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
              <h1 style={{ margin: 0, fontSize: 20, color: '#165d36', fontWeight: 700 }}>Department of Food & Consumer Affairs</h1>
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

      <main style={{ maxWidth: 1160, margin: '30px auto', padding: '0 16px 60px' }}>
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
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', color: '#a7f3d0' }}>STATE FOOD SECURITY MISSION</span>
            <h2 style={{ margin: '6px 0', fontSize: 28, fontFamily: 'Georgia, serif' }}>
              Department of Food, Public Distribution & Consumer Affairs
            </h2>
            <p style={{ margin: 0, opacity: 0.95, fontSize: 15, maxWidth: 720 }}>
              Ensuring universal food security, fair Minimum Support Price (MSP) to farmers, and smooth operation of TPDS, Mid Day Meal, and child nutrition schemes.
            </p>
          </div>
          <span style={{ fontSize: 60 }}>🍚</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginBottom: 32 }}>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img src={IMAGES.midDayMeal} alt="Mid Day Meal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center' }}>
              Mid-Day Meal & ICDS Nutrition
            </div>
          </div>

          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img src={IMAGES.grainSupply} alt="Procurement" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center' }}>
              Paddy, Wheat & Rice Procurement (MSP)
            </div>
          </div>

          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img src={IMAGES.foodCommission} alt="Food Commission" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center' }}>
              State Food Commission (NFSA)
            </div>
          </div>

          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img src={IMAGES.grainInitiatives} alt="Initiatives" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#165d36', textAlign: 'center' }}>
              Grain & Pulses Productivity Initiatives
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, borderBottom: '2px solid #eaf3eb', paddingBottom: 10 }}>
            <span style={{ fontSize: 24 }}>🌾</span>
            <h3 style={{ margin: 0, fontSize: 22, color: '#165d36', fontFamily: 'Georgia, serif' }}>ABOUT & POLICY OBJECTIVES</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.6, color: '#334155' }}>
            {policyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, borderBottom: '2px solid #eaf3eb', paddingBottom: 10 }}>
            <span style={{ fontSize: 24 }}>📜</span>
            <h3 style={{ margin: 0, fontSize: 22, color: '#165d36', fontFamily: 'Georgia, serif' }}>NATIONAL FOOD SECURITY ACT (NFSA) SCHEMES</h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.6, color: '#334155' }}>
            {nfsaMandatePoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
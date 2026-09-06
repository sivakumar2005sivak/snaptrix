'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

// SSR இல்லாமல் district-map-ஐ dynamic-ஆக லோட் செய்கிறோம்
// @ts-ignore
const DistrictMapSection = dynamic(
  () => import('./district-map/page'),
  { 
    ssr: false, 
    loading: () => (
      <div style={{ height: '580px', display: 'grid', placeItems: 'center', backgroundColor: '#f1f5f9', borderRadius: '12px' }}>
        <p style={{ color: '#165d36', fontWeight: 700, fontSize: 16 }}>Loading AI Geospatial District Map...</p>
      </div>
    )
  }
);

const LOGO_SRC = '/image_19fa0a.jpg';
const JHARKHAND_BG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jharkhand_Vidhan_Sabha.jpg/1280px-Jharkhand_Vidhan_Sabha.jpg';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1280&q=80',
    tag: 'SACRED HERITAGE & PILGRIMAGE',
    title: 'Baba Baidyanath Jyotirlinga, Deoghar',
    desc: 'Ancient spiritual sanctum and landmark heritage hub of Santhal Pargana division.'
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80',
    tag: 'ECOLOGICAL BIODIVERSITY',
    title: 'Parasnath Hills & Forests, Giridih',
    desc: 'Highest mountain peak in Jharkhand (1365m), safeguarding unique forest ecology.'
  },
  {
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1280&q=80',
    tag: 'INDIGENOUS TRIBAL FOLK ART',
    title: 'Sohrai & Khovar Murals, Hazaribagh',
    desc: 'GI-tagged traditional mural paintings created with natural earth pigments.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1280&q=80',
    tag: 'SMART DIGITAL GOVERNANCE',
    title: 'Citizen Innovation & NEP 2020 Hub',
    desc: 'Empowering Jharkhand universities and research centers to solve district challenges.'
  }
];

const INNOVATION_AREAS = [
  {
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
    badge: 'AGRICULTURE & DRONES',
    title: 'AI Drone Soil & Crop Health Analytics',
    desc: 'Multispectral remote sensing for early pest detection and precision fertilizer delivery.'
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    badge: 'HEALTHCARE & TELEMEDICINE',
    title: 'Rural Smart Diagnostic Kiosks',
    desc: 'Connected health points providing real-time doctor teleconsultations in remote panchayats.'
  },
  {
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    badge: 'RENEWABLE ENERGY & WATER',
    title: 'Solar Micro-Grids & Automated Pumps',
    desc: 'IoT-monitored solar deep-wells ensuring round-the-clock drinking water and micro-irrigation.'
  },
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    badge: 'EDUCATION & NEP 2020',
    title: 'Interactive Smart Tribal Classrooms',
    desc: 'Multilingual digital curriculum and vocational coding labs across government schools.'
  }
];

export default function PublicDashboardPage() {
  const router = useRouter();

  const [fontSize, setFontSize] = useState<number>(16);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'feedback' | null>(null);

  // Feedback State
  const [fbName, setFbName] = useState<string>('');
  const [fbEmail, setFbEmail] = useState<string>('');
  const [fbRating, setFbRating] = useState<string>('Excellent');
  const [fbComments, setFbComments] = useState<string>('');
  const [fbSuggestion, setFbSuggestion] = useState<string>('');
  const [isSubmittingFb, setIsSubmittingFb] = useState<boolean>(false);
  const [fbNotice, setFbNotice] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser') || localStorage.getItem('portal_user');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          setCurrentUser(user);
          setFbName(user.name || user.full_name || '');
          setFbEmail(user.email || '');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
  }, [fontSize]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToProblemHub = () => {
    document.getElementById('problem-analytics-hub')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDistrictMap = () => {
    document.getElementById('district-map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => {
    setActiveModal(null);
    setFbNotice('');
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFb(true);
    setFbNotice('');

    try {
      const res = await axios.post('/api/feedback', {
        userId: currentUser?.id || null,
        name: fbName || currentUser?.name || 'Anonymous Citizen',
        email: fbEmail || currentUser?.email || 'citizen@jharkhand.gov.in',
        rating: fbRating,
        comments: fbComments,
        suggestion: fbSuggestion
      });

      if (res.data?.success) {
        setFbNotice('✅ Feedback recorded successfully!');
        setFbComments('');
        setFbSuggestion('');
        setTimeout(() => closeModal(), 1800);
      }
    } catch (err: any) {
      setFbNotice(err.response?.data?.error || '❌ Failed to store feedback.');
    } finally {
      setIsSubmittingFb(false);
    }
  };

  const displayName = currentUser?.name || currentUser?.full_name || 'Siva Kumar';
  const userInitial = displayName.trim().charAt(0).toUpperCase();

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.92), rgba(241, 245, 249, 0.95)), url(${JHARKHAND_BG})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#1f2937'
      }}
    >
      <style jsx global>{`
        :root {
          --green: #165d36;
          --leaf: #287847;
          --gold: #d79b2c;
          --ink: #1f2937;
          --paper: #ffffff;
          --line: #d1d5db;
          --font-size: 16px;
        }
        .app-container {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          font-size: var(--font-size);
        }
        .demo-bar {
          background: #3b2a1a;
          color: #fff8dd;
          padding: 8px 5%;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .05em;
        }
        .utility {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: center;
          padding: 8px 5%;
          color: #4b5563;
          background: #ffffff;
          font-size: 13px;
          border-bottom: 1px solid var(--line);
        }
        .right-profile-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #eaf3eb;
          color: var(--green);
          border: 1px solid #8fb49b;
          border-radius: 24px;
          padding: 4px 14px 4px 5px;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        .avatar-button:hover {
          background: #d4e8d8;
          border-color: #165d36;
          transform: translateY(-1px);
        }
        .avatar-badge {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--green);
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 900;
          font-size: 14px;
          box-shadow: 0 2px 5px rgba(22, 93, 54, 0.3);
        }
        .a11y {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .a11y button {
          width: 28px;
          height: 26px;
          padding: 0;
          border: 1px solid #c6d1c9;
          border-radius: 4px;
          color: var(--green);
          background: #ffffff;
          cursor: pointer;
          font-weight: 700;
        }
        header { 
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .brand-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          max-width: 1220px;
          margin: auto;
          padding: 16px 5%;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .brand-logo-container {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          overflow: hidden;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .brand img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 50%;
        }
        .brand small {
          display: block;
          margin-bottom: 3px;
          color: var(--leaf);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .12em;
        }
        .brand h1 {
          margin: 0;
          color: var(--green);
          font: 700 clamp(23px, 3vw, 34px) Georgia, serif;
          letter-spacing: .02em;
        }
        nav { 
          background: var(--green); 
        }
        .nav-inner {
          display: flex;
          align-items: center;
          gap: 4px;
          max-width: 1220px;
          margin: auto;
          padding: 0 5%;
          overflow-x: auto;
        }
        nav a, nav button {
          flex: none;
          padding: 14px 18px;
          border: 0;
          color: #ffffff;
          background: transparent;
          text-decoration: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
        }
        nav a:hover, nav button:hover {
          background: #0f4829;
        }
        .slideshow {
          position: relative;
          height: min(60vw, 440px);
          min-height: 280px;
          overflow: hidden;
          background: #173d28;
          border-bottom: 2px solid #cbd5cc;
        }
        .slides, .slide { height: 100%; }
        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .65s ease;
        }
        .slide.active { opacity: 1; }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(5,35,19,.75), rgba(5,35,19,.15) 65%, rgba(5,35,19,.45));
        }
        .slide-copy {
          position: absolute;
          z-index: 1;
          top: 50%;
          left: clamp(24px, 9vw, 150px);
          max-width: 570px;
          transform: translateY(-50%);
          color: #fff;
          text-shadow: 0 2px 10px rgba(0,0,0,.6);
        }
        .slide-copy p {
          margin: 0 0 10px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .13em;
          color: #86efac;
        }
        .slide-copy h2 {
          margin: 0;
          font: 700 clamp(30px, 5vw, 54px) Georgia, serif;
          line-height: 1.05;
        }
        .slide-copy span {
          display: block;
          margin-top: 14px;
          font-size: 16px;
          line-height: 1.5;
          color: #f0fdf4;
        }
        .slide-control {
          position: absolute;
          z-index: 2;
          top: 50%;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255,255,255,.6);
          border-radius: 50%;
          color: #fff;
          background: rgba(0,0,0,.35);
          cursor: pointer;
          font-size: 22px;
          transform: translateY(-50%);
        }
        .previous { left: 22px; }
        .next { right: 22px; }
        .dots {
          position: absolute;
          z-index: 2;
          bottom: 19px;
          left: 50%;
          display: flex;
          gap: 8px;
          transform: translateX(-50%);
        }
        .dot {
          width: 10px;
          height: 10px;
          border: 1px solid #fff;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
        }
        .dot.active { background: #fff; }
        main {
          max-width: 1220px;
          margin: auto;
          padding: 31px 5% 55px;
        }
        .hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 25px;
          padding: 28px 30px;
          border-radius: 12px;
          color: #fff;
          background: linear-gradient(115deg, rgba(14,70,39,.95), rgba(42,120,71,.88)),
            url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Parasnath_Hill.jpg/1280px-Parasnath_Hill.jpg') center/cover;
          box-shadow: 0 4px 20px rgba(22, 93, 54, 0.15);
          margin-bottom: 36px;
        }
        .analytics-hub-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 28px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          margin-bottom: 36px;
        }
        .map-wrapper-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          margin-bottom: 36px;
        }
        .floating-support-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 900;
          background: #165d36;
          color: #ffffff;
          border: 2px solid #fed766;
          border-radius: 50px;
          padding: 12px 22px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0,0,0,0.28);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        footer {
          padding: 32px 5%;
          color: #dce9df;
          background: #165d36;
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          max-width: 1220px;
          margin: auto;
        }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 34, 22, 0.7);
          display: grid;
          place-items: center;
          z-index: 999;
          padding: 16px;
          backdrop-filter: blur(5px);
        }
        .modal {
          width: min(94vw, 680px);
          border-radius: 14px;
          background: #ffffff;
          color: #1f2937;
          box-shadow: 0 25px 80px rgba(0,0,0,.35);
          padding: 26px;
          max-height: 92vh;
          overflow-y: auto;
        }
        .close {
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 50%;
          background: #edf2ee;
          color: #1f2937;
          cursor: pointer;
          font-size: 18px;
        }
      `}</style>

      {/* Top Banner */}
      <div className="demo-bar">GOVERNMENT OF JHARKHAND &bull; CITIZEN INNOVATION & GRIEVANCE PLATFORM</div>

      {/* Utility Bar with Profile Logo Link */}
      <div className="utility">
        <span>Public Dashboard & Analytics Hub</span>
        <div className="right-profile-container">
          <div className="a11y">
            Text size:
            <button onClick={() => setFontSize((s) => Math.max(14, s - 1))}>A−</button>
            <button onClick={() => setFontSize(16)}>A</button>
            <button onClick={() => setFontSize((s) => Math.min(20, s + 1))}>A+</button>
          </div>

          {/* Sivakumar Profile Logo Click to Profile Page */}
          <Link href="/dashboard/public/profile" className="avatar-button" title="View Full Citizen Profile" style={{ textDecoration: 'none' }}>
            <span className="avatar-badge">{userInitial}</span>
            <span>{displayName}</span>
          </Link>
        </div>
      </div>

      {/* Header */}
      <header>
        <div className="brand-row">
          <div className="brand">
            <div className="brand-logo-container">
              <img
                src={LOGO_SRC}
                alt="Government of Jharkhand emblem"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
                }}
              />
            </div>
            <div>
              <small>GOVERNMENT OF JHARKHAND</small>
              <h1>JANVAANI PORTAL</h1>
              <p>Department Directory — Public Problem Resolution Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav>
          <div className="nav-inner">
            <button
              onClick={scrollToProblemHub}
              style={{
                backgroundColor: '#239a3f',
                color: '#ffffff',
                borderRadius: 4,
                padding: '8px 16px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>Analytics Hub</span>
            </button>

            <Link href="/dashboard/public/departments" style={{ backgroundColor: '#127840' }}>
              🏛️ Departments Directory
            </Link>

            <Link href="/dashboard/public/complaints">
              Register Complaint
            </Link>
            
            <button onClick={scrollToDistrictMap}>
              🗺️ Districts Map
            </button>

            <button onClick={() => setActiveModal('feedback')}>Feedback</button>
          </div>
        </nav>
      </header>

      {/* Slideshow */}
      <section id="home" className="slideshow">
        <div className="slides">
          {SLIDES.map((slide, idx) => (
            <article key={idx} className={`slide ${idx === currentSlide ? 'active' : ''}`}>
              <img src={slide.image} alt={slide.title} />
              <div className="slide-copy">
                <p>{slide.tag}</p>
                <h2>{slide.title}</h2>
                <span>{slide.desc}</span>
              </div>
            </article>
          ))}
        </div>
        <button className="slide-control previous" onClick={() => setCurrentSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length)}>‹</button>
        <button className="slide-control next" onClick={() => setCurrentSlide((currentSlide + 1) % SLIDES.length)}>›</button>
        <div className="dots">
          {SLIDES.map((_, idx) => (
            <button key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)} />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main id="content">


        {/* Analytics Hub */}
        <section id="problem-analytics-hub" className="analytics-hub-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eaf3eb', paddingBottom: 14, marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h3 style={{ margin: 0, color: '#165d36', fontSize: 24, fontFamily: 'Georgia, serif' }}>
                📈 State Problem-Solving Analytics & Innovation Index
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
                Visual metrics of public problems submitted, assigned to universities, and deployed across Jharkhand.
              </p>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, backgroundColor: '#eaf3eb', color: '#165d36', padding: '6px 14px', borderRadius: 20 }}>
              Live System Status: Active
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, backgroundColor: '#fcfdfd' }}>
              <h4 style={{ margin: '0 0 16px', color: '#165d36', fontSize: 16 }}>📊 Domain Distribution of Reported Issues</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    <span>🌾 Agriculture & Micro-Irrigation (38%)</span>
                    <span>38%</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{ width: '38%', height: '100%', backgroundColor: '#165d36' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    <span>🍚 Food Security & PDS Supply (24%)</span>
                    <span>24%</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{ width: '24%', height: '100%', backgroundColor: '#d79b2c' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    <span>💧 Rural Drinking Water & Sanitation (20%)</span>
                    <span>20%</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{ width: '20%', height: '100%', backgroundColor: '#2563eb' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    <span>⚡ Renewable Energy & Infrastructure (18%)</span>
                    <span>18%</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{ width: '18%', height: '100%', backgroundColor: '#9333ea' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, backgroundColor: '#fcfdfd' }}>
              <h4 style={{ margin: '0 0 16px', color: '#165d36', fontSize: 16 }}>🎯 NEP 2020 University Co-Creation Pipeline</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: 14, backgroundColor: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#165d36' }}>148</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#165d36' }}>Problems Triaged</div>
                </div>
                <div style={{ padding: 14, backgroundColor: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#1e40af' }}>92</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1e40af' }}>Assigned to HEIs</div>
                </div>
                <div style={{ padding: 14, backgroundColor: '#fefce8', borderRadius: 8, border: '1px solid #fef08a', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#854d0e' }}>45</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#854d0e' }}>Industry Funded</div>
                </div>
                <div style={{ padding: 14, backgroundColor: '#faf5ff', borderRadius: 8, border: '1px solid #e9d5ff', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#6b21a8' }}>31</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#6b21a8' }}>Field Deployed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🗺️ EMBEDDED DISTRICT MAP SECTION */}
        <section id="district-map-section" className="map-wrapper-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={24} color="#165d36" />
                <h3 style={{ margin: 0, color: '#165d36', fontSize: 22, fontWeight: 800, fontFamily: 'Georgia, serif' }}>
                  Live District Grievance & AI Hotspot Map
                </h3>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
                Real-time geospatial analytics powered by DBSCAN clustering algorithm across all 24 districts.
              </p>
            </div>
            <span style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, backgroundColor: '#dcfce7', color: '#166534', fontWeight: 800 }}>
              ● Live Geospatial Engine Active
            </span>
          </div>

          <div style={{ width: '100%', minHeight: '560px', borderRadius: 12, overflow: 'hidden', border: '1px solid #cbd5e1' }}>
            <DistrictMapSection />
          </div>
        </section>

        {/* Focus Areas */}
        <section>
          <h4 style={{ margin: '0 0 18px', color: '#165d36', fontSize: 20, fontFamily: 'Georgia, serif' }}>
            📸 Active Public Innovation & Transformation Domains
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {INNOVATION_AREAS.map((area, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: 160, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                  <img
                    src={area.image}
                    alt={area.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: 10,
                        fontWeight: 800,
                        backgroundColor: '#eaf3eb',
                        color: '#165d36',
                        padding: '3px 8px',
                        borderRadius: 4,
                        marginBottom: 6
                      }}
                    >
                      {area.badge}
                    </span>
                    <h5 style={{ margin: '0 0 6px', fontSize: 14, color: '#165d36', fontWeight: 700 }}>{area.title}</h5>
                    <p style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{area.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div>
            <h3 style={{ margin: '0 0 8px', color: '#fff' }}>Jharkhand Citizen Portal</h3>
            <p style={{ margin: 0, fontSize: 13, color: '#dce9df' }}>
              Department of Higher & Technical Education &bull; Government of Jharkhand 2026
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setActiveModal('feedback')}
              style={{ padding: '9px 14px', border: '1px solid #8db79a', borderRadius: 5, color: '#fff', background: 'transparent', cursor: 'pointer' }}
            >
              Give Feedback
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Support Button */}
      <div className="floating-support-btn" onClick={() => setActiveModal('feedback')}>
        <span style={{ fontSize: 18 }}>💬</span>
        <span>Need Help / Report Issue?</span>
      </div>

      {/* Feedback Modal */}
      {activeModal === 'feedback' && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ margin: 0, color: '#165d36', fontFamily: 'Georgia, serif' }}>Citizen Support & Feedback</h2>
              <button className="close" onClick={closeModal}>×</button>
            </div>

            {fbNotice && (
              <div style={{ padding: '10px 14px', borderRadius: 6, marginBottom: 14, fontSize: 13, fontWeight: 700, backgroundColor: fbNotice.includes('successfully') ? '#eaf3eb' : '#fee2e2', color: fbNotice.includes('successfully') ? '#165d36' : '#991b1b' }}>
                {fbNotice}
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Name</label>
                  <input type="text" required value={fbName} onChange={(e) => setFbName(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5cc', borderRadius: 5, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Email</label>
                  <input type="email" required value={fbEmail} onChange={(e) => setFbEmail(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5cc', borderRadius: 5, boxSizing: 'border-box' }} />
                </div>
              </div>

              <label style={{ display: 'block', marginBottom: 4, fontWeight: 700, fontSize: 13 }}>Experience Rating</label>
              <select value={fbRating} onChange={(e) => setFbRating(e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid #cbd5cc', borderRadius: 5, marginBottom: 12, boxSizing: 'border-box' }}>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Needs improvement">Needs improvement</option>
              </select>

              <label style={{ display: 'block', marginBottom: 4, fontWeight: 700, fontSize: 13 }}>Comments</label>
              <textarea required rows={3} value={fbComments} onChange={(e) => setFbComments(e.target.value)} placeholder="Describe your experience or query..." style={{ width: '100%', padding: 10, border: '1px solid #cbd5cc', borderRadius: 5, marginBottom: 12, boxSizing: 'border-box', fontFamily: 'inherit' }} />

              <button type="submit" disabled={isSubmittingFb} style={{ width: '100%', marginTop: 14, padding: 12, backgroundColor: '#165d36', color: '#fff', border: 'none', borderRadius: 5, fontWeight: 700, cursor: 'pointer' }}>
                {isSubmittingFb ? 'Saving...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
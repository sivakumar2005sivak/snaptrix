'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  LogIn, 
  Landmark, 
  Bell, 
  ShieldCheck, 
  UserCheck, 
  UserPlus, 
  PhoneCall,
  Cpu,
  Coins,
  ArrowRight,
  GitBranch,
  Filter,
  CheckCircle2,
  Workflow,
  Sparkles,
  SearchCode,
  ShieldAlert
} from 'lucide-react';

const SLIDES = [
  { 
    tag: 'NEP 2020 ACADEMIC R&D INTEGRATION • DEPT. OF HIGHER & TECHNICAL EDUCATION', 
    title: 'Jharkhand State Societal Innovation & Collaboration Mission', 
    desc: 'An institutional ecosystem uniting rural citizen challenges, 38 accredited universities, and corporate CSR wings for scalable technology delivery across all 24 districts.' 
  },
  { 
    tag: 'SMART AGRI-TECH & WATER CONSERVATION INITIATIVE', 
    title: 'Sensor-Telemetry Irrigation & Tribal Crop Health Monitoring', 
    desc: 'Edge-AI and LoRaWAN based telemetry nodes engineered by student engineering labs to mitigate seasonal canal blockages and pest outbreaks across Mandar, Bedo, and Dumka farm belts.' 
  },
  { 
    tag: 'PUBLIC OCCUPATIONAL SAFETY & MINING TELEMETRY', 
    title: 'Respirable Particulate Telemetry for Opencast Coal Miners', 
    desc: 'Real-time air telemetry nodes and edge hardware solutions developed under corporate CSR co-investment for Dhanbad and Ramgarh coal belts.' 
  },
  { 
    tag: 'NEP 2020 MULTILINGUAL TECHNICAL PEDAGOGY', 
    title: 'Santhali & Mundari Digital Audio Assistants for Rural Schools', 
    desc: 'Empowering primary students across tribal blocks through low-cost offline AI hardware assistants built by state university computing labs.' 
  },
];

const PROJECT_WORKFLOW = [
  {
    step: '01',
    layer: 'Ingestion Layer',
    title: 'Citizen Problem Ingestion & Geotagging',
    icon: Users,
    borderColor: '#f59e0b',
    accentBg: '#fffbeb',
    tagColor: '#b45309',
    details: [
      'Citizens, SHGs & Panchayats log live grassroots challenges via /dashboard/public.',
      'Captures problem text, photos, video links, and exact GPS coordinates.',
      'Auto-generates verified state tracking ticket ID (e.g. JH-2026-XXXX).'
    ],
    technicalTag: 'API: /api/complaints/create'
  },
  {
    step: '02',
    layer: 'AI Intelligence Layer',
    title: 'NLP Vectorization & Deduplication',
    icon: SearchCode,
    borderColor: '#0284c7',
    accentBg: '#f0f9ff',
    tagColor: '#0369a1',
    details: [
      'Sentence-BERT / RoBERTa extracts contextual text vectors and features.',
      'Zero-Shot multi-class classification into Agri, Water, Health, or IoT domains.',
      'Cosine similarity (>0.85) deduplication merges duplicate village tickets.'
    ],
    technicalTag: 'FastAPI NLP & Vector Store'
  },
  {
    step: '03',
    layer: 'Matching & Governance Layer',
    title: 'Intelligent University & Lab Mapping',
    icon: GitBranch,
    borderColor: '#8b5cf6',
    accentBg: '#faf5ff',
    tagColor: '#6d28d9',
    details: [
      'Matches problem domain to nearest HEI based on AISHE code & lab equipment.',
      'SPOC reviews ticket on /dashboard/university and assigns student engineering team.',
      'Faculty Mentor & lead student roll number linked with ACID SQL integrity.'
    ],
    technicalTag: 'DB: complaint_teams'
  },
  {
    step: '04',
    layer: 'R&D & Prototyping Layer',
    title: 'Lab Fabrication & Proof Upload',
    icon: Cpu,
    borderColor: '#059669',
    accentBg: '#f0fdf4',
    tagColor: '#047857',
    details: [
      'Student lab develops functional hardware model (ESP32, LoRa, Edge-AI).',
      'Uploads test telemetry logs, demonstration photos, and video proof.',
      'Automated validation checks prototype readiness for ground field deployment.'
    ],
    technicalTag: 'DB: complaint_prototypes'
  },
  {
    step: '05',
    layer: 'Field Verification Layer',
    title: 'Panchayat Trials & Citizen Consent',
    icon: CheckCircle2,
    borderColor: '#d97706',
    accentBg: '#fffbeb',
    tagColor: '#92400e',
    details: [
      'On-site field trial conducted in the citizen’s village / farm cluster.',
      'Community tests working hardware and signs satisfaction consent form.',
      'Digitized signed consent PDF uploaded to prevent false ticket closures.'
    ],
    technicalTag: 'DB: complaint_consents'
  },
  {
    step: '06',
    layer: 'Commercialization Layer',
    title: 'Industry CSR Licensing & Seed Grant',
    icon: Coins,
    borderColor: '#4c1d95',
    accentBg: '#faf5ff',
    tagColor: '#4c1d95',
    details: [
      'Comprehensive dossier audit triggers state prototyping seed grant release.',
      'MCA CIN-verified corporate partners (/dashboard/industry) adopt TRL-6 model.',
      'Bilateral MoU signed for CSR co-investment and statewide manufacturing.'
    ],
    technicalTag: 'DB: industry_adoptions'
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'citizen' | 'government' | 'university' | 'industry'>('citizen');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Arial, Helvetica, sans-serif', color: '#1e293b' }}>

      {/* TOP UTILITY STRIP */}
      <div style={{ backgroundColor: '#0f2d1e', color: '#f8fafc', fontSize: 11, padding: '5px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #164e31' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>झारखण्ड सरकार | GOVERNMENT OF JHARKHAND</span>
          <span style={{ color: '#4ade80' }}>•</span>
          <span style={{ color: '#cbd5e1' }}>Department of Higher and Technical Education</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#fef08a' }}>
            <PhoneCall size={12} /> CM Helpline: <strong>181</strong> (Toll-Free)
          </span>
          <span style={{ color: '#4ade80' }}>•</span>
          <span style={{ color: '#86efac', fontWeight: 700 }}>English / हिन्दी</span>
        </div>
      </div>

      {/* TRICOLOR BAND */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      {/* OFFICIAL STATE HEADER */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1240, margin: 'auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img 
              src="/image_19fa0a.jpg" 
              alt="Jharkhand State Emblem" 
              style={{ width: 62, height: 62, objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
              }}
            />
            <div style={{ borderLeft: '2px solid #0f2d1e', paddingLeft: 12 }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                State Innovation Mission • NEP 2020 Secretariat
              </p>
              <h1 style={{ margin: '1px 0', fontSize: 22, fontWeight: 900, color: '#0f2d1e', fontFamily: 'Georgia, serif' }}>
                Janvaani Portal
              </h1>
              <p style={{ margin: 0, fontSize: 11, color: '#475569', fontWeight: 600 }}>
                Department of Higher &amp; Technical Education, Government of Jharkhand
              </p>
            </div>
          </div>

          {/* ALL 4 OFFICIAL PORTAL ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            
            {/* 1. Industry Login */}
            <Link 
              href="/industry/login" 
              style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#4c1d95', color: '#fff', padding: '8px 12px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #3b0764' }}
            >
              <Building2 size={14} /> Industry
            </Link>

            {/* 2. University Login */}
            <Link 
              href="/university/login" 
              style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1e3a8a', color: '#fff', padding: '8px 12px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #1e40af' }}
            >
              <GraduationCap size={14} /> University
            </Link>

            {/* 3. Government Official Login */}
            <Link 
              href="/gov/login" 
              style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#0f2d1e', color: '#fff', padding: '8px 12px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #064e3b' }}
            >
              <Landmark size={14} /> Gov Login
            </Link>

            {/* 4. Public / Citizen Login */}
            <Link 
              href="/login" 
              style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#b45309', color: '#fff', padding: '8px 13px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #92400e' }}
            >
              <LogIn size={14} /> Citizen Login →
            </Link>
          </div>

        </div>

        {/* TOP NAV BAR */}
        <nav style={{ backgroundColor: '#0c2619', borderTop: '1px solid #164e31' }}>
          <div style={{ maxWidth: 1240, margin: 'auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {([
                ['/', 'Home'],
                ['/login', 'Citizen Grievance Desk'],
                ['/complaints', 'Register Grievance'],
                ['/gov/login', 'Government Portal'],
                ['/university/login', 'HEI SPOC Workspace'],
                ['/industry/login', 'Industry CSR Desk'],
                ['#workflow', 'System Workflow'],
                ['#stakeholders', 'Stakeholder Portals']
              ] as [string,string][]).map(([href, label]) => (
                <Link key={href} href={href} style={{ color: '#f8fafc', padding: '11px 16px', fontSize: 12, fontWeight: 700, textDecoration: 'none', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                  {label}
                </Link>
              ))}
            </div>
            <span style={{ color: '#86efac', fontSize: 11, fontWeight: 800 }}>
              • National e-Governance Standards (GIGW Compliant)
            </span>
          </div>
        </nav>
      </header>

      {/* GAZETTE NOTIFICATION */}
      <div style={{ backgroundColor: '#fffbeb', borderBottom: '1px solid #fef08a', padding: '7px 5%', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ backgroundColor: '#92400e', color: '#ffffff', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 3, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Bell size={11} /> STATE NOTIFICATION
        </span>
        <div style={{ fontSize: 12, color: '#374151', fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          • <strong>Gazette No. JH-ED/2026/08:</strong> Institutional seed funding of ₹12.50 Lakhs allocated per accredited engineering college for resolving grassroots citizen challenges.
        </div>
      </div>

      {/* HERO SECTION */}
      <section style={{ background: 'linear-gradient(135deg, #092617 0%, #123d26 60%, #092617 100%)', color: '#fff', padding: '46px 5%', borderBottom: '4px solid #b45309' }}>
        <div style={{ maxWidth: 1240, margin: 'auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 36, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid #86efac', color: '#86efac', fontSize: 11, fontWeight: 800, padding: '3px 12px', borderRadius: 3, marginBottom: 14 }}>
              <Landmark size={13} /> STATUTORY STATE INNOVATION ECOSYSTEM • NEP 2020 MANDATE
            </div>

            <div style={{ minHeight: 120 }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, color: '#86efac', letterSpacing: '0.08em' }}>{slide.tag}</p>
              <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(22px, 3.2vw, 36px)', fontWeight: 900, fontFamily: 'Georgia, serif', lineHeight: 1.2 }}>{slide.title}</h2>
              <p style={{ margin: 0, fontSize: 13, color: '#d1fae5', lineHeight: 1.6, maxWidth: 650 }}>{slide.desc}</p>
            </div>
            
            <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: 12, height: 6, borderRadius: 2, border: 'none', backgroundColor: i === currentSlide ? '#4ade80' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }} />
              ))}
            </div>
          </div>

          {/* STATE METRICS CARD */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: 6, padding: 20, color: '#1e293b', border: '2px solid #86efac', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <div style={{ borderBottom: '2px solid #0f2d1e', paddingBottom: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: '#0f2d1e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                GOVERNMENT REGISTRY METRICS (2026)
              </span>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748b' }}>Live District Grievance Resolution Tracker</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ backgroundColor: '#f8fafc', padding: 10, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 900, color: '#0f2d1e' }}>4,102</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>Panchayat Issues Filed</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: 10, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 900, color: '#1e3a8a' }}>38</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>Accredited HEIs</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: 10, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 900, color: '#4c1d95' }}>115</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>CIN-Verified Enterprises</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: 10, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 900, color: '#15803d' }}>89</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>TRL-6 Field Prototypes</span>
              </div>
            </div>

            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #e2e8f0', fontSize: 10, color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
              <span>Audit Cycle: <strong>Monthly</strong></span>
              <span style={{ color: '#15803d', fontWeight: 800 }}>● 98.4% System Efficiency</span>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURAL WORKFLOW */}
      <section id="workflow" style={{ maxWidth: 1240, margin: '30px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '26px 22px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderBottom: '2px solid #0f2d1e', paddingBottom: 14, marginBottom: 22 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 900, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <Workflow size={14} /> End-to-End System Architecture &amp; Data Pipeline
              </div>
              <h2 style={{ margin: '4px 0 0', fontSize: 22, color: '#0f2d1e', fontFamily: 'Georgia, serif', fontWeight: 900 }}>
                Societal Innovation Collaborative Project Workflow
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#f0fdf4', border: '1px solid #86efac', color: '#065f46', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 800 }}>
              <Sparkles size={15} /> Fully Automated Ingestion-to-Deployment Pipeline
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {PROJECT_WORKFLOW.map((stage) => {
              const Icon = stage.icon;
              return (
                <div 
                  key={stage.step}
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderTop: `4px solid ${stage.borderColor}`,
                    borderRadius: 6,
                    padding: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: stage.borderColor, fontFamily: 'monospace' }}>
                        PHASE {stage.step}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 800, backgroundColor: stage.accentBg, border: `1px solid ${stage.borderColor}`, color: stage.tagColor, padding: '2px 8px', borderRadius: 4 }}>
                        {stage.layer}
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 800, color: '#1e293b' }}>
                      {stage.title}
                    </h3>

                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: '#475569', lineHeight: 1.65 }}>
                      {stage.details.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: 4 }}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px dashed #cbd5e1', fontSize: 10, fontWeight: 700, color: '#0f766e', fontFamily: 'monospace' }}>
                    ⚙️ {stage.technicalTag}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20, backgroundColor: '#faf5ff', border: '1px solid #d8b4fe', borderRadius: 6, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🔄</span>
              <span style={{ fontSize: 12, color: '#4c1d95', fontWeight: 700 }}>
                <strong>Data Lifecycle:</strong> Real-time automated state machine linking citizens, student hardware engineers, and CSR sponsors with complete audit transparency.
              </span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#581c87', backgroundColor: '#f3e8ff', padding: '4px 10px', borderRadius: 4 }}>
              Next.js 14 + Node + MySQL
            </span>
          </div>

        </div>
      </section>

      {/* MULTI-STAKEHOLDER GATEWAYS */}
      <section id="stakeholders" style={{ maxWidth: 1240, margin: '20px auto 40px', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 6, padding: 24 }}>
          
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: 20, color: '#0f2d1e', fontFamily: 'Georgia, serif', fontWeight: 900 }}>
              Official Stakeholder Ingestion Gateways
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
              Select an administrative or institutional portal gateway to proceed to authenticated workspaces.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
            {([
              { key: 'citizen', label: '1. Citizen & Panchayat', Icon: Users, color: '#b45309' },
              { key: 'government', label: '2. District Authorities', Icon: Landmark, color: '#0f2d1e' },
              { key: 'university', label: '3. University SPOCs', Icon: GraduationCap, color: '#1e3a8a' },
              { key: 'industry', label: '4. Corporate & CSR', Icon: Building2, color: '#4c1d95' }
            ] as const).map(t => (
              <button 
                key={t.key} 
                onClick={() => setActiveTab(t.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '11px 8px',
                  fontSize: 12,
                  fontWeight: 800,
                  border: 'none',
                  borderBottom: activeTab === t.key ? `3px solid ${t.color}` : '3px solid #e2e8f0',
                  backgroundColor: activeTab === t.key ? '#f8fafc' : '#ffffff',
                  color: activeTab === t.key ? t.color : '#64748b',
                  cursor: 'pointer'
                }}
              >
                <t.Icon size={15} /> {t.label}
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: 22 }}>
            
            {/* CITIZEN GATEWAY */}
            {activeTab === 'citizen' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px', color: '#b45309', fontSize: 16 }}>Public Problem Registration &amp; Tracking</h4>
                  <p style={{ margin: '0 0 10px', fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
                    Citizens, Gram Mukhiyas, Farmers, and Self-Help Groups (SHGs) can lodge local challenges with photographic evidence and exact GPS locations across all 24 districts of Jharkhand.
                  </p>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: 18, borderRadius: 5, border: '1px solid #cbd5e1' }}>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Citizen Actions:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Link href="/login" style={{ backgroundColor: '#b45309', color: '#fff', padding: '9px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                      Sign In to Public Portal →
                    </Link>
                    <Link href="/register" style={{ backgroundColor: '#ffffff', color: '#b45309', border: '1px solid #b45309', padding: '9px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                      Register New Citizen Account
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* GOVERNMENT GATEWAY */}
            {activeTab === 'government' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px', color: '#0f2d1e', fontSize: 16 }}>District Administration &amp; Nodal Officers</h4>
                  <p style={{ margin: '0 0 10px', fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
                    Deputy Commissioners (DCs), Departmental Secretaries, and Nodal Officers monitor problem clusters, verify field prototypes, and sanction state innovation grants.
                  </p>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: 18, borderRadius: 5, border: '1px solid #cbd5e1' }}>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>State Administrative Access:</span>
                  <Link href="/gov/login" style={{ display: 'block', backgroundColor: '#0f2d1e', color: '#fff', padding: '9px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                    Access State Govt Command Portal →
                  </Link>
                </div>
              </div>
            )}

            {/* UNIVERSITY GATEWAY */}
            {activeTab === 'university' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px', color: '#1e3a8a', fontSize: 16 }}>Higher Education Institutions (HEIs) &amp; SPOC Coordinators</h4>
                  <p style={{ margin: '0 0 10px', fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
                    Institutions onboard verified SPOC officers to receive generated credentials and deploy student engineering teams.
                  </p>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: 18, borderRadius: 5, border: '1px solid #cbd5e1' }}>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Institutional Operations:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Link href="/university/login" style={{ backgroundColor: '#1e3a8a', color: '#fff', padding: '9px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                      SPOC Workspace Login →
                    </Link>
                    <Link href="/university/register" style={{ backgroundColor: '#ffffff', color: '#1e3a8a', border: '1px solid #1e3a8a', padding: '9px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                      Register New College SPOC
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* INDUSTRY GATEWAY */}
            {activeTab === 'industry' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px', color: '#4c1d95', fontSize: 16 }}>Corporate Enterprise, MSME &amp; CSR Co-Investment</h4>
                  <p style={{ margin: '0 0 10px', fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
                    Commercialize validated TRL-6 student hardware prototypes. Verified through 21-digit MCA CIN numbers to license technologies and deploy CSR allocations.
                  </p>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: 18, borderRadius: 5, border: '1px solid #cbd5e1' }}>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Corporate Operations:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Link href="/industry/login" style={{ backgroundColor: '#4c1d95', color: '#fff', padding: '9px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                      Industry Desk Login →
                    </Link>
                    <Link href="/industry/register" style={{ backgroundColor: '#ffffff', color: '#4c1d95', border: '1px solid #4c1d95', padding: '9px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none', textAlign: 'center' }}>
                      Register Enterprise (Get User ID) →
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#091f14', color: '#f8fafc', padding: '36px 5% 18px', borderTop: '4px solid #b45309', fontSize: 11 }}>
        <div style={{ maxWidth: 1240, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, color: '#94a3b8' }}>
          <div>© 2026 Government of Jharkhand. All Rights Reserved.</div>
          <div>Contents managed by Department of Higher &amp; Technical Education.</div>
        </div>
      </footer>
    </div>
  );
}
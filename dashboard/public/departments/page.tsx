'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LOGO_SRC = '/image_19fa0a.jpg';

const DEPARTMENTS = [
  { id: 'agriculture', name: 'Agriculture, Animal Husbandry & Co-operative', icon: '🌾', href: '/dashboard/public/departments/agriculture', desc: 'Crop cultivation, micro-irrigation, farm mechanization, livestock support & co-operative societies.', category: 'Rural & Agriculture' },
  { id: 'food-public-distribution', name: 'Food, Public Distribution & Consumer Affairs', icon: '🍚', href: '/dashboard/public/departments/food-public-distribution', desc: 'State food security, MSP, TPDS ration cards, Mid-Day Meal & consumer protection.', category: 'Rural & Agriculture' },
  { id: 'rural-development', name: 'Rural Development', icon: '🏘️', href: '/dashboard/public/departments/rural-development', desc: 'MGNREGS, PMGSY rural roads, PMAY housing, livelihood missions & rural infrastructure.', category: 'Rural & Agriculture' },
  { id: 'panchayati-raj', name: 'Panchayati Raj', icon: '🏛️', href: '/dashboard/public/departments/panchayati-raj', desc: 'Gram Panchayat governance, devolution of powers, local self-government & rural elections.', category: 'Rural & Agriculture' },
  { id: 'water-resources', name: 'Water Resources', icon: '💧', href: '/dashboard/public/departments/water-resources', desc: 'Irrigation canals, dams, flood control, groundwater management & watershed development.', category: 'Infrastructure' },
  { id: 'drinking-water-sanitation', name: 'Drinking Water & Sanitation', icon: '🚰', href: '/dashboard/public/departments/drinking-water-sanitation', desc: 'Jal Jeevan Mission, rural piped water supply, ODF villages & sanitation infrastructure.', category: 'Infrastructure' },
  { id: 'energy', name: 'Energy', icon: '⚡', href: '/dashboard/public/departments/energy', desc: 'JBVNL power distribution, rural electrification, solar energy & renewable power projects.', category: 'Infrastructure' },
  { id: 'road-construction', name: 'Road Construction', icon: '🛣️', href: '/dashboard/public/departments/road-construction', desc: 'State highways, district roads, bridges, PMGSY rural connectivity & road maintenance.', category: 'Infrastructure' },
  { id: 'building-construction', name: 'Building Construction', icon: '🏗️', href: '/dashboard/public/departments/building-construction', desc: 'Government buildings, secretariat infrastructure, public works & construction standards.', category: 'Infrastructure' },
  { id: 'urban-development', name: 'Urban Development & Housing', icon: '🏙️', href: '/dashboard/public/departments/urban-development', desc: 'Smart Cities Mission, AMRUT, urban local bodies, housing schemes & town planning.', category: 'Infrastructure' },
  { id: 'transport', name: 'Transport', icon: '🚌', href: '/dashboard/public/departments/transport', desc: 'Vehicle registration, driving licenses, public transport, road safety & motor vehicles act.', category: 'Infrastructure' },
  { id: 'health', name: 'Health, Medical Education & Family Welfare', icon: '🏥', href: '/dashboard/public/departments/health', desc: 'PHCs, district hospitals, Ayushman Bharat, JSSK, immunization & medical colleges.', category: 'Social Welfare' },
  { id: 'school-education', name: 'School Education & Literacy', icon: '📚', href: '/dashboard/public/departments/school-education', desc: 'Samagra Shiksha, government schools, mid-day meal, teacher recruitment & literacy missions.', category: 'Social Welfare' },
  { id: 'higher-technical-education', name: 'Higher & Technical Education', icon: '🎓', href: '/dashboard/public/departments/higher-technical-education', desc: 'Universities, engineering colleges, polytechnics, NEP 2020 implementation & research grants.', category: 'Social Welfare' },
  { id: 'women-child', name: 'Women, Child Development & Social Security', icon: '👩‍👧', href: '/dashboard/public/departments/women-child', desc: 'ICDS, Anganwadi, Sukanya Samridhi, pension schemes & women empowerment programs.', category: 'Social Welfare' },
  { id: 'tribal-welfare', name: 'Scheduled Tribe, SC, Minority & Backward Class Welfare', icon: '🤝', href: '/dashboard/public/departments/tribal-welfare', desc: 'ST/SC scholarships, post-matric schemes, tribal sub-plan, minority welfare & reservations.', category: 'Social Welfare' },
  { id: 'labour-employment', name: 'Labour, Employment, Training & Skill Development', icon: '👷', href: '/dashboard/public/departments/labour-employment', desc: 'PMKVY skill training, ITIs, labour welfare, ESIC, EPF & employment exchanges.', category: 'Social Welfare' },
  { id: 'forest-environment', name: 'Forest, Environment & Climate Change', icon: '🌳', href: '/dashboard/public/departments/forest-environment', desc: 'Forest conservation, wildlife sanctuaries, pollution control, climate action & green cover.', category: 'Environment & Resources' },
  { id: 'mines-geology', name: 'Mines & Geology', icon: '⛏️', href: '/dashboard/public/departments/mines-geology', desc: 'Mining leases, mineral exploration, coal & iron ore regulation, JSMDC & geology surveys.', category: 'Environment & Resources' },
  { id: 'industries', name: 'Industries', icon: '🏭', href: '/dashboard/public/departments/industries', desc: 'MSME promotion, industrial parks, investment facilitation, JIIDCO & startup ecosystem.', category: 'Environment & Resources' },
  { id: 'revenue-land', name: 'Revenue, Registration & Land Reforms', icon: '📋', href: '/dashboard/public/departments/revenue-land', desc: 'Land records, mutation, Jharbhoomi portal, property registration & land acquisition.', category: 'Governance & Administration' },
  { id: 'home', name: 'Home, Prison & Disaster Management', icon: '🛡️', href: '/dashboard/public/departments/home', desc: 'Law & order, Jharkhand Police, SDRF, disaster relief, prisons & civil defence.', category: 'Governance & Administration' },
  { id: 'it-egovernance', name: 'Information Technology & e-Governance', icon: '💻', href: '/dashboard/public/departments/it-egovernance', desc: 'Digital Jharkhand, e-district services, NIC, CSC centres & digital infrastructure.', category: 'Governance & Administration' },
  { id: 'planning-development', name: 'Planning & Development', icon: '📊', href: '/dashboard/public/departments/planning-development', desc: 'State annual plans, NITI Aayog coordination, district planning & development monitoring.', category: 'Governance & Administration' },
  { id: 'personnel-admin', name: 'Personnel, Administrative Reforms & Rajbhasha', icon: '📁', href: '/dashboard/public/departments/personnel-admin', desc: 'IAS/IPS cadre management, service rules, administrative reforms & Hindi promotion.', category: 'Governance & Administration' },
  { id: 'law', name: 'Law', icon: '⚖️', href: '/dashboard/public/departments/law', desc: 'Legal affairs, government litigation, law commission, legal aid & legislative drafting.', category: 'Governance & Administration' },
  { id: 'finance', name: 'Finance', icon: '💰', href: '/dashboard/public/departments/finance', desc: 'State budget, treasury management, taxation policy, audit & financial regulations.', category: 'Governance & Administration' },
  { id: 'commercial-taxes', name: 'Commercial Taxes', icon: '🧾', href: '/dashboard/public/departments/commercial-taxes', desc: 'GST administration, VAT, state tax collection, e-filing & commercial tax enforcement.', category: 'Governance & Administration' },
  { id: 'excise', name: 'Excise & Prohibition', icon: '🏷️', href: '/dashboard/public/departments/excise', desc: 'Liquor policy, excise duty, prohibition enforcement & excise revenue management.', category: 'Governance & Administration' },
  { id: 'tourism', name: 'Tourism, Art, Culture, Sports & Youth Affairs', icon: '🎭', href: '/dashboard/public/departments/tourism', desc: 'Heritage tourism, tribal culture, Sohrai art, sports academies & youth development.', category: 'Culture & Tourism' },
  { id: 'welfare-disabled', name: 'Social Welfare (Disabled & Senior Citizens)', icon: '♿', href: '/dashboard/public/departments/welfare-disabled', desc: 'NSAP pensions, disability certificates, assistive devices, old age homes & welfare schemes.', category: 'Social Welfare' },
  { id: 'cooperation', name: 'Co-operation', icon: '🤲', href: '/dashboard/public/departments/cooperation', desc: 'Co-operative societies registration, PACS, dairy co-ops, credit societies & NABARD linkage.', category: 'Rural & Agriculture' },
];

const CATEGORIES = ['All', 'Rural & Agriculture', 'Infrastructure', 'Social Welfare', 'Environment & Resources', 'Governance & Administration', 'Culture & Tourism'];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Rural & Agriculture':       { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
  'Infrastructure':            { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' },
  'Social Welfare':            { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff' },
  'Environment & Resources':   { bg: '#f0fdfa', text: '#065f46', border: '#99f6e4' },
  'Governance & Administration':{ bg: '#fff7ed', text: '#9a3412', border: '#fed7aa' },
  'Culture & Tourism':         { bg: '#fefce8', text: '#854d0e', border: '#fef08a' },
};

export default function DepartmentsDirectoryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = DEPARTMENTS.filter((d) => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', color: '#1f2937', fontFamily: 'Inter, Arial, sans-serif' }}>

      {/* Top Banner */}
      <div style={{ background: 'linear-gradient(90deg, #0f2e1e, #165d36)', color: '#fff8dd', padding: '9px 5%', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em' }}>
        🏛️ GOVERNMENT OF JHARKHAND &nbsp;&bull;&nbsp; OFFICIAL DEPARTMENTS DIRECTORY &nbsp;&bull;&nbsp; झारखण्ड सरकार
      </div>

      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '3px solid #165d36', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: 'auto', padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Jharkhand Emblem" style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: '50%', border: '2px solid #165d36' }}
              onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png'; }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#165d36', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Government of Jharkhand</div>
              <h1 style={{ margin: '2px 0 0', fontSize: 22, color: '#0f2e1e', fontWeight: 900, fontFamily: 'Georgia, serif' }}>Departments Directory</h1>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 1 }}>All 32 State Ministries & Administrative Departments</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/dashboard/public" style={{ padding: '9px 18px', backgroundColor: '#fff', color: '#165d36', border: '1.5px solid #165d36', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
              ← Back to Portal
            </Link>
            <Link href="/dashboard/public/complaints" style={{ padding: '9px 18px', backgroundColor: '#165d36', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
              Lodge Grievance
            </Link>
          </div>
        </div>

        {/* Nav strip */}
        <div style={{ background: '#165d36', padding: '0 5%' }}>
          <div style={{ maxWidth: 1280, margin: 'auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
            {['Home', 'Departments', 'Schemes', 'Grievance', 'RTI', 'Tenders'].map((item, i) => (
              <span key={i} style={{ padding: '10px 18px', color: i === 1 ? '#fed766' : '#d1fae5', fontSize: 13, fontWeight: 700, cursor: 'pointer', borderBottom: i === 1 ? '2px solid #fed766' : '2px solid transparent', whiteSpace: 'nowrap' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(115deg, #0f2e1e 0%, #165d36 60%, #1a7a45 100%)', color: '#fff', padding: '32px 5%' }}>
        <div style={{ maxWidth: 1280, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#86efac', letterSpacing: '0.12em', marginBottom: 6 }}>SOCIETAL INNOVATION PORTAL — DEPARTMENT DIRECTORY</div>
            <h2 style={{ margin: 0, fontSize: 28, fontFamily: 'Georgia, serif', fontWeight: 700 }}>Explore All State Departments</h2>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: '#d1fae5', maxWidth: 560 }}>
              Access mandates, schemes, grievance portals and innovation challenges across all 32 administrative departments of Jharkhand.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Total Departments', value: '32' },
              { label: 'Active Schemes', value: '180+' },
              { label: 'Districts Covered', value: '24' },
              { label: 'Grievances Resolved', value: '4,102' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '12px 18px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#fed766' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#d1fae5', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 5%', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1280, margin: 'auto', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 380 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
            <input
              type="text"
              placeholder="Search departments or schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1.5px solid #cbd5e1', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', backgroundColor: '#f8fafc' }}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: '1.5px solid',
                  backgroundColor: activeCategory === cat ? '#165d36' : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : '#374151',
                  borderColor: activeCategory === cat ? '#165d36' : '#d1d5db',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Showing <strong style={{ color: '#165d36' }}>{filtered.length}</strong> of 32 departments
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main style={{ maxWidth: 1280, margin: '28px auto', padding: '0 5% 60px' }}>

        {/* Group by category */}
        {(activeCategory === 'All' ? CATEGORIES.slice(1) : [activeCategory]).map((cat) => {
          const depts = filtered.filter((d) => d.category === cat);
          if (depts.length === 0) return null;
          const colors = CATEGORY_COLORS[cat];
          return (
            <div key={cat} style={{ marginBottom: 40 }}>
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ height: 3, width: 32, backgroundColor: colors.text, borderRadius: 2 }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cat}</h3>
                <div style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: colors.text, background: colors.bg, border: `1px solid ${colors.border}`, padding: '3px 10px', borderRadius: 12 }}>
                  {depts.length} Dept{depts.length > 1 ? 's' : ''}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {depts.map((dept) => (
                  <Link
                    key={dept.id}
                    href={dept.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      backgroundColor: '#ffffff',
                      border: `1.5px solid ${colors.border}`,
                      borderRadius: 10,
                      padding: '20px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'box-shadow 0.2s, border-color 0.2s',
                      cursor: 'pointer',
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(22,93,54,0.12)'; (e.currentTarget as HTMLDivElement).style.borderColor = colors.text; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.borderColor = colors.border; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: colors.bg, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                          {dept.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, color: colors.text, background: colors.bg, border: `1px solid ${colors.border}`, padding: '2px 8px', borderRadius: 10, marginBottom: 5, letterSpacing: '0.06em' }}>
                            {dept.category.toUpperCase()}
                          </span>
                          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#0f2e1e', lineHeight: 1.4 }}>
                            Dept. of {dept.name}
                          </h4>
                        </div>
                      </div>

                      <p style={{ margin: 0, fontSize: 12.5, color: '#64748b', lineHeight: 1.6 }}>{dept.desc}</p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingTop: 10, borderTop: `1px solid ${colors.border}` }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>View Mandate & Schemes →</span>
                        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Lodge Grievance</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <h3 style={{ color: '#165d36', margin: '0 0 8px' }}>No departments found</h3>
            <p style={{ margin: 0, fontSize: 14 }}>Try a different search term or category filter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(90deg, #0f2e1e, #165d36)', color: '#d1fae5', padding: '28px 5%' }}>
        <div style={{ maxWidth: 1280, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#fff', marginBottom: 4 }}>Government of Jharkhand</div>
            <div style={{ fontSize: 12, color: '#86efac' }}>Department of Higher & Technical Education &bull; Societal Innovation Portal &bull; © 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, fontWeight: 600 }}>
            {['Website Policy', 'Terms & Conditions', 'RTI', 'Contact Us'].map((item) => (
              <span key={item} style={{ color: '#86efac', cursor: 'pointer' }}>{item}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

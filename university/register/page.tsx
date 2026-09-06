'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LOGO_SRC = '/image_19fa0a.jpg';

export default function SpocRegisterPage() {
  const router = useRouter();

  const [spocName, setSpocName] = useState('');
  const [spocEducation, setSpocEducation] = useState('Ph.D / Master Degree');
  const [hasEcell, setHasEcell] = useState('Yes');
  const [spocExperience, setSpocExperience] = useState('');
  const [spocEmail, setSpocEmail] = useState('');
  const [spocPhone, setSpocPhone] = useState('');
  const [spocPhotoName, setSpocPhotoName] = useState('');
  const [consentLetterName, setConsentLetterName] = useState('');

  const [collegeName, setCollegeName] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [collegeAddress, setCollegeAddress] = useState('');
  const [collegeCity, setCollegeCity] = useState('');
  const [collegeState, setCollegeState] = useState('Jharkhand');
  const [departmentCount, setDepartmentCount] = useState('5');
  const [departmentNames, setDepartmentNames] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredData, setRegisteredData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await axios.post('/api/spoc/register', {
        spocName,
        spocEducation,
        hasEcell,
        spocExperience,
        spocEmail,
        spocPhone,
        spocPhotoName: spocPhotoName || 'passport_photo.png',
        consentLetterName: consentLetterName || 'signed_consent.pdf',
        collegeName,
        collegeCode,
        universityName,
        collegeAddress,
        collegeCity,
        collegeState,
        departmentCount,
        departmentNames
      });

      if (res.data?.success) {
        setRegisteredData(res.data.credentials);
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1f2937', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 5%' }}>
        <div style={{ maxWidth: 1100, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 50, height: 50, objectFit: 'contain' }} />
            <div>
              <div style={{ color: '#0f766e', fontSize: 11, fontWeight: 800 }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: 0, fontSize: 20, color: '#134e4a', fontWeight: 700 }}>SPOC Registration </h1>
            </div>
          </div>
          
          {/* ALREADY REGISTERED DIRECT SPOC LOGIN BUTTON */}
          <Link href="/university/login" style={{ backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 700, textDecoration: 'none', fontSize: 13, padding: '8px 16px', borderRadius: 4, boxShadow: '0 2px 6px rgba(30, 58, 138, 0.25)' }}>
            Already Registered? SPOC Login →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: '30px auto', padding: '0 16px 60px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 32, border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ borderBottom: '2px solid #0f766e', paddingBottom: 12, marginBottom: 24 }}>
            <h2 style={{ margin: 0, color: '#134e4a', fontSize: 22, fontFamily: 'Georgia, serif' }}>
              Institutional SPOC Onboarding
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
              Fill in the institutional and SPOC details. Credentials will be generated and sent to your registered email.
            </p>
          </div>

          {errorMessage && (
            <div style={{ padding: '12px 16px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: 6, marginBottom: 20, fontWeight: 700, fontSize: 13 }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h3 style={{ color: '#0f766e', fontSize: 16, marginBottom: 14, borderLeft: '4px solid #0f766e', paddingLeft: 8 }}>
              1. SPOC (Single Point of Contact) Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(i) SPOC Full Name *</label>
                <input type="text" required value={spocName} onChange={(e) => setSpocName(e.target.value)} placeholder="Prof. / Dr. / Mr. / Ms." style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(ii) Education Level *</label>
                <input type="text" required value={spocEducation} onChange={(e) => setSpocEducation(e.target.value)} placeholder="e.g. Ph.D, M.Tech, MBA" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(iii) E-Cell Present in College? *</label>
                <select value={hasEcell} onChange={(e) => setHasEcell(e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, backgroundColor: '#fff', boxSizing: 'border-box' }}>
                  <option value="Yes">Yes (Active Entrepreneurship Cell)</option>
                  <option value="No">No (Not Established Yet)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(iv) Experience in College *</label>
                <input type="text" required value={spocExperience} onChange={(e) => setSpocExperience(e.target.value)} placeholder="e.g. 5 Years" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(v) SPOC Official Mail-ID *</label>
                <input type="email" required value={spocEmail} onChange={(e) => setSpocEmail(e.target.value)} placeholder="spoc@university.edu.in" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(vi) Phone Number *</label>
                <input type="tel" required value={spocPhone} onChange={(e) => setSpocPhone(e.target.value)} placeholder="10-digit mobile number" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(vii) PP Size Photo (.png) *</label>
                <input type="file" accept="image/png, image/jpeg" onChange={(e) => setSpocPhotoName(e.target.files?.[0]?.name || '')} style={{ width: '100%', padding: 7, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(viii) College Consent Letter (.pdf) *</label>
                <input type="file" accept="application/pdf" onChange={(e) => setConsentLetterName(e.target.files?.[0]?.name || '')} style={{ width: '100%', padding: 7, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
            </div>

            <h3 style={{ color: '#0f766e', fontSize: 16, marginBottom: 14, borderLeft: '4px solid #0f766e', paddingLeft: 8, marginTop: 30 }}>
              2. College &amp; University Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(i) College Full Name *</label>
                <input type="text" required value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="e.g. Birsa Institute of Technology" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(ii) AISHE / College Code *</label>
                <input type="text" required value={collegeCode} onChange={(e) => setCollegeCode(e.target.value)} placeholder="e.g. BITM-834002" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(iii) Affiliated University Name *</label>
                <input type="text" required value={universityName} onChange={(e) => setUniversityName(e.target.value)} placeholder="e.g. Ranchi University / JUT" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(iv) College Address *</label>
                <input type="text" required value={collegeAddress} onChange={(e) => setCollegeAddress(e.target.value)} placeholder="Campus road, locality, pin code" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(v) College City *</label>
                <input type="text" required value={collegeCity} onChange={(e) => setCollegeCity(e.target.value)} placeholder="e.g. Ranchi / Dhanbad" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(vi) College State *</label>
                <input type="text" required value={collegeState} onChange={(e) => setCollegeState(e.target.value)} placeholder="Jharkhand" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(vii) How Many Departments? *</label>
                <input type="number" required min="1" value={departmentCount} onChange={(e) => setDepartmentCount(e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>(viii) Department Names *</label>
                <input type="text" required value={departmentNames} onChange={(e) => setDepartmentNames(e.target.value)} placeholder="CSE, ECE, Mech, Civil" style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: 14,
                backgroundColor: '#0f766e',
                color: '#ffffff',
                border: 0,
                borderRadius: 6,
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                marginTop: 16
              }}
            >
              {isSubmitting ? 'Registering & Dispatching Mail...' : 'Submit SPOC Registration'}
            </button>
          </form>
        </div>
      </main>

      {/* SUCCESS MODAL REDIRECTING TO UNIVERSITY LOGIN */}
      {registeredData && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(2, 44, 34, 0.85)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 16 }}>
          <div style={{ width: 'min(90vw, 500px)', backgroundColor: '#ffffff', borderRadius: 10, padding: 28, textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
            <h2 style={{ color: '#0f766e', margin: '0 0 8px' }}>Submitted Successfully!</h2>
            <p style={{ fontSize: 13, color: '#475569', margin: '0 0 16px' }}>
              Your login credentials have been generated and dispatched to your email: <strong>{registeredData.email}</strong>
            </p>

            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 16, textAlign: 'left', marginBottom: 20 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: '#166534', fontWeight: 700 }}>SPOC User ID:</span>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#14532d' }}>{registeredData.userId}</div>
              </div>
              <div>
                <span style={{ fontSize: 12, color: '#166534', fontWeight: 700 }}>Password:</span>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#14532d' }}>{registeredData.password}</div>
              </div>
            </div>

            <button
              onClick={() => router.push('/university/login')}
              style={{ width: '100%', padding: 12, backgroundColor: '#1e3a8a', color: '#fff', border: 0, borderRadius: 6, fontWeight: 800, cursor: 'pointer' }}
            >
              Proceed to SPOC Login Page →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
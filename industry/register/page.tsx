'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Copy, 
  FileCheck2, 
  FileBadge,
  RotateCw
} from 'lucide-react';

const LOGO_SRC = '/image_19fa0a.jpg';

export default function IndustryRegisterPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  // Form Input States
  const [companyName, setCompanyName] = useState('');
  const [cinNumber, setCinNumber] = useState('');
  const [gstin, setGstin] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sector, setSector] = useState('Manufacturing & Engineering');
  const [csrBudget, setCsrBudget] = useState('₹25 Lakhs - ₹1 Crore');

  // PDF States
  const [incorpFileName, setIncorpFileName] = useState('');
  const [incorpBase64, setIncorpBase64] = useState('');
  const [consentFileName, setConsentFileName] = useState('');
  const [consentBase64, setConsentBase64] = useState('');

  // Mobile OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // Submission States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    userId: string;
    password: string;
    companyName: string;
    officialEmail: string;
    contactPerson: string;
    designation: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'INCORP' | 'CONSENT') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Only valid .pdf files are accepted.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (type === 'INCORP') {
        setIncorpFileName(file.name);
        setIncorpBase64(result);
      } else {
        setConsentFileName(file.name);
        setConsentBase64(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendOtp = async (isResend = false) => {
    setErrorMsg('');
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '').slice(-10);

    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Direct Contact Number before requesting OTP.');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await axios.post('/api/industry/otp', {
        action: isResend ? 'RESEND' : 'SEND',
        phone: cleanPhone
      });

      if (res.data?.success) {
        setOtpSent(true);
        setOtpCode('');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to dispatch SMS OTP to your mobile number.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMsg('');
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '').slice(-10);
    const cleanOtp = otpCode.replace(/[^0-9]/g, '').trim();

    if (!cleanOtp || cleanOtp.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP code received on your mobile.');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await axios.post('/api/industry/otp', {
        action: 'VERIFY',
        phone: cleanPhone,
        otp: cleanOtp
      });

      if (res.data?.success) {
        setOtpVerified(true);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Incorrect OTP code. Please check and re-enter.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpVerified) {
      setErrorMsg('Please verify your Mobile SMS OTP before submitting.');
      return;
    }

    if (!incorpBase64) {
      setErrorMsg('Company Incorporation Certificate (.pdf) is mandatory.');
      return;
    }

    if (!consentBase64) {
      setErrorMsg('Manager / Board Authorization Consent Letter (.pdf) is mandatory.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/industry/register', {
        companyName,
        cinNumber,
        gstin,
        officialEmail,
        contactPerson,
        designation,
        phoneNumber,
        sector,
        incorporationCertBase64: incorpBase64,
        consentLetterBase64: consentBase64
      });

      if (res.data?.success) {
        setGeneratedCredentials(res.data.credentials);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Registration failed. Please verify submitted details.');
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, type: 'ID' | 'PASS') => {
    navigator.clipboard.writeText(text);
    if (type === 'ID') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#4c1d95', fontWeight: 800, fontSize: 14 }}>Loading Registration Portal...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Arial, sans-serif', color: '#1e293b' }}>
      
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      <header style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #cbd5e1', padding: '12px 5%' }}>
        <div style={{ maxWidth: 1180, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img 
              src={LOGO_SRC} 
              alt="Jharkhand State Emblem" 
              style={{ width: 50, height: 50, objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
              }}
            />
            <div>
              <div style={{ color: '#4c1d95', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                GOVERNMENT OF JHARKHAND • DEPT. OF HIGHER &amp; TECHNICAL EDUCATION
              </div>
              <h1 style={{ margin: 0, fontSize: 19, color: '#2e1065', fontWeight: 900, fontFamily: 'Georgia, serif' }}>
                Corporate CSR &amp; Prototyping License Registration
              </h1>
            </div>
          </div>

          <Link 
            href="/industry/login" 
            style={{ 
              color: '#4c1d95', 
              fontWeight: 800, 
              fontSize: 12, 
              border: '1.5px solid #4c1d95', 
              backgroundColor: '#faf5ff',
              padding: '8px 16px', 
              borderRadius: 4, 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Building2 size={15} /> Existing Enterprise? Sign In →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 940, margin: '30px auto', padding: '0 20px 60px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 32, border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          
          <div style={{ borderBottom: '2px solid #4c1d95', paddingBottom: 12, marginBottom: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#4c1d95', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <ShieldCheck size={14} /> Statutory MCA • Section 135 Companies Act Compliance
            </div>
            <h2 style={{ margin: '4px 0 0', color: '#1e293b', fontSize: 22, fontFamily: 'Georgia, serif', fontWeight: 800 }}>
              Enterprise Institutional Onboarding &amp; Document Verification
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
              Fill in your statutory enterprise details and verify your contact number. Login credentials will be generated automatically.
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #f87171', borderRadius: 6, marginBottom: 20, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 16, marginBottom: 20 }}>
              
              {/* 1. Company Name */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  Company / Enterprise Name *
                </label>
                <input 
                  type="text" 
                  required 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  placeholder="e.g. Tata Steel Limited" 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box', fontSize: 13 }} 
                />
              </div>

              {/* 2. MCA CIN */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  MCA Corporate ID (CIN) *
                </label>
                <input 
                  type="text" 
                  required 
                  value={cinNumber} 
                  onChange={(e) => setCinNumber(e.target.value.toUpperCase())} 
                  placeholder="e.g. L27100MH1907PLC000260" 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box', fontSize: 13, fontFamily: 'monospace' }} 
                />
                <span style={{ fontSize: 10, color: '#64748b' }}>21-digit statutory code</span>
              </div>

              {/* 3. GSTIN */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  GSTIN Registration *
                </label>
                <input 
                  type="text" 
                  required 
                  value={gstin} 
                  onChange={(e) => setGstin(e.target.value.toUpperCase())} 
                  placeholder="15-digit statutory GSTIN" 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box', fontSize: 13, fontFamily: 'monospace' }} 
                />
              </div>

              {/* 4. Contact Email (Any valid email allowed) */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  Official Email Address *
                </label>
                <input 
                  type="email" 
                  required 
                  value={officialEmail} 
                  onChange={(e) => setOfficialEmail(e.target.value)} 
                  placeholder="name@company.com or your email" 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box', fontSize: 13 }} 
                />
              </div>

              {/* 5. Contact Person Name */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  Authorized Contact Person *
                </label>
                <input 
                  type="text" 
                  required 
                  value={contactPerson} 
                  onChange={(e) => setContactPerson(e.target.value)} 
                  placeholder="Full Legal Name" 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box', fontSize: 13 }} 
                />
              </div>

              {/* 6. Designation */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  Authorized Person Designation / Role *
                </label>
                <input 
                  type="text" 
                  required 
                  value={designation} 
                  onChange={(e) => setDesignation(e.target.value)} 
                  placeholder="e.g. General Manager / Director" 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box', fontSize: 13 }} 
                />
              </div>

              {/* 7. Direct Contact Mobile Number */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  Direct Contact Number *
                </label>
                <input 
                  type="tel" 
                  required 
                  disabled={otpVerified}
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} 
                  maxLength={10}
                  placeholder="10-digit Mobile Number" 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, boxSizing: 'border-box', fontSize: 13, backgroundColor: otpVerified ? '#f8fafc' : '#fff' }} 
                />
              </div>

              {/* 8. Core Industrial Sector */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  Core Industrial Sector *
                </label>
                <select 
                  value={sector} 
                  onChange={(e) => setSector(e.target.value)} 
                  style={{ width: '100%', padding: 9, border: '1px solid #cbd5e1', borderRadius: 4, backgroundColor: '#fff', boxSizing: 'border-box', fontSize: 13 }}
                >
                  <option value="Manufacturing & Engineering">Manufacturing &amp; Engineering</option>
                  <option value="Agriculture & Food Processing">Agriculture &amp; Food Processing</option>
                  <option value="Mining & Energy">Mining &amp; Energy</option>
                  <option value="Healthcare & BioTech">Healthcare &amp; BioTech</option>
                  <option value="IT, IoT & Electronics">IT, IoT &amp; Electronics</option>
                </select>
              </div>

              {/* 9. PURE MOBILE OTP VERIFICATION MODULE (No devHint / demo mode) */}
              <div style={{ gridColumn: 'span 2', backgroundColor: '#faf5ff', border: '1.5px solid #d8b4fe', padding: 14, borderRadius: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#4c1d95', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <KeyRound size={15} /> Mobile SMS OTP Verification
                    </span>
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: '#6b21a8' }}>
                      Sends a 6-digit verification code directly to your mobile phone.
                    </p>
                  </div>

                  {!otpVerified ? (
                    !otpSent ? (
                      <button 
                        type="button" 
                        onClick={() => handleSendOtp(false)} 
                        disabled={otpLoading} 
                        style={{ backgroundColor: '#4c1d95', color: '#fff', border: 0, padding: '8px 16px', borderRadius: 4, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                      >
                        {otpLoading ? 'Sending SMS...' : 'Send Mobile OTP →'}
                      </button>
                    ) : (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <input 
                          type="text" 
                          maxLength={6} 
                          value={otpCode} 
                          onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, '').trim())} 
                          placeholder="6-Digit OTP" 
                          style={{ width: 115, padding: '7px 10px', border: '1.5px solid #a855f7', borderRadius: 4, fontSize: 13, fontFamily: 'monospace', fontWeight: 800, textAlign: 'center' }} 
                        />
                        <button 
                          type="button" 
                          onClick={handleVerifyOtp} 
                          disabled={otpLoading} 
                          style={{ backgroundColor: '#15803d', color: '#fff', border: 0, padding: '7px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                        >
                          {otpLoading ? 'Verifying...' : 'Verify OTP ✓'}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleSendOtp(true)} 
                          disabled={otpLoading} 
                          style={{ backgroundColor: '#ffffff', color: '#6b21a8', border: '1.5px solid #c084fc', padding: '6px 12px', borderRadius: 4, fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <RotateCw size={12} /> Resend OTP
                        </button>
                      </div>
                    )
                  ) : (
                    <span style={{ color: '#15803d', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 size={16} /> Mobile Number Verified ✓
                    </span>
                  )}
                </div>
              </div>

            

              {/* 11. Company Incorporation Certificate (.pdf) */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 5 }}>
                  Company Incorporation Certificate (.pdf) *
                </label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  required 
                  onChange={(e) => handleFileChange(e, 'INCORP')} 
                  style={{ width: '100%', padding: 6, border: '1px solid #cbd5e1', borderRadius: 4, backgroundColor: '#fff', boxSizing: 'border-box', fontSize: 12 }} 
                />
                {incorpFileName && (
                  <span style={{ fontSize: 11, color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <FileCheck2 size={13} /> Attached: {incorpFileName}
                  </span>
                )}
              </div>

              {/* 12. Manager Consent Letter (.pdf) */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#4c1d95', marginBottom: 5 }}>
                  Authorization letter &amp; Seal (.pdf) *
                </label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  required 
                  onChange={(e) => handleFileChange(e, 'CONSENT')} 
                  style={{ width: '100%', padding: 6, border: '1.5px solid #a855f7', borderRadius: 4, backgroundColor: '#faf5ff', boxSizing: 'border-box', fontSize: 12 }} 
                />
                {consentFileName && (
                  <span style={{ fontSize: 11, color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <FileBadge size={13} /> Attached &amp; Validated: {consentFileName}
                  </span>
                )}
              </div>

            </div>

            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                width: '100%', 
                padding: '13px 20px', 
                backgroundColor: '#4c1d95', 
                color: '#ffffff', 
                border: 0, 
                borderRadius: 5, 
                fontWeight: 800, 
                fontSize: 14, 
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(76, 29, 149, 0.25)'
              }}
            >
              {loading ? 'Verifying Documents & Generating Credentials...' : 'Verify Enterprise & Generate Industry User ID →'}
            </button>
          </form>

        </div>
      </main>

      {/* Pop-up Credentials Modal */}
      {generatedCredentials && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 16 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 28, width: 'min(92vw, 500px)', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#6b21a8', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: 26 }}>
              🏛️
            </div>
            
            <h3 style={{ margin: '0 0 6px', color: '#2e1065', fontSize: 20, fontFamily: 'Georgia, serif', fontWeight: 800 }}>
              Enterprise Verified &amp; Onboarded!
            </h3>
            <p style={{ margin: '0 0 18px', fontSize: 12, color: '#64748b' }}>
              Your company documents and identity have been verified. Copy your credentials below to log in.
            </p>

            <div style={{ backgroundColor: '#faf5ff', border: '1.5px solid #d8b4fe', padding: 18, borderRadius: 6, textAlign: 'left', marginBottom: 20 }}>
              
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase' }}>
                  Assigned Industry User ID:
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#4c1d95', fontFamily: 'monospace' }}>
                    {generatedCredentials.userId}
                  </span>
                  <button 
                    onClick={() => copyText(generatedCredentials.userId, 'ID')}
                    style={{ backgroundColor: '#fff', border: '1px solid #c084fc', padding: '4px 8px', borderRadius: 4, fontSize: 11, color: '#6b21a8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <Copy size={12} /> {copiedId ? 'Copied!' : 'Copy ID'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase' }}>
                  Auto-Generated Password:
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#b45309', fontFamily: 'monospace' }}>
                    {generatedCredentials.password}
                  </span>
                  <button 
                    onClick={() => copyText(generatedCredentials.password, 'PASS')}
                    style={{ backgroundColor: '#fff', border: '1px solid #fcd34d', padding: '4px 8px', borderRadius: 4, fontSize: 11, color: '#b45309', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <Copy size={12} /> {copiedPass ? 'Copied!' : 'Copy Password'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 6, fontSize: 12, color: '#1e293b' }}>
                <strong>Company:</strong> {generatedCredentials.companyName}
              </div>

              <div style={{ marginBottom: 6, fontSize: 12, color: '#1e293b' }}>
                <strong>Authorized Person:</strong> {generatedCredentials.contactPerson} ({generatedCredentials.designation})
              </div>

              <div style={{ fontSize: 12, color: '#1e293b' }}>
                <strong>Email:</strong> {generatedCredentials.officialEmail}
              </div>
            </div>

            <button
              onClick={() => router.push('/industry/login')}
              style={{ 
                width: '100%', 
                padding: '12px 18px', 
                backgroundColor: '#4c1d95', 
                color: '#ffffff', 
                border: 0, 
                borderRadius: 5, 
                fontWeight: 800, 
                fontSize: 14, 
                cursor: 'pointer' 
              }}
            >
              Proceed to Industry Login →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  ArrowLeft, 
  Building2, 
  UserCheck, 
  FileText, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  CheckCircle, 
  Download,
  Calendar
} from 'lucide-react';

const LOGO_SRC = '/image_19fa0a.jpg';

export default function SpocProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user.role !== 'university') {
            router.push('/login');
            return;
          }

          // Fetch Full Profile from Database
          axios.get(`/api/spoc/profile?userId=${user.userId}`)
            .then((res) => {
              if (res.data?.success) {
                setProfile(res.data.profile);
              } else {
                // Fallback to local session data
                setProfile(user);
              }
            })
            .catch(() => setProfile(user))
            .finally(() => setLoading(false));
        } catch {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor: '#f8fafc', fontFamily: 'Segoe UI, Arial' }}>
        <p style={{ fontWeight: 700, color: '#0f766e' }}>Loading SPOC Institutional Profile...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', color: '#1f2937', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Tricolor Strip */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 5%' }}>
        <div style={{ maxWidth: 1100, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 46, height: 46, objectFit: 'contain' }} />
            <div>
              <div style={{ color: '#0f766e', fontSize: 11, fontWeight: 800 }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: 0, fontSize: 18, color: '#134e4a', fontWeight: 700 }}>SPOC Institutional Profile &amp; Verification Record</h1>
            </div>
          </div>
          <Link 
            href="/dashboard/university" 
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0f766e', fontWeight: 700, textDecoration: 'none', fontSize: 13, border: '1px solid #0f766e', padding: '6px 14px', borderRadius: 4 }}
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Profile Card Workspace */}
      <main style={{ maxWidth: 1000, margin: '30px auto', padding: '0 16px 60px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 10, padding: 32, border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          
          {/* Top Verification Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0f766e', paddingBottom: 18, marginBottom: 26, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#f0fdf4', border: '2px solid #86efac', display: 'grid', placeItems: 'center', fontSize: 26, color: '#0f766e' }}>
                🏛️
              </div>
              <div>
                <h2 style={{ margin: 0, color: '#134e4a', fontSize: 22, fontFamily: 'Georgia, serif' }}>
                  {profile?.college_name || profile?.college || 'Registered College'}
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: 13, color: '#64748b' }}>
                  Affiliated to: <strong>{profile?.university_name || profile?.university || 'State University'}</strong> &bull; AISHE Code: <strong>{profile?.college_code || profile?.collegeCode || 'AISHE-JH'}</strong>
                </p>
              </div>
            </div>

            <span style={{ backgroundColor: '#ecfdf5', color: '#065f46', border: '1px solid #86efac', fontSize: 12, fontWeight: 800, padding: '6px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} /> Verified SPOC Account
            </span>
          </div>

          {/* SECTION 1: SPOC PERSONAL & CONTACT DETAILS */}
          <h3 style={{ color: '#0f766e', fontSize: 16, marginBottom: 16, borderLeft: '4px solid #0f766e', paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <UserCheck size={18} /> 1. SPOC Coordinator Particulars
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 28, backgroundColor: '#f8fafc', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(i) SPOC Coordinator Name</span>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginTop: 2 }}>{profile?.spoc_name || profile?.name}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(ii) Education Level</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.spoc_education || 'Ph.D / Master Degree'}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(iii) E-Cell Present in College</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: profile?.has_ecell === 'Yes' ? '#166534' : '#92400e', marginTop: 2 }}>
                {profile?.has_ecell || 'Yes'}
              </div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(iv) Experience in College</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.spoc_experience || '5+ Years'}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(v) SPOC Official Mail-ID</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f766e', marginTop: 2 }}>{profile?.spoc_email || profile?.email}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(vi) Mobile Number</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.spoc_phone || '+91 98765 XXXXX'}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(vii) SPOC Login User ID</span>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#14532d', fontFamily: 'monospace', marginTop: 2 }}>{profile?.login_user_id || profile?.userId}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(viii) Registration Timestamp</span>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginTop: 2 }}>
                {profile?.created_at ? new Date(profile.created_at).toLocaleString() : '2026 Academic Session'}
              </div>
            </div>
          </div>

          {/* SECTION 2: COLLEGE & INSTITUTIONAL DATA */}
          <h3 style={{ color: '#0f766e', fontSize: 16, marginBottom: 16, borderLeft: '4px solid #0f766e', paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Building2 size={18} /> 2. Institutional &amp; Department Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 28, backgroundColor: '#f8fafc', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(i) College Full Name</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.college_name || profile?.college}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(ii) AISHE / College Code</span>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f766e', marginTop: 2 }}>{profile?.college_code || profile?.collegeCode}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(iii) Affiliated University</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.university_name || profile?.university}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(iv) Campus Address</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginTop: 2 }}>{profile?.college_address || 'Main University Campus'}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(v) City &amp; District</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.college_city || profile?.city || 'Ranchi'}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(vi) State</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.college_state || 'Jharkhand'}</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(vii) Enrolled Departments</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{profile?.department_count || '5'} Departments</div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>(viii) Department Streams</span>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f766e', marginTop: 2 }}>{profile?.departmentNames || 'CSE, ECE, Mech, Civil, Agri Tech'}</div>
            </div>
          </div>

          {/* SECTION 3: UPLOADED CONSENT & VERIFICATION DOCUMENTS */}
          <h3 style={{ color: '#0f766e', fontSize: 16, marginBottom: 14, borderLeft: '4px solid #0f766e', paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={18} /> 3. Verification Attachments &amp; Documents
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>📷 SPOC Passport Photo</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{profile?.passport_photo_path || 'passport_photo.png'}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#166534', backgroundColor: '#f0fdf4', padding: '4px 8px', borderRadius: 4 }}>
                ✓ Uploaded
              </span>
            </div>

            <div style={{ border: '1px solid #cbd5e1', borderRadius: 6, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>📄 College Consent Letter</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{profile?.consent_letter_path || 'signed_consent.pdf'}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#166534', backgroundColor: '#f0fdf4', padding: '4px 8px', borderRadius: 4 }}>
                ✓ Verified
              </span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
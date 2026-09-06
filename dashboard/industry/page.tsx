'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, LogOut, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface PortalUser {
  id: number;
  name: string;
  email?: string;
  identifier?: string;
  role: string;
  contactPerson?: string;
}

export default function IndustryDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<PortalUser | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check local session
    const stored = localStorage.getItem('portal_user');

    if (!stored) {
      // Login செய்யவில்லை என்றால் login page-க்கு திருப்பிவிடும்
      router.replace('/industry/login');
      return;
    }

    try {
      const user: PortalUser = JSON.parse(stored);
      const role = (user?.role || '').toLowerCase().trim();

      // 2. Role check: industry பயனர்களை மட்டுமே அனுமதிக்கும்
      if (role !== 'industry') {
        localStorage.removeItem('portal_user');
        router.replace('/industry/login');
        return;
      }

      setCurrentUser(user);
      setIsAuthorized(true);
    } catch (err) {
      localStorage.removeItem('portal_user');
      router.replace('/industry/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('portal_user');
    window.location.href = '/industry/login';
  };

  // Auth verify ஆகும் வரை loading screen காட்டும் (Data leak ஆகாமல் தடுக்க)
  if (!isAuthorized || !currentUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#4c1d95', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
            Verifying Enterprise Authorization...
          </div>
          <div style={{ color: '#64748b', fontSize: 13 }}>
            Accessing statutory industry workspace.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Arial, sans-serif', color: '#1e293b' }}>
      
      {/* Top Tricolor Ribbon */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      {/* Navigation Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #cbd5e1', padding: '14px 5%' }}>
        <div style={{ maxWidth: 1180, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 6, backgroundColor: '#f3e8ff', color: '#4c1d95', display: 'grid', placeItems: 'center' }}>
              <Building2 size={22} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#4c1d95', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                INDUSTRY &amp; CSR DASHBOARD
              </div>
              <h1 style={{ margin: 0, fontSize: 18, color: '#0f172a', fontWeight: 800 }}>
                {currentUser.name}
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 12, color: '#15803d', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4, backgroundColor: '#f0fdf4', padding: '6px 12px', borderRadius: 4, border: '1px solid #bbf7d0' }}>
              <ShieldCheck size={15} /> Statutory Account Active
            </span>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: '#ffffff',
                color: '#b91c1c',
                border: '1px solid #fca5a5',
                padding: '7px 14px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main style={{ maxWidth: 1180, margin: '30px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 28, border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          
          <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 16, marginBottom: 20 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 20, color: '#1e293b', fontWeight: 800 }}>
              Enterprise Dashboard
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
              Welcome, <strong>{currentUser.contactPerson || currentUser.name}</strong>. Here you can submit societal challenges, track CSR allocations, and review technology proposals.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 20 }}>
            
            <div style={{ padding: 18, borderRadius: 6, border: '1px solid #e2e8f0', backgroundColor: '#faf5ff' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#6b21a8', textTransform: 'uppercase' }}>Corporate ID</span>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#4c1d95', marginTop: 4, fontFamily: 'monospace' }}>
                {currentUser.identifier || currentUser.email || 'N/A'}
              </div>
            </div>

            <div style={{ padding: 18, borderRadius: 6, border: '1px solid #e2e8f0', backgroundColor: '#f0fdf4' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>Compliance Status</span>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#15803d', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={18} /> Verified &amp; Compliant
              </div>
            </div>

            <div style={{ padding: 18, borderRadius: 6, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Submitted Challenges</span>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={18} /> 0 Active
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
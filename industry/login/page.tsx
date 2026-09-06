'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const LOGO_SRC = '/image_19fa0a.jpg';

export default function JharkhandLoginPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier || !password) {
      setErrorMsg('Please enter both Email Address / User ID and Password.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/industry/login', {
        identifier: identifier.trim(),
        password: password
      });

      // Inside handleLogin function after receiving res.data.success:
// Inside handleLogin function (after res.data?.success):
if (res.data?.success) {
  const user = res.data.user;
  localStorage.setItem('portal_user', JSON.stringify(user));

  const role = (user.role || '').toLowerCase().trim();

  // Redirect to app/dashboard/industry/page.tsx
  if (role === 'industry') {
    window.location.href = '/dashboard/industry';
  } else if (role === 'university' || role === 'college') {
    window.location.href = '/college/dashboard';
  } else if (role === 'admin') {
    window.location.href = '/admin/dashboard';
  } else {
    window.location.href = '/student/dashboard';
  }
}
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Invalid credentials. Please verify your Email/User ID & Password.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif', color: '#1e293b' }}>
      
      {/* Statutory Tricolor Top Ribbon */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      {/* Portal Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <img 
            src={LOGO_SRC} 
            alt="Government of Jharkhand" 
            style={{ width: 44, height: 44, objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
            }}
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#15803d', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              GOVERNMENT OF JHARKHAND
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', fontFamily: 'Georgia, serif' }}>
              JANVAANI INNOVATION PORTAL
            </div>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main style={{ maxWidth: 420, width: '100%', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', padding: '32px 28px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, color: '#0f172a', fontWeight: 800, fontFamily: 'Georgia, serif' }}>
              Sign in to your account
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
              Access challenges, proposals, and collaborative research.
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '10px 14px', backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 6, marginBottom: 18, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            
            {/* Email Address / User ID */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                Email Address / User ID
              </label>
              <input 
                type="text" 
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. name@domain.com or IND_TATA_1234"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 4, fontSize: 13, boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#334155' }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: 12, color: '#15803d', textDecoration: 'none', fontWeight: 700 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ width: '100%', padding: '10px 38px 10px 12px', border: '1px solid #cbd5e1', borderRadius: 4, fontSize: 13, boxSizing: 'border-box', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 10, top: 10, background: 'none', border: 0, color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px',
                backgroundColor: '#15803d',
                color: '#ffffff',
                border: 0,
                borderRadius: 4,
                fontWeight: 800,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              {loading ? 'Signing in...' : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* Clean "OR" Separator */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, backgroundColor: '#e2e8f0' }}></div>
            <span style={{ padding: '0 10px', fontSize: 11, fontWeight: 800, color: '#94a3b8' }}>OR</span>
            <div style={{ flex: 1, height: 1, backgroundColor: '#e2e8f0' }}></div>
          </div>

          {/* Registration Link */}
          <div style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
            New to the portal?{' '}
            <Link href="/industry/register" style={{ color: '#15803d', fontWeight: 800, textDecoration: 'none' }}>
              Register now
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '16px 20px', textAlign: 'center', fontSize: 12, color: '#64748b' }}>
        Government of Jharkhand • Janvaani Innovation Initiative • All Rights Reserved
      </footer>

    </div>
  );
}
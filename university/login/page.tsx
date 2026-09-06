'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LOGO_SRC = '/image_19fa0a.jpg';

export default function UniversityLoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post('/api/auth/university-login', {
        userId: userId.trim(),
        password: password.trim()
      });

      if (res.data?.success) {
        // Store logged in session
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        
        // Immediate redirection to University Dashboard
        router.push('/dashboard/university');
      }
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.error || 'Invalid User ID or Password. Please check your official email.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1f2937', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Tricolor Strip */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 5%' }}>
        <div style={{ maxWidth: 1000, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={LOGO_SRC}
              alt="Jharkhand Emblem"
              style={{ width: 48, height: 48, objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
              }}
            />
            <div>
              <div style={{ color: '#0f766e', fontSize: 11, fontWeight: 800 }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: 0, fontSize: 20, color: '#134e4a', fontWeight: 700 }}>University &amp; SPOC Login</h1>
            </div>
          </div>
          <Link href="/" style={{ color: '#0f766e', fontWeight: 700, textDecoration: 'none', fontSize: 13, border: '1px solid #0f766e', padding: '6px 14px', borderRadius: 4 }}>
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Login Box */}
      <main style={{ maxWidth: 440, margin: '50px auto', padding: '0 16px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 10, padding: 32, border: '1px solid #cbd5e1', boxShadow: '0 4px 18px rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <div style={{ display: 'inline-block', padding: '10px 16px', backgroundColor: '#f0fdf4', borderRadius: 8, color: '#0f766e', fontSize: 28, marginBottom: 8 }}>
              🏛️
            </div>
            <h2 style={{ margin: 0, color: '#134e4a', fontFamily: 'Georgia, serif', fontSize: 22 }}>
              SPOC Official Sign In
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b' }}>
              Enter the credentials dispatched to your registered email
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '10px 14px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: 6, marginBottom: 16, fontSize: 13, fontWeight: 700 }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
                SPOC User ID *
              </label>
              <input
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. SPOC_BITM-834002"
                style={{ width: '100%', padding: 11, border: '1px solid #cbd5e1', borderRadius: 5, boxSizing: 'border-box', fontSize: 14 }}
              />
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password received via email"
                style={{ width: '100%', padding: 11, border: '1px solid #cbd5e1', borderRadius: 5, boxSizing: 'border-box', fontSize: 14 }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 12,
                backgroundColor: '#0f766e',
                color: '#ffffff',
                border: 0,
                borderRadius: 5,
                fontWeight: 800,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(15, 118, 110, 0.3)'
              }}
            >
              {isLoading ? 'Verifying Credentials...' : 'Sign In to University Portal →'}
            </button>
          </form>

          <div style={{ marginTop: 22, textAlign: 'center', fontSize: 13, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
            Haven't registered your institution yet?{' '}
            <Link href="/university/register" style={{ color: '#0f766e', fontWeight: 800, textDecoration: 'none' }}>
              Register SPOC Here →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
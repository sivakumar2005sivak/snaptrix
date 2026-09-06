'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '246990150294-rvanecv1corepp1fhf87veg79qms4oo2.apps.googleusercontent.com';

const LOGO_SRC = '/image_19fa0a.jpg';
const GOVT_BG_SRC =
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Helper function to handle role redirection
  const handleRoleRedirect = (role: string) => {
    const userRole = (role || 'public').toLowerCase();
    if (userRole === 'university') {
      router.push('/dashboard/university');
    } else if (userRole === 'industry') {
      router.push('/dashboard/industry');
    } else if (userRole === 'government') {
      router.push('/dashboard/government');
    } else {
      // Default to Public Dashboard for citizen logins
      router.push('/dashboard/public');
    }
  };

  // --- STANDARD EMAIL/PASSWORD LOGIN ---
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!email.trim() || !password.trim()) {
      setMessage('Email Address and Password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', {
        userIdOrEmail: email.trim(),
        password: password.trim(),
      });

      if (response.data.success || response.status === 200) {
        const user = response.data.user;
        setMessage(`Welcome back, ${user?.name || 'Citizen'}! Redirecting to Public Portal...`);

        // Save session locally
        if (typeof window !== 'undefined' && user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        setTimeout(() => {
          handleRoleRedirect(user?.role);
        }, 1000);
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          'Invalid email or password.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- GOOGLE OAUTH LOGIN ---
  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setMessage('Verifying Google sign-in...');

    try {
      const response = await axios.post('/api/auth/google', {
        token: credentialResponse.credential,
      });

      if (response.data.success || response.status === 200) {
        const user = response.data.user;
        setMessage('Google login verified! Redirecting to Public Portal...');

        if (typeof window !== 'undefined' && user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        setTimeout(() => {
          handleRoleRedirect(user?.role);
        }, 1000);
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.error || 'Google authentication failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* Fullscreen Fixed Background with Gradient Overlay */}
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-between p-4 sm:p-6 font-sans relative"
        style={{ backgroundImage: `url(${GOVT_BG_SRC})` }}
      >
        {/* Dark Emerald Backdrop Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#041d0c]/95 via-[#0a3315]/90 to-[#021107]/95 backdrop-blur-[2px]"></div>

        {/* TOP HEADER: Transparent Single-Line Title & Large Logo */}
        <header className="relative z-10 w-full max-w-6xl mx-auto py-4 px-2 flex items-center justify-center">
          <div className="flex items-center justify-center gap-4 flex-wrap text-center">
            <div className="p-1 bg-white rounded-full shadow-lg border-2 border-emerald-500/40 shrink-0">
              <img
                src={LOGO_SRC}
                alt="Government of Jharkhand emblem"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
                }}
              />
            </div>

            <div className="flex items-center justify-center gap-3 whitespace-nowrap overflow-x-auto text-white">
              <span className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-widest text-emerald-300 drop-shadow-md">
                GOVERNMENT OF JHARKHAND
              </span>
              <span className="text-white/40 text-lg font-light">|</span>
              <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-wide uppercase text-white drop-shadow-md">
                JAVAANI PORTAL
              </h1>
            </div>
          </div>
        </header>

        {/* CENTER MAIN CARD */}
        <main className="relative z-10 w-full max-w-md mx-auto my-6">
          <div className="bg-white/95 backdrop-blur-xl w-full p-8 sm:p-9 rounded-3xl shadow-2xl border border-white/40">
            {/* Card Header with Centered Emblem */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="p-2 bg-white rounded-full border-2 border-emerald-600/30 shadow-xl mb-3 ring-4 ring-emerald-50">
                <img
                  src={LOGO_SRC}
                  alt="Government of Jharkhand emblem"
                  className="w-20 h-20 object-contain rounded-full"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
                  }}
                />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-xs text-gray-500 mt-1 max-w-xs font-medium">
                Access challenges, proposals, and collaborative research.
              </p>
            </div>

            {/* Status Message Display */}
            {message && (
              <div
                className={`mb-4 p-3.5 rounded-xl text-xs font-bold text-center border shadow-sm ${
                  message.includes('Welcome') || message.includes('verified') || message.includes('Redirecting')
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                >
                  Email Address / User ID
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="text"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b5e20] focus:border-transparent transition shadow-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="w-full pl-10 pr-11 py-2.5 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b5e20] focus:border-transparent transition shadow-sm"
                  />
                  {/* Eye Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-emerald-700 focus:outline-none p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center text-gray-600 font-medium cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 mr-2 rounded border-gray-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  Remember me
                </label>
                <a
                  href="#forgot"
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 bg-[#1b5e20] hover:bg-[#14532d] text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200 disabled:opacity-70 mt-3 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="bg-white px-3 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  OR
                </span>
                <div className="border-t border-gray-200 w-full"></div>
              </div>

              {/* Google Login Component */}
              <div className="flex justify-center w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setMessage('Google sign-in popup closed or failed.')}
                  theme="outline"
                  size="large"
                  width={400}
                />
              </div>

              <p className="text-center mt-5 text-xs text-gray-600 font-medium">
                New to the portal?{' '}
                <Link
                  href="/register"
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Register now
                </Link>
              </p>
            </form>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="relative z-10 text-center py-2 text-[11px] text-gray-300 font-medium tracking-wide">
          Government of Jharkhand &bull; Janvaani Innovation Initiative &bull; All Rights Reserved
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}
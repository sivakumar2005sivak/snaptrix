'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';

const LOGO_SRC = '/image_19fa0a.jpg';
const GOVT_BG_SRC =
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80';

export default function RegisterPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Form Fields
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Status & Loaders
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mobile OTP States
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);

  // DigiLocker Mock Verification State
  const [isDigilockerVerified, setIsDigilockerVerified] = useState<boolean>(false);
  const [digiLoading, setDigiLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSendOtp = async () => {
    if (mobile.trim().length !== 10) {
      setMessage('சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.');
      return;
    }

    setOtpLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/api/auth/send-otp', {
        mobile: mobile.trim(),
      });

      if (res.data?.success) {
        setOtpSent(true);
        setMessage(res.data.message || 'OTP உங்கள் மொபைல் எண்ணிற்கு அனுப்பப்பட்டது!');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'OTP அனுப்ப முடியவில்லை.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.trim().length !== 6) {
      setMessage('6 இலக்க OTP எண்ணை உள்ளிடவும்.');
      return;
    }

    setOtpLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/api/auth/verify-otp', {
        mobile: mobile.trim(),
        otp: otp.trim(),
      });

      if (res.data?.success) {
        setIsMobileVerified(true);
        setMessage('மொபைல் எண் வெற்றிகரமாக சரிபார்க்கப்பட்டது! ✓');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'தவறான OTP. மீண்டும் சரிபார்க்கவும்.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleDigiLockerVerify = () => {
    setDigiLoading(true);
    setMessage('DigiLocker உடன் இணைக்கப்படுகிறது...');

    setTimeout(() => {
      setIsDigilockerVerified(true);
      setDigiLoading(false);
      setMessage('DigiLocker சரிபார்ப்பு முடிந்தது! (Aadhaar Linked)');
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isMobileVerified) {
      setMessage('முதலில் மொபைல் எண்ணை OTP மூலம் உறுதி செய்யவும்.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('கடவுச்சொற்கள் பொருந்தவில்லை.');
      return;
    }

    if (password.length < 6) {
      setMessage('கடவுச்சொல் குறைந்தபட்சம் 6 எழுத்துகள் இருக்க வேண்டும்.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Sending full_name instead of name
      const response = await axios.post('/api/auth/register', {
        full_name: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        password: password.trim(),
        isMobileVerified: true,
        isDigilockerVerified,
      });

      if (response.data?.success || response.status === 201) {
        setMessage('பதிவு வெற்றிகரமாக முடிந்தது! உள்நுழைவுப் பக்கத்திற்குச் செல்கிறது...');
        setTimeout(() => {
          router.push('/login');
        }, 1200);
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          'பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-between p-4 sm:p-6 font-sans relative"
      style={{ backgroundImage: `url(${GOVT_BG_SRC})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#041d0c]/95 via-[#0a3315]/90 to-[#021107]/95 backdrop-blur-[2px]"></div>

      {/* HEADER */}
      <header className="relative z-10 w-full max-w-6xl mx-auto py-3 px-2 flex items-center justify-center">
        <div className="flex items-center justify-center gap-4 flex-wrap text-center">
          <div className="p-1 bg-white rounded-full shadow-lg border-2 border-emerald-500/40 shrink-0">
            <img
              src={LOGO_SRC}
              alt="Government Emblem"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full"
              onError={(e) => {
                e.currentTarget.src =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-3 whitespace-nowrap overflow-x-auto text-white">
            <span className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest text-emerald-300 drop-shadow-md">
              GOVERNMENT OF JHARKHAND
            </span>
            <span className="text-white/40 text-sm font-light">|</span>
            <h1 className="text-sm sm:text-lg md:text-xl font-black tracking-wide uppercase text-white drop-shadow-md">
              CITIZEN REGISTRATION PORTAL
            </h1>
          </div>
        </div>
      </header>

      {/* REGISTRATION FORM */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-4">
        <div className="bg-white/95 backdrop-blur-xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/40">
          <div className="flex flex-col items-center mb-4 text-center">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Create Citizen Account
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xs font-medium">
              Verified Citizen Access & societal grievance redressal
            </p>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-xl text-xs font-bold text-center border shadow-sm ${
                message.includes('வெற்றிகரமாக') || message.includes('முடிந்தது')
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3" suppressHydrationWarning>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1"
              >
                Full Name (Unique) *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter unique full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                suppressHydrationWarning
                className="w-full px-3.5 py-2 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b5e20] transition shadow-sm"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1"
              >
                Email Address (@gmail.com) *
              </label>
              <input
                id="email"
                type="email"
                placeholder="citizen@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
                className="w-full px-3.5 py-2 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b5e20] transition shadow-sm"
              />
            </div>

            {/* Mobile Number & OTP Verification */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1"
              >
                Mobile Number * {isMobileVerified && <span className="text-emerald-600 font-bold">(Verified ✓)</span>}
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-gray-200 border border-gray-300 rounded-xl text-xs font-bold text-gray-600">
                  +91
                </div>
                <input
                  id="mobile"
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  disabled={isMobileVerified}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  suppressHydrationWarning
                  className="flex-1 px-3.5 py-2 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b5e20] disabled:bg-gray-100 disabled:text-gray-500 transition shadow-sm"
                />
                {!isMobileVerified && (
                  <button
                    type="button"
                    disabled={otpLoading || mobile.trim().length !== 10}
                    onClick={handleSendOtp}
                    suppressHydrationWarning
                    className="px-3 py-2 bg-[#1b5e20] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl transition disabled:opacity-50 cursor-pointer flex items-center shrink-0"
                  >
                    {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : otpSent ? 'Resend' : 'Send OTP'}
                  </button>
                )}
              </div>
            </div>

            {/* OTP Input Box */}
            {otpSent && !isMobileVerified && (
              <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-2xl space-y-2">
                <label className="block text-[11px] font-bold text-emerald-900 uppercase">
                  Enter 6-Digit OTP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    suppressHydrationWarning
                    className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
                  />
                  <button
                    type="button"
                    disabled={otpLoading || otp.trim().length !== 6}
                    onClick={handleVerifyOtp}
                    suppressHydrationWarning
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl disabled:opacity-50 cursor-pointer flex items-center shrink-0"
                  >
                    {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Verify'}
                  </button>
                </div>
              </div>
            )}

            {/* DigiLocker Section */}
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                <div>
                  <h4 className="text-xs font-bold text-blue-900">DigiLocker Identity</h4>
                  <p className="text-[10px] text-blue-600">Aadhaar / Government ID Verification</p>
                </div>
              </div>
              {isDigilockerVerified ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Linked
                </span>
              ) : (
                <button
                  type="button"
                  disabled={digiLoading}
                  onClick={handleDigiLockerVerify}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center"
                >
                  {digiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Verify'}
                </button>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1"
                >
                  Password *
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 chars"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  suppressHydrationWarning
                  className="w-full px-3.5 py-2 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b5e20] transition shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  suppressHydrationWarning
                  className="w-full px-3.5 py-2 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b5e20] transition shadow-sm"
                />
              </div>
            </div>

            {/* Show Password Checkbox */}
            <div className="flex items-center text-xs pt-1">
              <label className="flex items-center text-gray-600 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  suppressHydrationWarning
                  className="w-3.5 h-3.5 mr-2 rounded border-gray-300 text-emerald-700"
                />
                Show password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isMobileVerified}
              suppressHydrationWarning
              className={`w-full flex justify-center items-center py-2.5 px-4 text-white text-sm font-bold rounded-xl shadow-lg transition duration-200 mt-2 ${
                isMobileVerified
                  ? 'bg-[#1b5e20] hover:bg-[#14532d] cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed opacity-75'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : isMobileVerified ? (
                'Create Citizen Account'
              ) : (
                'Verify Mobile Number to Register'
              )}
            </button>

            <p className="text-center mt-3 text-xs text-gray-600 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-700 font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 text-center py-2 text-[11px] text-gray-300 font-medium tracking-wide">
        Government of Jharkhand &bull; Janvaani Innovation Initiative &bull; 2026
      </footer>
    </div>
  );
}
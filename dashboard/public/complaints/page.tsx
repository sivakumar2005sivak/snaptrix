'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  MapPin, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Navigation, 
  FileText, 
  Tag,
  UploadCloud,
  Image as ImageIcon,
  Video,
  FileBadge,
  X,
  Sparkles,
  Zap,
  ShieldAlert
} from 'lucide-react';

const LOGO_SRC = '/image_19fa0a.jpg';
const GOVT_BG_SRC =
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80';

export default function ComplaintsPage() {
  const router = useRouter();

  // Form State Variables
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Water Supply & Sanitation');
  const [description, setDescription] = useState<string>('');
  const [district, setDistrict] = useState<string>('Ranchi');
  const [taluk, setTaluk] = useState<string>('Sadar');
  const [locationAddress, setLocationAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  // AI Classification Feedback States
  const [isAiClassifying, setIsAiClassifying] = useState<boolean>(false);
  const [aiPriority, setAiPriority] = useState<string>('');
  const [aiUrgencyScore, setAiUrgencyScore] = useState<number | null>(null);
  const [aiFeedbackMessage, setAiFeedbackMessage] = useState<string>('');

  // Media Attachment States
  const [mediaBase64, setMediaBase64] = useState<string>('');
  const [mediaType, setMediaType] = useState<'IMAGE' | 'VIDEO' | 'DOCUMENT' | null>(null);
  const [mediaFileName, setMediaFileName] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');

  // Status & Feedback States
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [gpsStatus, setGpsStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'blocked'; text: string } | null>(null);

  // --- TRIGGER AI AUTO-CLASSIFICATION (onBlur) ---
  const triggerAiClassification = async (currentTitle: string, currentDesc: string) => {
    if (!currentTitle.trim() || currentDesc.trim().length < 8) return;

    setIsAiClassifying(true);
    setAiFeedbackMessage('');

    try {
      const res = await axios.post('http://localhost:8000/api/ai/classify-complaint', {
        title: currentTitle.trim(),
        description: currentDesc.trim(),
        district,
        taluk,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        confirmed_dept: category
      });

      if (res.data) {
        if (res.data.predicted_department) setCategory(res.data.predicted_department);
        if (res.data.priority_level) setAiPriority(res.data.priority_level);
        if (res.data.urgency_score !== undefined) setAiUrgencyScore(res.data.urgency_score);
        setAiFeedbackMessage(`AI classified under "${res.data.predicted_department}" with ${res.data.priority_level} Priority.`);
      }
    } catch (err) {
      console.warn('AI engine standby.');
    } finally {
      setIsAiClassifying(false);
    }
  };

  // --- FILE ATTACHMENT HANDLER ---
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setFileError('File size exceeds 15MB limit.');
      e.target.value = '';
      return;
    }

    let detectedType: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | null = null;
    if (file.type.startsWith('image/')) detectedType = 'IMAGE';
    else if (file.type.startsWith('video/')) detectedType = 'VIDEO';
    else if (file.type === 'application/pdf') detectedType = 'DOCUMENT';
    else {
      setFileError('Only JPG, PNG, MP4, or PDF allowed.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMediaBase64(reader.result as string);
      setMediaFileName(file.name);
      setMediaType(detectedType);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setMediaBase64('');
    setMediaType(null);
    setMediaFileName('');
    setFileError('');
  };

  // --- GPS GEOLOCATION HANDLER ---
  const handleGetLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Geolocation not supported.');
      return;
    }

    setIsGpsLoading(true);
    setGpsStatus('Acquiring precise GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat.toFixed(6));
        setLongitude(lon.toFixed(6));
        setGpsStatus(`GPS Locked: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
        setIsGpsLoading(false);

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const geoData = await geoRes.json();
          if (geoData?.display_name) {
            setLocationAddress(geoData.display_name);
          }
        } catch (e) {
          console.warn('Reverse geocode error:', e);
        }
      },
      (error) => {
        setIsGpsLoading(false);
        setGpsStatus('GPS permission denied or timeout.');
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  // --- FORM SUBMIT WITH STRICT AI DUPLICATE INTERCEPTION ---
  const handleSubmitComplaint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!title.trim() || !description.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in both title and description.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. DIRECT AI HARD DUPLICATE VALIDATION (TEXT + GPS + DISTRICT)
      try {
        const checkRes = await axios.post('http://localhost:8000/api/ai/check-duplicate', {
          title: title.trim(),
          description: description.trim(),
          district: district,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null
        });

        // Duplicate match aana udane submit aagathu!
        if (checkRes.data?.can_submit === false || checkRes.data?.is_duplicate === true) {
          setStatusMessage({
            type: 'blocked',
            text: checkRes.data.message || 'BLOCKED: An identical complaint already exists in this exact location.'
          });
          setIsSubmitting(false);
          return; // STOP! MySQL-kkum SQLite-kkum pogaathu!
        }
      } catch (aiErr) {
        console.warn('AI duplicate engine offline, proceeding with warning:', aiErr);
      }

      // 2. ONLY IF UNIQUE -> SUBMIT TO DATABASE
      let loggedUser = null;
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('portal_user') || localStorage.getItem('currentUser');
        if (stored) loggedUser = JSON.parse(stored);
      }

      const payload = {
        title: title.trim(),
        category,
        description: description.trim(),
        district,
        taluk,
        locationAddress: locationAddress.trim(),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        aiPriority: aiPriority || 'Normal',
        aiUrgencyScore: aiUrgencyScore || 0.4,
        userId: loggedUser?.id || null,
        userEmail: loggedUser?.email || null,
        mediaBase64: mediaBase64 || null,
        mediaType: mediaType || null,
        mediaFileName: mediaFileName || null
      };

      const res = await axios.post('/api/complaints/create', payload);

      if (res.data?.success || res.status === 201 || res.status === 200) {
        setStatusMessage({
          type: 'success',
          text: 'Verified unique grievance registered successfully! Redirecting...',
        });

        setTimeout(() => {
          router.push('/dashboard/public');
        }, 1500);
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.error || 'Failed to submit grievance. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              CITIZEN GRIEVANCE REGISTRATION
            </h1>
          </div>
        </div>
      </header>

      {/* MAIN CARD */}
      <main className="relative z-10 w-full max-w-2xl mx-auto my-4">
        <div className="bg-white/95 backdrop-blur-xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/40">
          <div className="flex flex-col items-center mb-6 text-center">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Register a Public Grievance
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-md font-medium">
              Real-time AI geospatial validation blocks duplicate submissions in identical locations.
            </p>
          </div>

          {/* STATUS NOTIFICATIONS */}
          {statusMessage && (
            <div
              className={`mb-5 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 border shadow-sm ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : statusMessage.type === 'blocked'
                  ? 'bg-amber-50 text-amber-950 border-amber-400 font-extrabold'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {statusMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />}
              {statusMessage.type === 'blocked' && <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600" />}
              {statusMessage.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmitComplaint} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Grievance Title *
              </label>
              <div className="relative flex items-center">
                <FileText className="w-4 h-4 absolute left-3.5 text-gray-400" />
                <input
                  id="title"
                  type="text"
                  required
                  placeholder="e.g. Main road pipe leak"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  onBlur={() => triggerAiClassification(title, description)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b5e20] transition shadow-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="description" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  Detailed Description *
                </label>
                {isAiClassifying && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 animate-pulse">
                    <Sparkles className="w-3 h-3" /> Evaluating with AI...
                  </span>
                )}
              </div>
              <textarea
                id="description"
                rows={3}
                required
                placeholder="Explain the problem clearly, street, severity, and duration..."
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                onBlur={() => triggerAiClassification(title, description)}
                className="w-full p-3 bg-gray-50/60 border border-gray-300 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b5e20] transition shadow-sm"
              ></textarea>
            </div>

            {/* AI Insights Bar */}
            {(aiPriority || aiFeedbackMessage) && (
              <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-900">AI Recommendation:</span>
                    <p className="text-[11px] text-emerald-800">{aiFeedbackMessage}</p>
                  </div>
                </div>
                {aiPriority && (
                  <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] tracking-wider uppercase ${
                    aiPriority.toLowerCase().includes('high')
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {aiPriority} Priority
                  </span>
                )}
              </div>
            )}

            {/* Department, District, Taluk */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="category" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Department *
                </label>
                <div className="relative flex items-center">
                  <Tag className="w-4 h-4 absolute left-3.5 text-gray-400" />
                  <select
                    id="category"
                    value={category}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-2 py-2.5 bg-gray-50/60 border border-gray-300 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
                  >
                    <option value="Water Supply & Sanitation">Water Supply & Sanitation</option>
                    <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                    <option value="Electricity & Power">Electricity & Power</option>
                    <option value="Public Health & Waste">Public Health & Sanitation</option>
                    <option value="Revenue & Land Administration">Revenue & Land Administration</option>
                    <option value="Higher Education & Student Affairs">University Affairs</option>
                    <option value="Pollution & Hazardous Waste">Industrial Pollution</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="district" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  District *
                </label>
                <select
                  id="district"
                  value={district}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50/60 border border-gray-300 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
                >
                  <option value="Ranchi">Ranchi</option>
                  <option value="Dhanbad">Dhanbad</option>
                  <option value="East Singhbhum">East Singhbhum</option>
                  <option value="Bokaro">Bokaro</option>
                  <option value="Hazaribagh">Hazaribagh</option>
                </select>
              </div>

              <div>
                <label htmlFor="taluk" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Taluk / Block *
                </label>
                <input
                  id="taluk"
                  type="text"
                  required
                  placeholder="e.g. Sadar"
                  value={taluk}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTaluk(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50/60 border border-gray-300 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
                />
              </div>
            </div>

            {/* Evidence File Upload */}
            <div className="bg-gray-50/80 border border-gray-200 p-4 rounded-2xl">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Upload Evidence (Photo, Video, or PDF)</span>
                <span className="text-[10px] text-gray-400 normal-case font-normal">Max: 15MB</span>
              </label>

              {!mediaFileName ? (
                <div className="border-2 border-dashed border-gray-300 hover:border-emerald-600 rounded-xl p-4 text-center cursor-pointer transition bg-white/70">
                  <input
                    type="file"
                    id="mediaUpload"
                    accept="image/*,video/mp4,video/webm,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="mediaUpload" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud className="w-7 h-7 text-emerald-700 mb-1" />
                    <span className="text-xs font-bold text-gray-700">Click to upload photo, video, or PDF</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">Supports JPG, PNG, MP4, PDF</span>
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white border border-emerald-300 p-2.5 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {mediaType === 'IMAGE' && <ImageIcon className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {mediaType === 'VIDEO' && <Video className="w-5 h-5 text-purple-600 shrink-0" />}
                    {mediaType === 'DOCUMENT' && <FileBadge className="w-5 h-5 text-blue-600 shrink-0" />}
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-800 truncate">{mediaFileName}</p>
                      <span className="text-[10px] font-semibold text-emerald-700">{mediaType} ATTACHED</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 text-gray-400 hover:text-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {mediaType === 'IMAGE' && mediaBase64 && (
                <div className="mt-2.5">
                  <img
                    src={mediaBase64}
                    alt="Preview"
                    className="w-full max-h-36 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              )}

              {fileError && <p className="text-[11px] text-red-600 font-semibold mt-1.5">{fileError}</p>}
            </div>

            {/* GPS Location Section */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  Geotag Location (GPS)
                </span>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGpsLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1b5e20] hover:bg-[#14532d] text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-60 cursor-pointer"
                >
                  {isGpsLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Fetching GPS...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3.5 h-3.5" /> Auto-Detect GPS
                    </>
                  )}
                </button>
              </div>

              {gpsStatus && <p className="text-[11px] text-emerald-800 font-medium mb-2.5">{gpsStatus}</p>}

              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  readOnly
                  placeholder="Latitude"
                  value={latitude ? `Lat: ${latitude}` : ''}
                  className="w-full px-3 py-1.5 text-xs bg-white/80 border border-emerald-300/80 rounded-lg text-gray-700 outline-none"
                />
                <input
                  type="text"
                  readOnly
                  placeholder="Longitude"
                  value={longitude ? `Long: ${longitude}` : ''}
                  className="w-full px-3 py-1.5 text-xs bg-white/80 border border-emerald-300/80 rounded-lg text-gray-700 outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Village / Landmark / Street Address"
                value={locationAddress}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationAddress(e.target.value)}
                className="w-full px-3 py-2 bg-white/90 border border-emerald-300 rounded-lg text-xs text-gray-800 outline-none focus:ring-1 focus:ring-[#1b5e20]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 bg-[#1b5e20] hover:bg-[#14532d] text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200 disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Submit Grievance
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link href="/dashboard/public" className="text-xs text-emerald-800 font-semibold hover:underline">
                ← Back to Citizen Dashboard
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 text-center py-2 text-[11px] text-gray-300 font-medium tracking-wide">
        Government of Jharkhand &bull; Societal Innovation Grievance Cell &bull; 2026
      </footer>
    </div>
  );
}
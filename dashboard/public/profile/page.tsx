'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  FileText, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileBadge, 
  Video, 
  Image as ImageIcon,
  ExternalLink,
  Award,
  ShieldCheck,
  Sparkles,
  X,
  Play
} from 'lucide-react';

const LOGO_SRC = '/image_19fa0a.jpg';

export default function CitizenProfilePage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'complaints' | 'settings'>('overview');

  // Interactive Media Modal State (Image / Video player)
  const [activeMediaModal, setActiveMediaModal] = useState<{
    url: string;
    type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    name: string;
  } | null>(null);

  // AI Civic Analytics States
  const [civicScore, setCivicScore] = useState<number | null>(null);
  const [reputationTier, setReputationTier] = useState<string>('New Citizen');

  // Editable Profile State
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [district, setDistrict] = useState<string>('Ranchi');
  const [saveNotice, setSaveNotice] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser') || localStorage.getItem('portal_user');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          setCurrentUser(user);
          setName(user.name || user.full_name || '');
          setMobile(user.mobile || user.phone_number || '');
          setAddress(user.address || '');
          setDistrict(user.district || 'Ranchi');
          fetchUserComplaints(user.email, user.id, user);
        } catch (e) {
          console.error(e);
        }
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    }
  }, [router]);

  const fetchUserComplaints = async (email?: string, userId?: string | number, userObj?: any) => {
    if (!email && !userId) return;
    try {
      const res = await axios.get('/api/complaints/my-complaints', {
        params: {
          email: email || '',
          userId: userId || ''
        }
      });
      if (res.data?.success) {
        const fetchedComplaints = res.data.complaints || [];
        setComplaints(fetchedComplaints);
        fetchAiProfileAnalytics(userObj?.id || userId, fetchedComplaints);
      }
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  const fetchAiProfileAnalytics = async (uid: string | number, allComplaints: any[]) => {
    const totalFiled = allComplaints.length;
    const resolved = allComplaints.filter((c) => (c.status || '').toLowerCase().includes('resolve')).length;
    const rejected = allComplaints.filter((c) => (c.status || '').toLowerCase().includes('reject')).length;

    try {
      const res = await axios.post('http://localhost:8000/api/ai/profile-analytics', {
        user_id: Number(uid) || 1,
        total_filed: totalFiled,
        resolved: resolved,
        rejected: rejected
      });

      if (res.data) {
        setCivicScore(res.data.civic_score);
        setReputationTier(res.data.reputation_tier || 'Active Contributor');
      }
    } catch (error) {
      const base = totalFiled === 0 ? 100 : Math.round(((totalFiled - rejected) / totalFiled) * 70 + (resolved / totalFiled) * 30);
      setCivicScore(base);
      setReputationTier(base >= 80 ? 'Champion Citizen' : base >= 50 ? 'Active Contributor' : 'Standard Citizen');
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      const res = await axios.put('/api/profile', {
        id: currentUser.id,
        name,
        mobile,
        district,
        address
      });
      if (res.data?.success) {
        const updated = { ...currentUser, ...res.data.user };
        localStorage.setItem('currentUser', JSON.stringify(updated));
        setCurrentUser(updated);
        setSaveNotice('Profile saved to database successfully!');
        setTimeout(() => setSaveNotice(''), 3000);
      }
    } catch (err: any) {
      setSaveNotice(err.response?.data?.error || 'Failed to save profile.');
      setTimeout(() => setSaveNotice(''), 3000);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('portal_user');
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor: '#f7f7f2' }}>
        <p style={{ color: '#165d36', fontWeight: 700 }}>Loading Citizen Profile...</p>
      </div>
    );
  }

  const userInitial = (name || currentUser?.name || currentUser?.full_name || 'U').trim().charAt(0).toUpperCase();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f2', color: '#1f2937', fontFamily: 'Inter, Arial, sans-serif' }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: '#3b2a1a', color: '#fff8dd', padding: '8px 5%', textAlign: 'center', fontSize: 13, fontWeight: 700 }}>
        GOVERNMENT OF JHARKHAND &bull; CITIZEN PROFILE & GRIEVANCE CONTROL DESK
      </div>

      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #d1d5db', padding: '14px 5%' }}>
        <div style={{ maxWidth: 1100, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={LOGO_SRC}
              alt="Jharkhand Emblem"
              style={{ width: 50, height: 50, objectFit: 'contain', borderRadius: '50%' }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
              }}
            />
            <div>
              <small style={{ color: '#165d36', fontWeight: 800, fontSize: 11 }}>GOVERNMENT OF JHARKHAND</small>
              <h1 style={{ margin: 0, fontSize: 20, color: '#165d36', fontWeight: 700 }}>Citizen Profile</h1>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {/* Direct Link to the District Map Page */}

            <Link
              href="/dashboard/public"
              style={{
                padding: '9px 16px',
                backgroundColor: '#165d36',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700
              }}
            >
              ← Back to Portal
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: '9px 16px',
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: 1100, margin: '30px auto', padding: '0 16px 50px' }}>
        
        {/* User Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '24px 30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 24
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: '#165d36',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 30,
                fontWeight: 900
              }}
            >
              {userInitial}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, color: '#111827' }}>
                {name || currentUser?.name || currentUser?.full_name || 'Citizen User'}
              </h2>
              <p style={{ margin: '4px 0', fontSize: 14, color: '#6b7280' }}>{currentUser?.email}</p>
              
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: '#eaf3eb',
                    color: '#165d36',
                    border: '1px solid #8fb49b'
                  }}
                >
                  Role: {currentUser?.role || 'Citizen'}
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 800,
                    backgroundColor: reputationTier.includes('Champion') ? '#fef3c7' : '#e0f2fe',
                    color: reputationTier.includes('Champion') ? '#92400e' : '#0369a1',
                    border: reputationTier.includes('Champion') ? '1px solid #fcd34d' : '1px solid #bae6fd'
                  }}
                >
                  <Award size={13} /> {reputationTier}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', padding: '12px 20px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <b style={{ fontSize: 24, color: '#165d36', display: 'block' }}>{complaints.length}</b>
              <span style={{ fontSize: 12, color: '#64748b' }}>Complaints Filed</span>
            </div>
            
            <div style={{ textAlign: 'center', padding: '12px 20px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <b style={{ fontSize: 24, color: '#0284c7', display: 'block' }}>
                {complaints.filter((c) => (c.status || '').toLowerCase().includes('resolve')).length}
              </b>
              <span style={{ fontSize: 12, color: '#64748b' }}>Resolved</span>
            </div>

            <div style={{ textAlign: 'center', padding: '12px 20px', background: '#ecfdf5', borderRadius: 8, border: '1px solid #a7f3d0' }}>
              <b style={{ fontSize: 24, color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Sparkles size={16} /> {civicScore !== null ? `${civicScore}/100` : '--'}
              </b>
              <span style={{ fontSize: 12, color: '#065f46', fontWeight: 600 }}>Civic Trust Score</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 10, borderBottom: '2px solid #e5e7eb', marginBottom: 24 }}>
          {[
            { id: 'overview', label: 'Overview & Details' },
            { id: 'complaints', label: `My Complaints (${complaints.length})` },
            { id: 'settings', label: 'Edit Information' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #165d36' : '3px solid transparent',
                backgroundColor: 'transparent',
                color: activeTab === tab.id ? '#165d36' : '#6b7280',
                fontWeight: activeTab === tab.id ? 800 : 600,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 10, border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 16px', color: '#165d36', fontSize: 17 }}>Citizen Identification</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                <div><span style={{ color: '#6b7280' }}>Full Name:</span> <strong>{name || 'Not provided'}</strong></div>
                <div><span style={{ color: '#6b7280' }}>Email Address:</span> <strong>{currentUser?.email}</strong></div>
                <div><span style={{ color: '#6b7280' }}>Mobile Contact:</span> <strong>{mobile || 'Not linked'}</strong></div>
                <div><span style={{ color: '#6b7280' }}>Registered District:</span> <strong>{district}</strong></div>
                <div><span style={{ color: '#6b7280' }}>Residential Address:</span> <strong>{address || 'Not specified'}</strong></div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 10, border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 16px', color: '#165d36', fontSize: 17 }}>Geospatial Services</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  href="/dashboard/public/district-map"
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: 6,
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 14
                  }}
                >
                  🗺️ View District Grievance Map
                </Link>
                <Link
                  href="/dashboard/public/complaints"
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#165d36',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: 6,
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 14
                  }}
                >
                  + File a New Complaint
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Complaints with Media Viewer & Video Player */}
        {activeTab === 'complaints' && (
          <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 10, border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, color: '#165d36', fontSize: 17 }}>All Submitted Issues ({complaints.length})</h3>
              <Link
                href="/dashboard/public/complaints"
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#165d36',
                  color: '#fff',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                + Register New
              </Link>
            </div>

            {complaints.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {complaints.map((item, idx) => {
                  const mediaUrl = item.media_url || item.mediaBase64;
                  const mediaType = (item.media_type || item.mediaType || 'IMAGE').toUpperCase();
                  const mediaName = item.media_filename || item.mediaFileName || 'Attached Proof';

                  return (
                    <div
                      key={item.id || idx}
                      style={{
                        padding: '18px',
                        borderRadius: 10,
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#f8fafc'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontWeight: 800, color: '#165d36', fontSize: 16 }}>
                          {item.title || `Grievance #${item.id}`}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: 4,
                            backgroundColor: (item.status || '').toLowerCase().includes('resolve') ? '#dcfce7' : '#e0f2fe',
                            color: (item.status || '').toLowerCase().includes('resolve') ? '#166534' : '#0369a1'
                          }}
                        >
                          {item.status || 'Submitted'}
                        </span>
                      </div>

                      <div style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                        {item.district || 'Jharkhand'} &bull; <span style={{ color: '#64748b' }}>{item.category || 'General'}</span>
                      </div>

                      <div style={{ fontSize: 12, color: '#64748b', margin: '4px 0' }}>
                        📍 {item.location_address || item.location || 'Location Not Specified'}
                        {item.latitude && item.longitude ? ` (GPS: ${item.latitude}, ${item.longitude})` : ''}
                      </div>

                      <p style={{ margin: '8px 0 14px', fontSize: 14, color: '#1e293b', lineHeight: 1.5 }}>
                        {item.description || item.details}
                      </p>

                      {/* Attached Media Action Block */}
                      {mediaUrl && (
                        <div style={{ backgroundColor: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {mediaType === 'IMAGE' && <ImageIcon size={20} color="#16a34a" />}
                            {mediaType === 'VIDEO' && <Video size={20} color="#9333ea" />}
                            {mediaType === 'DOCUMENT' && <FileText size={20} color="#0284c7" />}
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                              {mediaName} ({mediaType})
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveMediaModal({ url: mediaUrl, type: mediaType as any, name: mediaName })}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '6px 14px',
                              backgroundColor: mediaType === 'VIDEO' ? '#7e22ce' : '#165d36',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {mediaType === 'VIDEO' ? <Play size={14} /> : <ExternalLink size={14} />}
                            {mediaType === 'VIDEO' ? 'Watch Video' : 'View Full Media'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                <p>No complaints have been filed by your account yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Settings */}
        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#fff', padding: 28, borderRadius: 10, border: '1px solid #e5e7eb', maxWidth: 640 }}>
            <h3 style={{ margin: '0 0 16px', color: '#165d36', fontSize: 17 }}>Update Citizen Details</h3>

            {saveNotice && (
              <div style={{ padding: '10px 14px', backgroundColor: '#eaf3eb', color: '#165d36', borderRadius: 6, marginBottom: 16, fontWeight: 700, fontSize: 13 }}>
                {saveNotice}
              </div>
            )}

            <form onSubmit={handleProfileSave}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Full Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '11px', border: '1px solid #cbd5cc', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  style={{ width: '100%', padding: '11px', border: '1px solid #cbd5cc', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  style={{ width: '100%', padding: '11px', border: '1px solid #cbd5cc', borderRadius: 6, fontSize: 14, backgroundColor: '#fff', boxSizing: 'border-box' }}
                >
                  {['Ranchi', 'Dhanbad', 'Jamshedpur', 'Deoghar', 'Bokaro', 'Hazaribagh', 'Giridih', 'Dumka', 'Palamu'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Residential Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: '100%', padding: '11px', border: '1px solid #cbd5cc', borderRadius: 6, fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#165d36',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}
      </main>

      {/* FULLSCREEN POPUP MEDIA PLAYER MODAL */}
      {activeMediaModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: 20
          }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: 800, backgroundColor: '#111827', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid #374151', color: '#fff' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{activeMediaModal.name}</span>
              <button
                onClick={() => setActiveMediaModal(null)}
                style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Media Body */}
            <div style={{ padding: 16, display: 'grid', placeItems: 'center', minHeight: 300, backgroundColor: '#000000' }}>
              {activeMediaModal.type === 'IMAGE' && (
                <img
                  src={activeMediaModal.url}
                  alt={activeMediaModal.name}
                  style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                />
              )}

              {activeMediaModal.type === 'VIDEO' && (
                <video
                  controls
                  autoPlay
                  src={activeMediaModal.url}
                  style={{ width: '100%', maxHeight: '70vh', outline: 'none' }}
                >
                  Your browser does not support playing this video.
                </video>
              )}

              {activeMediaModal.type === 'DOCUMENT' && (
                <iframe
                  src={activeMediaModal.url}
                  title={activeMediaModal.name}
                  style={{ width: '100%', height: '65vh', border: 'none' }}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '10px 18px', textAlign: 'right', borderTop: '1px solid #374151', backgroundColor: '#1f2937' }}>
              <a
                href={activeMediaModal.url}
                download={activeMediaModal.name}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#38bdf8', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}
              >
                Download File Original ⤓
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
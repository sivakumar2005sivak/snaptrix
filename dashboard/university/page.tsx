'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Clock,
  Users,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  AlertCircle,
  Coins,
  LogOut,
  UserCheck,
  Calendar,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const LOGO_SRC = '/image_19fa0a.jpg';

export default function UniversityDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Controls
  const [activeModal, setActiveModal] = useState<'TEAM' | 'PROTOTYPE' | 'CONSENT' | 'DOSSIER' | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  // Form States
  const [teamName, setTeamName] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadRoll, setLeadRoll] = useState('');
  const [facultyMentor, setFacultyMentor] = useState('');
  const [mentorDesignation, setMentorDesignation] = useState('Associate Professor');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [techStack, setTechStack] = useState('');

  const [protoTitle, setProtoTitle] = useState('');
  const [protoDesc, setProtoDesc] = useState('');
  const [protoLink, setProtoLink] = useState('');
  const [consentFeedback, setConsentFeedback] = useState('');
  const [dossierPdf, setDossierPdf] = useState('JH_Innovation_Dossier_2026.pdf');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user.role !== 'university') {
            router.push('/login');
          } else {
            setCurrentUser(user);
            fetchUniversityComplaints(user.collegeCode || 'BITM-834002');
          }
        } catch {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  const fetchUniversityComplaints = async (code: string) => {
    try {
      const res = await axios.get(`/api/university/lifecycle?universityCode=${code}`);
      if (res.data?.success && res.data.complaints.length > 0) {
        setComplaints(res.data.complaints);
      } else {
        // Sample University Routed Complaints
        setComplaints([
          {
            id: 1,
            complaint_code: 'JH-2026-0891',
            title: 'Canal water flow telemetry & block detection near Bedo fields',
            description: 'Canal silt and debris prevent irrigation to 200 acres during summer.',
            category: 'Water Resources & Canal Systems',
            district: 'Ranchi',
            location: 'Bedo Block, Ward 4',
            citizen_name: 'Suresh Mahato',
            citizen_phone: '+91 94311 XXXXX',
            assigned_university_code: code,
            stage: 'ASSIGNED',
            remaining_days: 20
          },
          {
            id: 2,
            complaint_code: 'JH-2026-0742',
            title: 'Maize leaf blight rapid spread detection via Edge AI & ESP32-CAM',
            description: 'Early fungal infection in tribal farm clusters needs mobile camera diagnosis.',
            category: 'Smart Agriculture & Crop Health',
            district: 'Ranchi',
            location: 'Mandar Block',
            citizen_name: 'Birsa Oraon',
            citizen_phone: '+91 98351 XXXXX',
            assigned_university_code: code,
            stage: 'TEAM_ALLOCATED',
            team_name: 'Team AgroVision',
            lead_name: 'Priya Sharma',
            faculty_mentor: 'Dr. M. Verma',
            remaining_days: 17
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // SIGN OUT TO MAIN HOME PAGE (/)
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const handleStageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let action = '';
    let payload = {};

    if (activeModal === 'TEAM') {
      action = 'ALLOCATE_TEAM';
      payload = { teamName, leadName, leadRoll, facultyMentor, mentorDesignation, department, techStack };
    } else if (activeModal === 'PROTOTYPE') {
      action = 'UPLOAD_PROTOTYPE';
      payload = { prototypeTitle: protoTitle, prototypeDesc: protoDesc, photoUrl: 'prototype_working.png', videoDemoLink: protoLink };
    } else if (activeModal === 'CONSENT') {
      action = 'UPLOAD_CONSENT';
      payload = { citizenSatisfiedStatus: 'SATISFIED', consentFilePath: 'signed_citizen_consent.pdf', citizenFeedback: consentFeedback };
    } else if (activeModal === 'DOSSIER') {
      action = 'SUBMIT_DOSSIER';
      payload = { finalDossierPdf: dossierPdf };
    }

    try {
      await axios.post('/api/university/lifecycle', {
        action,
        complaintId: selectedComplaint.id,
        payload
      });

      const updated = complaints.map((c) => {
        if (c.id === selectedComplaint.id) {
          if (activeModal === 'TEAM') return { ...c, stage: 'TEAM_ALLOCATED', team_name: teamName, lead_name: leadName };
          if (activeModal === 'PROTOTYPE') return { ...c, stage: 'PROTOTYPE_READY', prototype_title: protoTitle };
          if (activeModal === 'CONSENT') return { ...c, stage: 'CITIZEN_CONSENTED' };
          if (activeModal === 'DOSSIER') return { ...c, stage: 'FUNDING_DISPATCHED', funding_status: 'DISPATCHED_TOMORROW' };
        }
        return c;
      });
      setComplaints(updated);
      setActiveModal(null);
    } catch (err: any) {
      alert('Error updating stage: ' + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !currentUser) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', color: '#1f2937', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)' }}></div>

      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 5%' }}>
        <div style={{ maxWidth: 1200, margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={LOGO_SRC} alt="Emblem" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            <div>
              <div style={{ color: '#0f766e', fontSize: 11, fontWeight: 800 }}>GOVERNMENT OF JHARKHAND</div>
              <h1 style={{ margin: 0, fontSize: 18, color: '#134e4a', fontWeight: 700 }}>
                {currentUser.college || 'Janvaani R&D Portal'} &bull; 20-Day Problem Lifecycle Desk
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link
              href="/dashboard/university/profile"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', backgroundColor: '#0f766e', color: '#fff', borderRadius: 4, fontWeight: 700, fontSize: 12, textDecoration: 'none' }}
            >
              <UserCheck size={14} /> View SPOC Profile
            </Link>
            
            {/* SIGN OUT TO HOME PAGE (/) */}
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: 4, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px 60px' }}>
        
        {/* Pipeline Summary */}
        <div style={{ backgroundColor: '#134e4a', color: '#fff', borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontFamily: 'Georgia, serif' }}>
              Institutional 20-Day Problem Resolution Pipeline
            </h2>
            <span style={{ fontSize: 11, fontWeight: 800, backgroundColor: '#86efac', color: '#064e3b', padding: '3px 10px', borderRadius: 4 }}>
              Mandatory NEP 2020 Protocol
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 6, borderLeft: '3px solid #f59e0b' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#fcd34d' }}>Stage 1 (Days 1–3)</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>R&amp;D Team Allocation</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 6, borderLeft: '3px solid #38bdf8' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#7dd3fc' }}>Stage 2 (By Day 10)</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Prototype Proof Upload</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 6, borderLeft: '3px solid #c084fc' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#d8b4fe' }}>Stage 3 (By Day 15)</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Citizen Consent Validation</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 6, borderLeft: '3px solid #4ade80' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#86efac' }}>Stage 4 (Day 16–20)</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Final Dossier &amp; Funding</div>
            </div>
          </div>
        </div>

        {/* Dynamic Project Cards */}
        <h3 style={{ margin: '0 0 16px', color: '#134e4a', fontSize: 17 }}>
          Live Citizen Complaints Assigned to Your University ({complaints.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {complaints.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 22, border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#0f766e', fontFamily: 'monospace', backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: 4 }}>
                      {item.complaint_code}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>
                      📍 {item.district} ({item.location}) &bull; Domain: <strong>{item.category}</strong>
                    </span>
                  </div>
                  <h4 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>{item.title}</h4>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4b5563', lineHeight: 1.5 }}>{item.description}</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 800 }}>
                    <Clock size={14} /> Total Duration: 20 Days ({item.remaining_days} days left)
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                    Citizen: <strong>{item.citizen_name}</strong> ({item.citizen_phone})
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ backgroundColor: '#f8fafc', padding: 14, borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                  
                  <button
                    onClick={() => { setSelectedComplaint(item); setActiveModal('TEAM'); }}
                    style={{
                      padding: 10,
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      border: '1px solid #cbd5e1',
                      backgroundColor: item.stage !== 'ASSIGNED' ? '#f0fdf4' : '#0f766e',
                      color: item.stage !== 'ASSIGNED' ? '#166534' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    {item.stage !== 'ASSIGNED' ? '✓ 1. Team Allocated (3D)' : '👉 1. Allocate Team (3D)'}
                  </button>

                  <button
                    disabled={item.stage === 'ASSIGNED'}
                    onClick={() => { setSelectedComplaint(item); setActiveModal('PROTOTYPE'); }}
                    style={{
                      padding: 10,
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      border: '1px solid #cbd5e1',
                      backgroundColor: ['PROTOTYPE_READY', 'CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? '#f0fdf4' : item.stage === 'TEAM_ALLOCATED' ? '#0284c7' : '#f1f5f9',
                      color: ['PROTOTYPE_READY', 'CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? '#166534' : item.stage === 'TEAM_ALLOCATED' ? '#fff' : '#94a3b8',
                      cursor: item.stage === 'ASSIGNED' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {['PROTOTYPE_READY', 'CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? '✓ 2. Prototype Done (10D)' : '👉 2. Upload Prototype (10D)'}
                  </button>

                  <button
                    disabled={!['PROTOTYPE_READY', 'CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage)}
                    onClick={() => { setSelectedComplaint(item); setActiveModal('CONSENT'); }}
                    style={{
                      padding: 10,
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      border: '1px solid #cbd5e1',
                      backgroundColor: ['CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? '#f0fdf4' : item.stage === 'PROTOTYPE_READY' ? '#9333ea' : '#f1f5f9',
                      color: ['CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? '#166534' : item.stage === 'PROTOTYPE_READY' ? '#fff' : '#94a3b8',
                      cursor: !['PROTOTYPE_READY', 'CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {['CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? '✓ 3. Consent Verified (15D)' : '👉 3. Citizen Consent (15D)'}
                  </button>

                  <button
                    disabled={!['CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage)}
                    onClick={() => { setSelectedComplaint(item); setActiveModal('DOSSIER'); }}
                    style={{
                      padding: 10,
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      border: '1px solid #cbd5e1',
                      backgroundColor: item.stage === 'FUNDING_DISPATCHED' ? '#16a34a' : item.stage === 'CITIZEN_CONSENTED' ? '#d97706' : '#f1f5f9',
                      color: ['CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? '#fff' : '#94a3b8',
                      cursor: !['CITIZEN_CONSENTED', 'FUNDING_DISPATCHED'].includes(item.stage) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {item.stage === 'FUNDING_DISPATCHED' ? '✓ 4. Verified & Approved' : '👉 4. Day 16 Dossier'}
                  </button>
                </div>
              </div>

              {/* Funding Notification */}
              {item.stage === 'FUNDING_DISPATCHED' && (
                <div style={{ backgroundColor: '#ecfdf5', border: '2px dashed #10b981', padding: 14, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 24 }}>💰</div>
                  <div>
                    <h5 style={{ margin: 0, color: '#065f46', fontSize: 14, fontWeight: 900 }}>
                      All Documentation &amp; Solution Validated Successfully!
                    </h5>
                    <p style={{ margin: '2px 0 0', color: '#047857', fontSize: 13, fontWeight: 700 }}>
                      🔔 Official Notice: <u>State Innovation Prototyping Funding will be shared tomorrow</u> directly to the college R&amp;D account.
                    </p>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </main>

      {/* Modals for Form Input */}
      {activeModal === 'TEAM' && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 16 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 24, width: 'min(90vw, 500px)' }}>
            <h3 style={{ margin: '0 0 6px', color: '#134e4a', fontSize: 17 }}>Stage 1: Fill Student R&amp;D Team (3-Day Limit)</h3>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: '#64748b' }}>Allocate students &amp; faculty mentor to ticket {selectedComplaint.complaint_code}</p>

            <form onSubmit={handleStageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="text" required placeholder="Team Name (e.g. Team AgroVision)" value={teamName} onChange={(e) => setTeamName(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />
              <input type="text" required placeholder="Student Lead Name (e.g. Priya Sharma)" value={leadName} onChange={(e) => setLeadName(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />
              <input type="text" required placeholder="Lead Roll Number (e.g. 22CSE045)" value={leadRoll} onChange={(e) => setLeadRoll(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />
              <input type="text" required placeholder="Faculty Mentor (e.g. Dr. M. Verma)" value={facultyMentor} onChange={(e) => setFacultyMentor(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />
              <input type="text" required placeholder="Proposed Hardware / Tech Stack (e.g. ESP32, Python)" value={techStack} onChange={(e) => setTechStack(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />
              
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, padding: 10, border: '1px solid #cbd5e1', borderRadius: 4 }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ flex: 1, padding: 10, backgroundColor: '#0f766e', color: '#fff', border: 0, borderRadius: 4, fontWeight: 800 }}>
                  {submitting ? 'Saving...' : 'Save Team to DB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'PROTOTYPE' && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 16 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 24, width: 'min(90vw, 500px)' }}>
            <h3 style={{ margin: '0 0 6px', color: '#0284c7', fontSize: 17 }}>Stage 2: Upload Prototype Proof (10-Day Target)</h3>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: '#64748b' }}>Submit the working prototype photos and test results.</p>

            <form onSubmit={handleStageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="text" required placeholder="Prototype Model Name / Title" value={protoTitle} onChange={(e) => setProtoTitle(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />
              <textarea rows={3} required placeholder="Testing results & how this solves the citizen complaint" value={protoDesc} onChange={(e) => setProtoDesc(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Upload Working Hardware Photo *</label>
                <input type="file" style={{ width: '100%', padding: 6, border: '1px solid #cbd5e1', borderRadius: 4, marginTop: 4 }} />
              </div>
              <input type="url" placeholder="Video Demo Link (YouTube / Google Drive)" value={protoLink} onChange={(e) => setProtoLink(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, padding: 10, border: '1px solid #cbd5e1', borderRadius: 4 }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ flex: 1, padding: 10, backgroundColor: '#0284c7', color: '#fff', border: 0, borderRadius: 4, fontWeight: 800 }}>
                  {submitting ? 'Uploading...' : 'Submit Prototype Proof'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'CONSENT' && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 16 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 24, width: 'min(90vw, 500px)' }}>
            <h3 style={{ margin: '0 0 6px', color: '#9333ea', fontSize: 17 }}>Stage 3: Field Citizen Consent (15-Day Limit)</h3>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: '#64748b' }}>Upload the signed consent form from citizen {selectedComplaint.citizen_name}.</p>

            <form onSubmit={handleStageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Signed Citizen Consent Form (.pdf / .jpg) *</label>
                <input type="file" style={{ width: '100%', padding: 6, border: '1px solid #cbd5e1', borderRadius: 4, marginTop: 4 }} />
              </div>
              <textarea rows={3} placeholder="Citizen remarks and validation on ground test..." value={consentFeedback} onChange={(e) => setConsentFeedback(e.target.value)} style={{ padding: 9, border: '1px solid #cbd5e1', borderRadius: 4 }} />

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, padding: 10, border: '1px solid #cbd5e1', borderRadius: 4 }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ flex: 1, padding: 10, backgroundColor: '#9333ea', color: '#fff', border: 0, borderRadius: 4, fontWeight: 800 }}>
                  {submitting ? 'Uploading...' : 'Verify Citizen Consent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'DOSSIER' && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 16 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 24, width: 'min(90vw, 520px)' }}>
            <h3 style={{ margin: '0 0 6px', color: '#d97706', fontSize: 17 }}>Stage 4: Day 16 Comprehensive Project Dossier</h3>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: '#64748b' }}>
              Final compilation of problem statement, technical solution, prototype telemetry data, and verified citizen consent.
            </p>

            <form onSubmit={handleStageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ backgroundColor: '#fef3c7', padding: 12, borderRadius: 6, fontSize: 12, color: '#92400e' }}>
                ✓ Complaint Code: <strong>{selectedComplaint.complaint_code}</strong> <br />
                ✓ Student Team: <strong>Verified</strong> <br />
                ✓ Prototype &amp; Citizen Consent: <strong>Validated</strong>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Upload Comprehensive Project Dossier (.pdf) *</label>
                <input type="file" style={{ width: '100%', padding: 6, border: '1px solid #cbd5e1', borderRadius: 4, marginTop: 4 }} />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, padding: 10, border: '1px solid #cbd5e1', borderRadius: 4 }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ flex: 1, padding: 10, backgroundColor: '#d97706', color: '#fff', border: 0, borderRadius: 4, fontWeight: 800 }}>
                  {submitting ? 'Verifying...' : 'Finalize & Request Grant →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
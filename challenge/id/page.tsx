'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, 
  Tag, 
  Calendar, 
  CheckCircle, 
  BrainCircuit, 
  Image as ImageIcon,
  AlertTriangle,
  ArrowLeft,
  Cpu,
  Leaf
} from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA INTERFACE ---
interface ChallengeData {
  id: string;
  title: string;
  description: string;
  domain: string;
  status: string;
  dateSubmitted: string;
  location: { lat: number; lng: number; district: string };
  aiAnalysis: {
    priorityScore: number;
    duplicateFound: boolean;
    suggestedTech: string[];
  };
  evidence: string[]; // URLs to images/videos
}

export default function ChallengeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Extract the ID from the URL (e.g., /challenge/CHL-7710 -> id = 'CHL-7710')
  const challengeId = params.id as string;

  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch from your FastAPI backend:
    // fetch(`http://localhost:8000/api/challenges/${challengeId}`)
    
    // Simulating an API call with mock data tailored to IoT and Agriculture
    setTimeout(() => {
      setChallenge({
        id: challengeId || 'CHL-7710',
        title: "Crop Care: Smart Irrigation Needs for Black and Red Soil",
        description: "Farmers in our region are struggling with uniform irrigation across diverse soil patches. Black soil retains water longer, while red/sandy soil drains rapidly. We need an automated IoT-based solution to monitor soil moisture and control water flow dynamically, preventing both root rot and drought stress.",
        domain: "Smart Agriculture",
        status: "Validated - AI Matched",
        dateSubmitted: "2026-08-20",
        location: { lat: 23.3441, lng: 85.3096, district: "Ranchi" },
        aiAnalysis: {
          priorityScore: 92,
          duplicateFound: false,
          suggestedTech: ['ESP32', 'IoT Sensors', 'Machine Learning (Random Forest)'],
        },
        evidence: ['placeholder-image-1.jpg']
      });
      setLoading(false);
    }, 800);
  }, [challengeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading challenge details...</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-500 font-bold text-lg">Challenge not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-slate-900 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    ID: {challenge.id}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {challenge.status}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  {challenge.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Grid Layout for Content */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description */}
              <section>
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">
                  Problem Description
                </h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {challenge.description}
                </p>
              </section>

              {/* Evidence / Media */}
              <section>
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-slate-400" /> Ground Evidence
                </h2>
                <div className="bg-slate-100 rounded-xl h-48 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-500">
                  <p className="text-sm font-medium">Citizen uploaded media will display here.</p>
                </div>
              </section>

              {/* AI Analysis Box */}
              <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-900 flex items-center mb-4">
                  <BrainCircuit className="w-6 h-6 mr-2 text-blue-600" /> 
                  AI Intelligence Report
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Priority Score</span>
                    <div className="flex items-end gap-2">
                      <span className={`text-3xl font-black ${challenge.aiAnalysis.priorityScore > 80 ? 'text-red-600' : 'text-amber-500'}`}>
                        {challenge.aiAnalysis.priorityScore}
                      </span>
                      <span className="text-slate-400 font-medium mb-1">/ 100</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Duplicate Check</span>
                    {challenge.aiAnalysis.duplicateFound ? (
                      <span className="flex items-center text-amber-600 font-bold">
                        <AlertTriangle className="w-5 h-5 mr-1" /> Semantic Match Found
                      </span>
                    ) : (
                      <span className="flex items-center text-emerald-600 font-bold">
                        <CheckCircle className="w-5 h-5 mr-1" /> Unique Submission
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Suggested Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {challenge.aiAnalysis.suggestedTech.map((tech, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-xs font-bold flex items-center border border-slate-200">
                        <Cpu className="w-3 h-3 mr-1.5 opacity-50" /> {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Metadata</h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start text-slate-700">
                    <Tag className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block mb-0.5">Domain</span> 
                      {challenge.domain}
                    </div>
                  </div>
                  
                  <div className="flex items-start text-slate-700">
                    <Calendar className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block mb-0.5">Submitted On</span> 
                      {challenge.dateSubmitted}
                    </div>
                  </div>

                  <div className="flex items-start text-slate-700">
                    <MapPin className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block mb-0.5">Location</span> 
                      {challenge.location.district}<br/>
                      <span className="text-xs text-slate-500 font-mono">
                        {challenge.location.lat}, {challenge.location.lng}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                    Assign to HEI Team
                  </button>
                  <button className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                    Flag as Invalid
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { MapPin, UploadCloud, Loader2, Send, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SubmitChallengePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Capture HTML5 GPS Location
  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not get location. Please check your browser permissions.');
          setIsLocating(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setIsLocating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData payload for the FastAPI backend
    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('description', formData.description);
    submissionData.append('category', formData.category || 'Auto-Detect via AI');
    
    if (location) {
      submissionData.append('latitude', location.lat.toString());
      submissionData.append('longitude', location.lng.toString());
    }
    
    if (file) {
      submissionData.append('media', file);
    }

    try {
      // API call to FastAPI backend (replace with your actual local endpoint)
      // const response = await fetch('http://localhost:8000/api/challenges', { method: 'POST', body: submissionData });
      
      // Simulating network delay for UI testing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({ title: '', description: '', category: '' });
      setFile(null);
      setLocation(null);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Ensure the FastAPI backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Challenge Submitted!</h2>
          <p className="text-slate-600 mb-6">
            Your problem has been sent to the AI Intelligence Engine for classification and will be routed to a relevant university soon.
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Another Challenge
          </button>
          <div className="mt-4">
            <Link href="/" className="text-sm text-blue-600 font-medium hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-600 font-medium hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">Report a Local Challenge</h1>
          <p className="text-slate-600 mt-2">
            Provide details about the issue you are facing. Our platform will match it with academic and industry experts for an innovative solution.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            
            {/* Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-1">Problem Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Unpredictable irrigation water supply impacting crop yield"
                  className="w-full rounded-lg border-slate-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Domain (Optional)</label>
                <select
                  className="w-full rounded-lg border-slate-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Let AI Classify</option>
                  <option value="Agriculture">Smart Agriculture & IoT</option>
                  <option value="Water">Water Management</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Detailed Description <span className="text-red-500">*</span></label>
              <textarea
                required
                rows={5}
                placeholder="Describe the problem in detail. For example: We need a sensor-based automated gate system or an IoT water scheduling solution to manage resources across different soil types (black, sandy, etc.)."
                className="w-full rounded-lg border-slate-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* File Upload & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              
              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Evidence</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <div className="space-y-2 text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label className="relative cursor-pointer rounded-md font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a photo or video</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          accept="image/*,video/*"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-slate-500">JPG, PNG, MP4 up to 50MB</p>
                    {file && <p className="text-sm text-green-600 font-semibold bg-green-50 py-1 px-2 rounded mt-2 truncate">Selected: {file.name}</p>}
                  </div>
                </div>
              </div>

              {/* GPS Location */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Geographical Tagging</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 h-[164px] flex flex-col justify-center">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="flex items-center justify-center w-full px-4 py-3 border border-slate-300 shadow-sm text-sm font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-colors disabled:opacity-50"
                  >
                    {isLocating ? (
                      <Loader2 className="animate-spin h-5 w-5 mr-2 text-blue-600" />
                    ) : (
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    )}
                    {location ? 'Location Captured' : 'Tag Current GPS Location'}
                  </button>
                  
                  {location ? (
                    <div className="mt-4 text-center">
                      <p className="text-xs font-mono text-slate-600 bg-slate-200/50 py-1.5 px-3 rounded-md inline-block">
                        Lat: {location.lat.toFixed(6)} | Lng: {location.lng.toFixed(6)}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-start text-xs text-slate-500">
                      <AlertCircle className="w-4 h-4 mr-1.5 shrink-0 text-amber-500" />
                      <p>Location data helps universities understand the environmental context of your problem.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Processing via AI Engine...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Challenge
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
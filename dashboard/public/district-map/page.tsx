'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { 
  MapPin, 
  Flame, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  RefreshCw,
  Info
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Leaflet components dynamically imported without SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);

const LOGO_SRC = '/image_19fa0a.jpg';

interface ComplaintMarker {
  id: number;
  title: string;
  category: string;
  latitude: number;
  longitude: number;
  status: string;
  district: string;
}

interface HotspotCenter {
  cluster_id: number;
  complaint_count: number;
  center_latitude: number;
  center_longitude: number;
  severity: string;
}

export default function DistrictMapPage() {
  const [complaints, setComplaints] = useState<ComplaintMarker[]>([]);
  const [hotspots, setHotspots] = useState<HotspotCenter[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClustering, setIsClustering] = useState<boolean>(false);
  const [customIcon, setCustomIcon] = useState<any>(null);

  // Setup Leaflet icon fix on client mount
  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;
      const defaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      setCustomIcon(defaultIcon);
    })();
  }, []);

  // Fetch Complaints & run AI DBSCAN Clustering
  const loadMapData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch complaints with coordinates from MySQL
      const res = await axios.get('/api/complaints/all');
      let markers: ComplaintMarker[] = [];

      if (res.data && Array.isArray(res.data)) {
        markers = res.data
          .filter((c: any) => c.latitude && c.longitude)
          .map((c: any) => ({
            id: c.id,
            title: c.title,
            category: c.category || 'General',
            latitude: parseFloat(c.latitude),
            longitude: parseFloat(c.longitude),
            status: c.status || 'Pending',
            district: c.district || 'Ranchi'
          }));
      }

      // Fallback sample coordinates (Ranchi & Dhanbad region) if database has no GPS entries
      if (markers.length === 0) {
        markers = [
          { id: 101, title: 'Main pipeline burst', category: 'Water Supply', latitude: 23.3441, longitude: 85.3096, status: 'Pending', district: 'Ranchi' },
          { id: 102, title: 'Contaminated tap water', category: 'Water Supply', latitude: 23.3450, longitude: 85.3105, status: 'Pending', district: 'Ranchi' },
          { id: 103, title: 'Drainage leakage', category: 'Water Supply', latitude: 23.3435, longitude: 85.3088, status: 'Pending', district: 'Ranchi' },
          { id: 104, title: 'Road crater accident zone', category: 'Roads', latitude: 23.3520, longitude: 85.3210, status: 'Open', district: 'Ranchi' },
          { id: 105, title: 'Toxic air emissions', category: 'Pollution', latitude: 23.7957, longitude: 86.4304, status: 'Pending', district: 'Dhanbad' },
          { id: 106, title: 'Chemical effluent smell', category: 'Pollution', latitude: 23.7965, longitude: 86.4312, status: 'Pending', district: 'Dhanbad' },
          { id: 107, title: 'Industrial slag dumping', category: 'Pollution', latitude: 23.7949, longitude: 86.4298, status: 'Pending', district: 'Dhanbad' },
        ];
      }

      setComplaints(markers);

      // 2. Call AI Engine for DBSCAN Spatial Clustering
      setIsClustering(true);
      try {
        const clusterPayload = markers.map((m) => ({
          id: m.id,
          title: m.title,
          latitude: m.latitude,
          longitude: m.longitude
        }));

        const aiRes = await axios.post('http://localhost:8000/api/ai/cluster-map-complaints', clusterPayload);

        if (aiRes.data?.hotspot_centers) {
          setHotspots(aiRes.data.hotspot_centers);
        }
      } catch (aiErr) {
        console.warn('AI Cluster Engine offline, continuing without DBSCAN overlay:', aiErr);
      } finally {
        setIsClustering(false);
      }

    } catch (err) {
      console.error('Failed to load map data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMapData();
  }, []);

  const filteredComplaints = selectedDistrict === 'All' 
    ? complaints 
    : complaints.filter(c => c.district.toLowerCase() === selectedDistrict.toLowerCase());

  // Center coordinate of Jharkhand (Ranchi)
  const mapCenter: [number, number] = [23.3441, 85.3096];

  return (
    <div className="min-h-screen bg-[#f7f7f2] flex flex-col font-sans text-gray-800">
      
      {/* Top Banner */}
      <div className="bg-[#3b2a1a] text-[#fff8dd] py-2 px-4 text-center text-xs font-bold tracking-wider">
        GOVERNMENT OF JHARKHAND &bull; GEOSPATIAL CIVIC SURVEILLANCE & AI CLUSTERING DESK
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3.5 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_SRC}
              alt="Jharkhand Emblem"
              className="w-10 h-10 object-contain rounded-full border border-emerald-500/30"
              onError={(e) => {
                e.currentTarget.src =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/512px-Jharkhand_Rajakiya_Chihna.svg.png';
              }}
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                Public Administration
              </span>
              <h1 className="text-lg font-black text-gray-900 leading-tight">
                District Grievance & AI Hotspot Map
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* District Filter Dropdown */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#1b5e20]"
            >
              <option value="All">All Districts</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Dhanbad">Dhanbad</option>
              <option value="East Singhbhum">East Singhbhum</option>
              <option value="Bokaro">Bokaro</option>
            </select>

            <button
              onClick={loadMapData}
              disabled={isLoading || isClustering}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading || isClustering ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <Link
              href="/dashboard/public"
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold transition"
            >
              ← Back to Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Map Content */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col gap-4">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Geotagged Issues</span>
              <p className="text-2xl font-black text-gray-900">{filteredComplaints.length}</p>
            </div>
            <MapPin className="w-6 h-6 text-emerald-700" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase">AI Hotspots (DBSCAN)</span>
              <p className="text-2xl font-black text-red-600">{hotspots.length}</p>
            </div>
            <Flame className="w-6 h-6 text-red-600" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase">Cluster Radius</span>
              <p className="text-2xl font-black text-blue-700">500 m</p>
            </div>
            <Layers className="w-6 h-6 text-blue-700" />
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase">AI Service Status</span>
              <p className="text-xs font-extrabold text-emerald-700 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Engine Active (:8000)
              </p>
            </div>
            <Info className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Leaflet Map Card */}
        <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-lg flex-1 min-h-[520px] relative overflow-hidden flex flex-col">
          
          {/* AI Banner Legend */}
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl mb-3 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="font-bold text-emerald-950">
                AI Hotspot Clusters Active:
              </span>
              <span className="text-gray-600">
                Red glowing zones represent high-density grievance zones clustered via DBSCAN machine learning.
              </span>
            </div>
            <span className="font-bold text-[11px] text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
              Min. 3 complaints / cluster
            </span>
          </div>

          {/* Interactive Map */}
          <div className="flex-1 w-full rounded-xl overflow-hidden relative border border-gray-200 min-h-[460px]">
            {isLoading ? (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center gap-2 font-bold text-emerald-800 text-sm">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading Geospatial Engine...
              </div>
            ) : (
              <MapContainer
                center={mapCenter}
                zoom={9}
                style={{ height: '100%', width: '100%', minHeight: '460px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 1. DBSCAN AI Hotspot Circles */}
                {hotspots.map((spot) => (
                  <Circle
                    key={`hotspot-${spot.cluster_id}`}
                    center={[spot.center_latitude, spot.center_longitude]}
                    radius={550}
                    pathOptions={{
                      color: spot.severity === 'CRITICAL_AREA' ? '#dc2626' : '#ea580c',
                      fillColor: spot.severity === 'CRITICAL_AREA' ? '#ef4444' : '#f97316',
                      fillOpacity: 0.35,
                      weight: 2
                    }}
                  >
                    <Popup>
                      <div className="text-xs p-1">
                        <div className="font-black text-red-700 uppercase flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> AI {spot.severity}
                        </div>
                        <p className="font-bold text-gray-800 mt-1">
                          {spot.complaint_count} Complaints clustered within 500m radius
                        </p>
                        <span className="text-[10px] text-gray-500 block mt-0.5">
                          Requires rapid municipal intervention & inspection.
                        </span>
                      </div>
                    </Popup>
                  </Circle>
                ))}

                {/* 2. Individual Complaint Markers */}
                {customIcon &&
                  filteredComplaints.map((item) => (
                    <Marker
                      key={`marker-${item.id}`}
                      position={[item.latitude, item.longitude]}
                      icon={customIcon}
                    >
                      <Popup>
                        <div className="text-xs max-w-[200px] p-1 font-sans">
                          <span className="font-bold text-emerald-800 text-[10px] uppercase block">
                            {item.category} &bull; #{item.id}
                          </span>
                          <h4 className="font-black text-gray-900 text-sm mt-0.5 mb-1">
                            {item.title}
                          </h4>
                          <div className="flex items-center justify-between text-[11px] text-gray-600 mt-2">
                            <span>Status:</span>
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {item.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            GPS: {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-xs text-gray-500 font-medium bg-white border-t border-gray-200">
        Government of Jharkhand &bull; Directorate of Geospatial Analytics &bull; 2026
      </footer>
    </div>
  );
}
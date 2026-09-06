import os
import math
import sqlite3
from typing import List, Optional
from contextlib import asynccontextmanager

import numpy as np
import joblib
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.cluster import DBSCAN
from sklearn.metrics.pairwise import cosine_similarity

# --- CONFIGURATION ---
DB_FILE = os.getenv("DB_FILE", "complaints_store.db")
MODEL_FILE = os.getenv("MODEL_FILE", "auto_trained_dept_model.joblib")
RETRAIN_THRESHOLD = 10

# In-memory global state
global_model: Optional[Pipeline] = None
new_entries_counter = 0


# --- HAVERSINE DISTANCE HELPER (KM) ---
def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    try:
        r = 6371.0  # Earth radius in kilometers
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * (math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return r * c
    except Exception:
        return 9999.0


# --- DATABASE HELPERS ---
def get_db_connection():
    conn = sqlite3.connect(DB_FILE, timeout=10.0)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS complaints_corpus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            department TEXT NOT NULL,
            district TEXT,
            latitude REAL,
            longitude REAL
        )
    """)
    conn.commit()

    # Column auto-migration
    cursor.execute("PRAGMA table_info(complaints_corpus)")
    existing_cols = [row["name"] for row in cursor.fetchall()]

    for col, col_type in [("district", "TEXT"), ("latitude", "REAL"), ("longitude", "REAL")]:
        if col not in existing_cols:
            cursor.execute(f"ALTER TABLE complaints_corpus ADD COLUMN {col} {col_type}")
    conn.commit()

    # Initial seeds
    cursor.execute("SELECT COUNT(*) FROM complaints_corpus")
    if cursor.fetchone()[0] == 0:
        initial_seeds = [
            ("drinking water pipeline broken tap leak dirty water contaminated", "Water Supply & Sanitation", "Ranchi", 23.3441, 85.3096),
            ("sewage drainage overflow block dirty water bad smell", "Water Supply & Sanitation", "Ranchi", 23.3450, 85.3105),
            ("tar road broken giant potholes highways department needed asphalt repair", "Roads & Infrastructure", "Ranchi", 23.3520, 85.3210),
            ("transformer sparking low voltage issue electricity power cut blackout", "Electricity & Power", "Dhanbad", 23.7957, 86.4304),
            ("street light not glowing wire damaged electric pole tilted", "Electricity & Power", "Dhanbad", 23.7965, 86.4312),
            ("factory toxic chemical effluents black smoke industrial noise emission", "Pollution & Hazardous Waste", "Bokaro", 23.6693, 86.1511)
        ]
        cursor.executemany(
            "INSERT INTO complaints_corpus (text, department, district, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
            initial_seeds
        )
        conn.commit()
    conn.close()


# --- ML RETRAINING & CACHING PIPELINE ---
def retrain_model_pipeline():
    global global_model
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT text, department FROM complaints_corpus")
    rows = cursor.fetchall()
    conn.close()

    if len(rows) < 4:
        return

    texts = [r["text"] for r in rows]
    labels = [r["department"] for r in rows]

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), stop_words='english')),
        ('clf', LinearSVC(C=1.0))
    ])
    pipeline.fit(texts, labels)
    joblib.dump(pipeline, MODEL_FILE)
    global_model = pipeline
    print(f"[ML ENGINE] Model retrained & updated in memory with {len(rows)} records.")


def check_and_auto_retrain():
    global new_entries_counter
    new_entries_counter += 1
    if new_entries_counter >= RETRAIN_THRESHOLD:
        retrain_model_pipeline()
        new_entries_counter = 0


# --- LIFESPAN STARTUP/SHUTDOWN ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    global global_model
    init_db()
    if os.path.exists(MODEL_FILE):
        try:
            global_model = joblib.load(MODEL_FILE)
            print("[ML ENGINE] Pre-trained model loaded into memory.")
        except Exception:
            retrain_model_pipeline()
    else:
        retrain_model_pipeline()
    yield


app = FastAPI(
    title="Janvaani Integrated AI Engine",
    description="AI Engine with Duplicate Blocking, Dept Classifier, and Map Clustering",
    version="7.1.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- PYDANTIC SCHEMAS ---
class DuplicateVerifyRequest(BaseModel):
    title: str
    description: str
    district: Optional[str] = "Ranchi"
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class ComplaintInput(BaseModel):
    title: str
    description: str
    district: Optional[str] = "Ranchi"
    taluk: Optional[str] = "Sadar"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    confirmed_dept: Optional[str] = None


class ComplaintCoordinate(BaseModel):
    id: int
    title: str
    latitude: float
    longitude: float


class ProfileInput(BaseModel):
    user_id: int
    total_filed: int = Field(ge=0)
    resolved: int = Field(ge=0)
    rejected: int = Field(ge=0)


# --- API ENDPOINTS ---

@app.get("/health")
def health_check():
    return {"status": "online", "model_ready": global_model is not None}


@app.post("/api/ai/check-duplicate")
def check_duplicate(data: DuplicateVerifyRequest):
    new_text = f"{data.title} {data.description}".strip().lower()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, text, district, latitude, longitude FROM complaints_corpus")
    db_rows = cursor.fetchall()
    conn.close()

    if not db_rows:
        return {"is_duplicate": False, "can_submit": True, "message": "No existing complaints found."}

    existing_texts = [r["text"].lower() for r in db_rows]
    corpus = [new_text] + existing_texts

    try:
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(corpus)
        similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    except Exception:
        similarities = np.zeros(len(existing_texts))

    for idx, row in enumerate(db_rows):
        comp_id = row["id"]
        text_val = row["text"].lower()
        row_district = row["district"]
        row_lat = row["latitude"]
        row_lon = row["longitude"]
        sim_score = float(similarities[idx]) if idx < len(similarities) else 0.0

        exact_title_match = data.title.strip().lower() in text_val

        is_same_location = False
        distance_km = None
        if data.latitude and data.longitude and row_lat and row_lon:
            distance_km = haversine_distance(data.latitude, data.longitude, row_lat, row_lon)
            if distance_km <= 0.8:
                is_same_location = True
        elif data.district and row_district:
            if data.district.strip().lower() == str(row_district).strip().lower():
                is_same_location = True

        # Duplicate match condition
        if (exact_title_match and is_same_location) or (sim_score >= 0.60 and is_same_location) or (sim_score >= 0.80):
            return {
                "is_duplicate": True,
                "can_submit": False,
                "similarity_score": round(sim_score, 2),
                "matched_complaint_id": comp_id,
                "distance_km": round(distance_km, 2) if distance_km is not None else "Same District",
                "message": f"DUPLICATE DETECTED: Similar complaint found ({int(sim_score * 100)}% match). Submission rejected."
            }

    max_sim = float(np.max(similarities)) if len(similarities) > 0 else 0.0
    return {
        "is_duplicate": False,
        "can_submit": True,
        "similarity_score": round(max_sim, 2),
        "message": "Complaint is unique. Clearance approved."
    }


@app.post("/api/ai/classify-complaint")
def classify_and_auto_learn(data: ComplaintInput, bg: BackgroundTasks):
    global global_model
    full_text = f"{data.title} {data.description}".strip()

    if global_model is None:
        if os.path.exists(MODEL_FILE):
            global_model = joblib.load(MODEL_FILE)
        else:
            raise HTTPException(status_code=503, detail="AI Classifier model not initialized yet.")

    predicted_dept = str(global_model.predict([full_text])[0])

    text_lower = full_text.lower()
    urgent_words = ["spark", "fire", "danger", "burst", "death", "blast", "accident", "overflow", "hazard"]
    is_urgent = any(word in text_lower for word in urgent_words)
    priority = "High" if is_urgent else "Normal"
    score = 0.85 if is_urgent else 0.40

    dept_to_save = data.confirmed_dept or predicted_dept

    # Insert record into SQLite
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO complaints_corpus (text, department, district, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
        (full_text, dept_to_save, data.district, data.latitude, data.longitude)
    )
    conn.commit()
    conn.close()

    bg.add_task(check_and_auto_retrain)

    taluk_slug = (data.taluk or "general").lower().replace(" ", "_")
    dept_slug = predicted_dept.lower().replace(" ", "_").replace("&", "and")

    return {
        "status": "success",
        "predicted_department": predicted_dept,
        "priority_level": priority,
        "urgency_score": score,
        "dispatched_to": {
            "department": predicted_dept,
            "designated_head_officer": f"{dept_slug}_{taluk_slug}@gov.in"
        }
    }


@app.post("/api/ai/cluster-map-complaints")
def cluster_map(complaints: List[ComplaintCoordinate]):
    if len(complaints) < 3:
        return {"total_hotspots_detected": 0, "hotspot_centers": []}

    coords = np.array([[c.latitude, c.longitude] for c in complaints])
    kms_per_radian = 6371.0088
    eps_rad = 0.5 / kms_per_radian  # 500 meters

    db = DBSCAN(eps=eps_rad, min_samples=3, metric='haversine')
    labels = db.fit_predict(np.radians(coords))

    cluster_summary = []
    for cid in set(labels):
        if cid == -1:
            continue
        cluster_coords = coords[labels == cid]
        cluster_summary.append({
            "cluster_id": int(cid),
            "complaint_count": int(np.sum(labels == cid)),
            "center_latitude": float(np.mean(cluster_coords[:, 0])),
            "center_longitude": float(np.mean(cluster_coords[:, 1])),
            "severity": "CRITICAL_AREA" if len(cluster_coords) >= 5 else "ELEVATED_ISSUE"
        })

    return {
        "total_hotspots_detected": len(cluster_summary),
        "hotspot_centers": cluster_summary
    }


@app.post("/api/ai/profile-analytics")
def profile_analytics(profile: ProfileInput):
    if profile.total_filed == 0:
        return {"civic_score": 100, "reputation_tier": "New Citizen"}

    valid_ratio = max(0.0, (profile.total_filed - profile.rejected) / profile.total_filed)
    resolution_ratio = min(1.0, profile.resolved / profile.total_filed)
    civic_score = int((valid_ratio * 70) + (resolution_ratio * 30))

    if civic_score >= 80:
        tier = "Champion Citizen"
    elif civic_score >= 50:
        tier = "Active Contributor"
    else:
        tier = "Flagged User"

    return {"civic_score": civic_score, "reputation_tier": tier}

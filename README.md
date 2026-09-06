# 🏛️ Janvaani Integrated AI Engine

An intelligent civic grievance processing engine built with **FastAPI**, **Scikit-Learn**, and **SQLite**. It automatically classifies civic complaints to respective government departments, detects duplicate grievances using text similarity and GPS radius, and clusters regional complaint hotspots.

---

## 🚀 Key Features

* **Strict Duplicate Detection:** Hybrid check using **TF-IDF + Cosine Similarity** alongside **Haversine GPS Distance** (within 800m).
* **Department Classification:** Automated issue routing using **Linear Support Vector Classifier (LinearSVC)**.
* **Self-Learning Pipeline:** Triggers automatic retraining of the ML pipeline on background tasks after new complaint thresholds are met.
* **Map Clustering Hotspots:** Identifies critical civic failure zones using **DBSCAN** spatial clustering.
* **Civic Reputation Engine:** Calculates dynamic citizen credibility scores based on past complaint resolution ratios.

---

## 🛠️ Tech Stack

* **Backend Framework:** FastAPI, Uvicorn
* **Machine Learning / NLP:** Scikit-Learn (LinearSVC, TF-IDF Vectorizer), NumPy, DBSCAN
* **Database:** SQLite3
* **Serialization:** Joblib

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/<your-repo-name>.git
   cd <your-repo-name>

AlphaMed — AI-Powered Personal Healthcare Assistant

AlphaMed is a full-stack AI healthcare assistant that combines machine learning, large language models, OCR, and geolocation into a single platform. Users can enter symptoms to get disease predictions, chat with an AI medical assistant, track health vitals on a dashboard, upload and interpret medical reports, and find nearby hospitals — all in one place.

 AlphaMed is not a substitute for professional medical diagnosis. It serves as a first-step tool for health awareness and preliminary guidance.

Disease Prediction-:
Enter symptoms and receive instant preliminary disease predictions powered by a trained Random Forest Classifier with 93% accuracy across 40+ symptom features. Results include disease description, probable causes, precautions, recommended specialist type, and suggested medications generated via Gemini LLM.

LLM Medical Chatbot-:
A conversational chatbot for real-time health queries powered by Gemini API. Supports quick action categories including symptom check, medication info, health tips, and prevention. Full chat history is stored per user in MongoDB.

Health Dashboard-:
Personalized dashboard showing BMI, blood pressure, sugar levels, and a BP trend graph visualizing vitals over time. Users can add and edit health notes, view past diagnosis history, and track medical details including cholesterol and disease score summaries.

Medical Report Interpretation-:
Upload medical reports in JPG, PNG, or TIFF format. Tesseract OCR extracts text from the document, which is then passed to Gemini LLM to generate a structured medical summary displayed alongside the diagnosis result.

Nearby Hospital Finder-:
Detects user location and fetches hospitals within a 5 km radius using the OpenStreetMap Overpass API, displayed as clickable markers on an interactive Leaflet map.

Tech Stack-: 
Frontend-: React.js, Bootstrap, Axios
Backend-: Flask, Python 3.10+, REST APIs 
Machine Learning-: Scikit-learn, Pandas, NumPy 
LLM-: Google Gemini API 
OCR-: Tesseract OCR Engine 
Database-: MongoDB Atlas 
Authentication-: Clerk 
Maps-: OpenStreetMap, Overpass API, Leaflet.js 

Getting Started-:
Prerequisites: Python 3.10+, Node.js 18+, MongoDB Atlas account, Google Gemini API key, Clerk account, Tesseract OCR installed locally.

Backend setup:
git clone https://github.com/shalvi1520/AlphaMed.git
cd AlphaMed/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env

Add GEMINI_API_KEY and MONGODB_URI to .env
python app.py


Frontend setup:
cd ../frontend
npm install
cp .env.example .env
Add CLERK_PUBLISHABLE_KEY and VITE_API_URL to .env
npm run dev

ML Model-:

Algorithm: Random Forest Classifier
Input: 40+ binary-encoded symptom features
Accuracy: 93%
Framework: Scikit-learn


**Getting Started**

Prerequisites: Python 3.10+, Node.js 18+, MongoDB Atlas account, Google Gemini API key, Clerk account, Tesseract OCR installed locally.

Backend setup:
```bash
git clone https://github.com/shalvi1520/AlphaMed.git
cd AlphaMed/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add GEMINI_API_KEY and MONGODB_URI to .env
python app.py
```

Frontend setup:
```bash
cd ../frontend
npm install
cp .env.example .env
# Add CLERK_PUBLISHABLE_KEY and VITE_API_URL to .env
npm run dev
```

---

**ML Model**

Algorithm: Random Forest Classifier
Input: 40+ binary-encoded symptom features
Accuracy: 93%
Framework: Scikit-learn


The training pipeline cleans and encodes a symptom-disease dataset into a binary feature matrix, splits it into train/test sets, trains the classifier, and saves the model as a `.pkl` file for inference.

Project Structure-:
AlphaMed/
├── backend/
│   ├── app.py
│   ├── model/
│   │   ├── train_model.py
│   │   └── disease_model.pkl
│   ├── routes/
│   │   ├── predict.py
│   │   ├── chat.py
│   │   ├── ocr.py
│   │   └── hospitals.py
│   ├── database/
│   │   └── mongo.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Diagnosis.jsx
│   │   │   └── Chatbot.jsx
│   │   └── App.jsx
│   └── package.json
└── README.md

Future Plans-:
- Conversational memory and context retention in chatbot
- PDF support and structured parameter extraction for OCR
- Wearable device integration for real-time vitals
- Multilingual support
- Cloud deployment on AWS/GCP with CI/CD pipeline
- React Native mobile app

AlphaMed – AI-Powered Personal Healthcare Assistant

Name
AlphaMed – Your intelligent, AI-driven assistant for early disease diagnosis and health insights based on symptoms.

Description:
AlphaMed is an intelligent, AI-driven healthcare assistant developed as part of a Project-Based Learning (PBL) initiative. It is designed to help users diagnose diseases based on the symptoms they experience. The system takes input from the user in the form of symptoms selected through a user-friendly interface, processes the input using a trained Machine Learning model, and returns a disease prediction along with useful information such as the disease description, severity, matched symptoms, and suggested precautions.
The frontend of AlphaMed is built using React.js and styled with Bootstrap to provide a smooth and modern user experience. User authentication is securely handled using Clerk, allowing users to sign up and sign in safely. The dashboard allows users to select symptoms from a dropdown, and a medical report upload feature is planned to be added soon. This upcoming feature will use NLP (Natural Language Processing) to extract relevant symptoms from uploaded medical documents, making diagnosis even easier and more accurate.
The backend is planned to be built using Flask, where a trained RandomForestClassifier model from scikit-learn will handle the diagnosis logic. The model is trained using a dataset of symptoms and diseases. Features were preprocessed using a ColumnTransformer with StandardScaler for numeric data and OneHotEncoder for categorical data. The trained model, along with its preprocessing pipeline, is saved as model_with_preprocessor.pkl using joblib and will be loaded into the Flask backend for live predictions.
The ML model takes a binary-encoded input vector of symptoms (totaling 513 features) and returns the predicted disease along with its relevant information. For example, if a user inputs symptoms like "headache", "nausea", and "fatigue", the model may return a disease like "Migraine", along with its description, moderate severity level, precautions (like rest and avoiding bright lights), and the matched symptoms.
In terms of project structure, AlphaMed is divided into frontend/ for the React UI, backend/ for the Flask API and model integration (in progress), and model/ which contains the training notebook and datasets used for training. The backend will also be connected to a MongoDB database in future updates to store user history and support further analytics features.

 
Key Features:
- User-friendly symptom selector
- Real-time disease prediction using a trained ML model
- Detailed information: description, severity, precautions
- Planned NLP-based symptom extraction from uploaded medical reports
- Secure authentication system via Clerk
- Expandable to include report history, chatbot, and admin panel

🔗 *More on [Random Forest Algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)*


 Installation

Requirements
- React (for frontend)
- Python 3.8+ (for backend)
- pip for installing Python packages
- MongoDB (optional, future use)

Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/AlphaMed.git
   cd AlphaMed
   cd frontend
npm install
npm start
cd backend
pip install -r requirements.txt
python app.py

ML Model
Pre-trained model saved as model_with_preprocessor.pkl
Loaded inside the Flask backend automatically

Example Output:
{
  "Disease": "Migraine",
  "Description": "A neurological condition that causes intense headaches and other symptoms.",
  "Severity": "Moderate",
  "Precautions": ["Rest", "Avoid bright lights", "Proper medication"],
  "Matched Symptoms": ["headache", "nausea", "fatigue"]
}
Support:
If you encounter issues or have questions:
Open a GitHub Issue
Email: shalvi.khare2007@gmail.com

Project Status:
AlphaMed is currently under active development. New features and modules are being added regularly. If you'd like to help, you're welcome to contribute or become a maintainer!






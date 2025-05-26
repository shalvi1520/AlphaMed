from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np



import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import warnings

warnings.filterwarnings('ignore', category=pd.errors.PerformanceWarning)


df0 = pd.read_csv('dataset.csv')
df2 = pd.read_csv('symptom_Description.csv')
df3 = pd.read_csv('symptom_precaution.csv')


df0 = df0.dropna(axis=1, thresh=int(0.3*len(df0)))
df0 = df0.fillna('none').drop_duplicates()


all_symptoms = set()
for col in df0.columns[1:]:
    unique_values = df0[col].unique()
    for s in unique_values:
        try:
            symptom = str(s).strip().lower().replace(' ', '_')
            if symptom and symptom != 'none':
                all_symptoms.add(symptom)
        except:
            continue


feature_data = {}
for symptom in all_symptoms:
    feature_data[symptom] = [
        1 if any(str(s).strip().lower().replace(' ', '_') == symptom
                for s in row[1:] if pd.notna(s) and str(s).lower() != 'none')
        else 0
        for row in df0.itertuples(index=False)
    ]


X = pd.DataFrame(feature_data)
y = df0['Disease']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)


model = RandomForestClassifier(n_estimators=150,
                             class_weight='balanced',
                             random_state=42)
model.fit(X_train, y_train)


predictions = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, predictions):.2f}")

def predict_disease(input_symptoms):
    """Prediction function with proper feature name handling"""
    
    cleaned_input = [str(s).strip().lower().replace(' ', '_') for s in input_symptoms]

    
    input_data = np.zeros(len(X_train.columns))
    for i, col in enumerate(X_train.columns):
        if col in cleaned_input:
            input_data[i] = 1

    
    input_df = pd.DataFrame([input_data], columns=X_train.columns)

   
    disease = model.predict(input_df)[0]

    desc = df2[df2['Disease'] == disease]['Description'].values[0]
    precautions = df3[df3['Disease'] == disease].iloc[0,1:].tolist()

    return {
        'disease': disease,
        'description': desc,
        'precautions': [p for p in precautions if str(p) != 'nan'],
        'matched_symptoms': [s for s in cleaned_input if s in X_train.columns]
    }




# Your ML model code here
# (use the exact code you shared above — load dataset, train model, define `predict_disease()` function)

app = Flask(__name__)
CORS(app,origins=["http://localhost:3000"])

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_symptoms = data.get('symptoms', [])
    print("From frontend:",input_symptoms)

    try:
        result = predict_disease(input_symptoms)
        

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


# from flask import Flask,render_template


# app = Flask(__name__)

# @app.route('/predict')
# def home():
#     return render_template('App.js')

# if __name__ == '__main__':
#     app.run(debug=True)




# from flask import Flask, request, jsonify
# import pandas as pd
# import numpy as np
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score
# import warnings

# warnings.filterwarnings('ignore', category=pd.errors.PerformanceWarning)

# app = Flask(__name__)

# # Load datasets
# df0 = pd.read_csv('dataset.csv')
# df2 = pd.read_csv('symptom_Description.csv')
# df3 = pd.read_csv('symptom_precaution.csv')


# # Preprocessing
# df0 = df0.dropna(axis=1, thresh=int(0.3*len(df0)))
# df0 = df0.fillna('none').drop_duplicates()

# # Extract symptoms
# all_symptoms = set()
# for col in df0.columns[1:]:
#     unique_values = df0[col].unique()
#     for s in unique_values:
#         try:
#             symptom = str(s).strip().lower().replace(' ', '_')
#             if symptom and symptom != 'none':
#                 all_symptoms.add(symptom)
#         except:
#             continue

# # Create features
# feature_data = {symptom: [
#     1 if any(str(s).strip().lower().replace(' ', '_') == symptom
#              for s in row[1:] if pd.notna(s) and str(s).lower() != 'none')
#     else 0
#     for row in df0.itertuples(index=False)
# ] for symptom in all_symptoms}

# X = pd.DataFrame(feature_data)
# y = df0['Disease']

# # Train model
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)
# model = RandomForestClassifier(n_estimators=150, class_weight='balanced', random_state=42)
# model.fit(X_train, y_train)

# print(f"Model Accuracy: {accuracy_score(y_test, model.predict(X_test)):.2f}")

# # API endpoint for disease prediction
# @app.route('/predict', methods=['POST'])
# def predict_disease():
#     """Predict disease based on symptoms from a POST request."""
#     input_symptoms = request.json.get('symptoms', [])
#     cleaned_input = [str(s).strip().lower().replace(' ', '_') for s in input_symptoms]

#     input_data = np.zeros(len(X_train.columns))
#     for i, col in enumerate(X_train.columns):
#         if col in cleaned_input:
#             input_data[i] = 1

#     input_df = pd.DataFrame([input_data], columns=X_train.columns)
#     predicted_disease = model.predict(input_df)[0]

#     desc = df2[df2['Disease'] == predicted_disease]['Description'].values[0]
#     precautions = df3[df3['Disease'] == predicted_disease].iloc[0, 1:].tolist()

#     return jsonify({
#         'disease': predicted_disease,
#         'description': desc,
#         'precautions': [p for p in precautions if str(p) != 'nan'],
#         'matched_symptoms': [s for s in cleaned_input if s in X_train.columns]
#     })


#     # Add this code at the bottom of app.py to test directly
# if __name__ == '__main__':
#     app.run(debug=True)

#     test_symptoms = ["fatigue", "cough", "high_fever","breathlessness","family_history","mucoid_sputum"]
#     response = predict_disease(test_symptoms)
#     print("\nTest Prediction Result:")
#     print(response)




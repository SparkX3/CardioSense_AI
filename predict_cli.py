import sys
import json
import joblib
import pandas as pd
import numpy as np

def load_models():
    model = joblib.load("models/heart_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    feature_names = joblib.load("models/feature_names.pkl")
    continuous_features = ["age", "trestbps", "chol", "thalach", "oldpeak"]
    return model, scaler, feature_names, continuous_features

def predict_single(data):
    model, scaler, feature_names, continuous_features = load_models()
    df = pd.DataFrame([data])[feature_names]
    df[continuous_features] = scaler.transform(df[continuous_features])
    prediction = int(model.predict(df)[0])
    probabilities = model.predict_proba(df)[0]
    prob_disease = float(probabilities[1]) * 100.0
    return {
        "prediction": prediction,
        "probability": round(prob_disease, 2),
        "risk_tier": "HIGH" if prob_disease >= 65 else ("MODERATE" if prob_disease >= 35 else "LOW")
    }

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1].strip():
        data = json.loads(sys.argv[1])
    else:
        # Default test sample
        data = {
            "age": 55, "sex": 1, "cp": 2, "trestbps": 130, "chol": 250,
            "fbs": 0, "restecg": 0, "thalach": 150, "exang": 0,
            "oldpeak": 1.0, "slope": 1, "ca": 0, "thal": 2
        }
    result = predict_single(data)
    print(json.dumps(result))

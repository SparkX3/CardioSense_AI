import joblib
import pandas as pd
import numpy as np

def run_tests():
    print("=== Running Cardiovascular Risk Model Evaluation Tests ===")
    model = joblib.load("models/heart_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    features = joblib.load("models/feature_names.pkl")
    continuous = ["age", "trestbps", "chol", "thalach", "oldpeak"]

    # 1. High Risk Preset
    # Age: 64, Sex: 1, cp: 0, trestbps: 160, chol: 285, fbs: 1, restecg: 2, thalach: 108, exang: 1, oldpeak: 3.2, slope: 1, ca: 2, thal: 3
    high_risk_input = {
        "age": 64,
        "sex": 1,
        "cp": 0,
        "trestbps": 160,
        "chol": 285,
        "fbs": 1,
        "restecg": 2,
        "thalach": 108,
        "exang": 1,
        "oldpeak": 3.2,
        "slope": 1,
        "ca": 2,
        "thal": 3
    }
    df_high = pd.DataFrame([high_risk_input])[features]
    df_high[continuous] = scaler.transform(df_high[continuous])
    high_prob = model.predict_proba(df_high)[0, 1] * 100

    print(f"High Risk Preset Probability: {high_prob:.2f}% (Threshold: > 75%)")
    assert high_prob > 75.0, f"Expected High Risk > 75%, got {high_prob:.2f}%"

    # 2. Low Risk Preset
    # Age: 36, Sex: 0, cp: 2, trestbps: 118, chol: 185, fbs: 0, restecg: 0, thalach: 174, exang: 0, oldpeak: 0.2, slope: 0, ca: 0, thal: 2
    low_risk_input = {
        "age": 36,
        "sex": 0,
        "cp": 2,
        "trestbps": 118,
        "chol": 185,
        "fbs": 0,
        "restecg": 0,
        "thalach": 174,
        "exang": 0,
        "oldpeak": 0.2,
        "slope": 0,
        "ca": 0,
        "thal": 2
    }
    df_low = pd.DataFrame([low_risk_input])[features]
    df_low[continuous] = scaler.transform(df_low[continuous])
    low_prob = model.predict_proba(df_low)[0, 1] * 100

    print(f"Low Risk Preset Probability:  {low_prob:.2f}% (Threshold: < 25%)")
    assert low_prob < 25.0, f"Expected Low Risk < 25%, got {low_prob:.2f}%"

    # 3. Moderate Risk Preset
    mod_risk_input = {
        "age": 52,
        "sex": 1,
        "cp": 1,
        "trestbps": 135,
        "chol": 235,
        "fbs": 0,
        "restecg": 1,
        "thalach": 142,
        "exang": 0,
        "oldpeak": 1.2,
        "slope": 1,
        "ca": 1,
        "thal": 2
    }
    df_mod = pd.DataFrame([mod_risk_input])[features]
    df_mod[continuous] = scaler.transform(df_mod[continuous])
    mod_prob = model.predict_proba(df_mod)[0, 1] * 100

    print(f"Moderate Risk Preset Probability: {mod_prob:.2f}% (Threshold: 35% - 64%)")
    assert 35.0 <= mod_prob < 65.0, f"Expected Moderate Risk in [35%, 65%), got {mod_prob:.2f}%"

    print("\n All preset verification assertions passed successfully!")

if __name__ == "__main__":
    run_tests()

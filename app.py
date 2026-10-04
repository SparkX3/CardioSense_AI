import streamlit as st
import pandas as pd
import numpy as np
import joblib
import plotly.graph_objects as go

# ---------------------------------------------------------
# Page Setup & Styling
# ---------------------------------------------------------
# ---------------------------------------------------------
# Page Setup & Styling
# ---------------------------------------------------------
st.set_page_config(
    page_title="CardioSense AI | Predicting Risk Before It Matters",
    page_icon="❤️",
    layout="wide"
)

st.markdown("""
<style>
    .main-title {
        font-size: 2.3rem;
        font-weight: 700;
        color: #1C3326;
        margin-bottom: 0.1rem;
    }
    .headline {
        font-size: 1.4rem;
        font-family: serif;
        color: #1C3326;
        font-style: italic;
        margin-bottom: 0.4rem;
    }
    .sub-title {
        font-size: 0.95rem;
        color: #4E5C52;
        margin-bottom: 0.3rem;
    }
    .attribution-tag {
        font-size: 0.85rem;
        font-weight: 600;
        color: #2D5A3F;
        margin-bottom: 1.5rem;
    }
    .model-tagline {
        font-family: monospace;
        font-size: 0.8rem;
        color: #556358;
        background: #ECE8E1;
        padding: 4px 10px;
        border-radius: 6px;
        display: inline-block;
        margin-bottom: 1.5rem;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# Load Saved Artifacts
# ---------------------------------------------------------
@st.cache_resource
def load_artifacts():
    model = joblib.load("models/heart_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    feature_names = joblib.load("models/feature_names.pkl")
    return model, scaler, feature_names

try:
    model, scaler, feature_names = load_artifacts()
except Exception as err:
    st.error(f"Error loading model files: {err}. Ensure train.py has been run.")
    st.stop()

# ---------------------------------------------------------
# Header & Attribution
# ---------------------------------------------------------
st.markdown('<div class="main-title">❤️ CardioSense AI</div>', unsafe_allow_html=True)
st.markdown('<div class="headline">Predicting risk before it matters.</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">Leveraging artificial intelligence and machine learning to predict cardiovascular risk, facilitate early intervention, and advance preventive healthcare.</div>', unsafe_allow_html=True)
st.markdown('<div class="attribution-tag">CardioSense AI · An AI Healthcare Project by Sanchit Shingole · Lokmanya Tilak College of Engineering</div>', unsafe_allow_html=True)
st.markdown('<div class="model-tagline">Predicting heart health risks today for a healthier tomorrow.</div>', unsafe_allow_html=True)

# ---------------------------------------------------------
# Cohort Preset Quick-Select
# ---------------------------------------------------------
preset_mode = st.radio(
    "Load Clinical Preset Profile:",
    options=["Custom", "High Risk Preset (> 75% Risk)", "Low Risk Preset (< 25% Risk)", "Moderate Risk Preset (35% - 64% Risk)"],
    horizontal=True
)

default_vals = {
    "age": 52, "sex": 1, "cp": 0, "trestbps": 125, "chol": 210,
    "fbs": 0, "restecg": 0, "thalach": 155, "exang": 0, "oldpeak": 1.0,
    "slope": 1, "ca": 0, "thal": 2
}

if preset_mode == "High Risk Preset (> 75% Risk)":
    default_vals = {
        "age": 64, "sex": 1, "cp": 0, "trestbps": 160, "chol": 285,
        "fbs": 1, "restecg": 2, "thalach": 108, "exang": 1, "oldpeak": 3.2,
        "slope": 1, "ca": 2, "thal": 3
    }
elif preset_mode == "Low Risk Preset (< 25% Risk)":
    default_vals = {
        "age": 36, "sex": 0, "cp": 2, "trestbps": 118, "chol": 185,
        "fbs": 0, "restecg": 0, "thalach": 174, "exang": 0, "oldpeak": 0.2,
        "slope": 0, "ca": 0, "thal": 2
    }
elif preset_mode == "Moderate Risk Preset (35% - 64% Risk)":
    default_vals = {
        "age": 52, "sex": 1, "cp": 1, "trestbps": 135, "chol": 235,
        "fbs": 0, "restecg": 1, "thalach": 142, "exang": 0, "oldpeak": 1.2,
        "slope": 1, "ca": 1, "thal": 2
    }

# ---------------------------------------------------------
# Patient Data Form
# ---------------------------------------------------------
col1, col2, col3 = st.columns(3)

with col1:
    st.subheader("📋 Demographics")
    age = st.slider("Age (years)", min_value=25, max_value=85, value=default_vals["age"], step=1)
    sex = st.radio("Biological Sex", options=[1, 0], index=0 if default_vals["sex"] == 1 else 1, format_func=lambda x: "Male (1)" if x == 1 else "Female (0)", horizontal=True)
    cp = st.selectbox(
        "Chest Pain Type (cp)",
        options=[0, 1, 2, 3],
        index=default_vals["cp"],
        format_func=lambda x: {
            0: "Typical Angina (0)",
            1: "Atypical Angina (1)",
            2: "Non-Anginal Pain (2)",
            3: "Asymptomatic (3)"
        }[x]
    )

with col2:
    st.subheader("🩺 Baseline Vitals")
    trestbps = st.number_input("Resting Blood Pressure (mm Hg)", min_value=80, max_value=220, value=default_vals["trestbps"], step=1)
    chol = st.number_input("Serum Cholesterol (mg/dl)", min_value=100, max_value=600, value=default_vals["chol"], step=1)
    fbs = st.radio("Fasting Blood Sugar > 120 mg/dl (fbs)", options=[0, 1], index=default_vals["fbs"], format_func=lambda x: "No (0)" if x == 0 else "Yes (1)", horizontal=True)
    restecg = st.selectbox(
        "Resting ECG Result (restecg)",
        options=[0, 1, 2],
        index=default_vals["restecg"],
        format_func=lambda x: {
            0: "0: Normal",
            1: "1: ST-T Wave Abnormality",
            2: "2: Left Ventricular Hypertrophy (LVH)"
        }[x]
    )

with col3:
    st.subheader("🏃 Stress Diagnostics")
    thalach = st.slider("Max Heart Rate (thalach, bpm)", min_value=60, max_value=220, value=default_vals["thalach"], step=1)
    exang = st.radio("Exercise-Induced Angina (exang)", options=[0, 1], index=default_vals["exang"], format_func=lambda x: "No (0)" if x == 0 else "Yes (1)", horizontal=True)
    oldpeak = st.slider("ST Depression (oldpeak)", min_value=0.0, max_value=6.5, value=float(default_vals["oldpeak"]), step=0.1)
    slope = st.selectbox("ST Slope", options=[0, 1, 2], index=default_vals["slope"], format_func=lambda x: {0: "0: Upsloping", 1: "1: Flat", 2: "2: Downsloping"}[x])
    ca = st.selectbox("Major Vessels Colored (0–3, ca)", options=[0, 1, 2, 3], index=default_vals["ca"])
    thal = st.selectbox("Thalassemia Status (thal)", options=[1, 2, 3], index=[1, 2, 3].index(default_vals["thal"]), format_func=lambda x: {1: "1: Normal", 2: "2: Fixed Defect", 3: "3: Reversible Defect"}[x])

st.divider()

# ---------------------------------------------------------
# Run Inference & Display Results
# ---------------------------------------------------------
if st.button("Evaluate Patient Risk", type="primary", use_container_width=True):
    input_data = {
        "age": age,
        "sex": sex,
        "cp": cp,
        "trestbps": trestbps,
        "chol": chol,
        "fbs": fbs,
        "restecg": restecg,
        "thalach": thalach,
        "exang": exang,
        "oldpeak": oldpeak,
        "slope": slope,
        "ca": ca,
        "thal": thal
    }
    
    # Structure matching model's expected column order
    input_df = pd.DataFrame([input_data])[feature_names]
    
    # Scale continuous metrics
    continuous_features = ["age", "trestbps", "chol", "thalach", "oldpeak"]
    input_df[continuous_features] = scaler.transform(input_df[continuous_features])
    
    # Model inference: predict_proba index 1 is target = 1 (disease present)
    probability = model.predict_proba(input_df)[0][1] * 100
    prediction = 1 if probability >= 50.0 else 0

    if probability >= 65.0:
        risk_tier = "High Risk"
        alert_type = "error"
        badge_color = "#9E3B30"
    elif probability >= 35.0:
        risk_tier = "Moderate Risk"
        alert_type = "warning"
        badge_color = "#A6822B"
    else:
        risk_tier = "Low Risk"
        alert_type = "success"
        badge_color = "#244D34"

    out_col1, out_col2 = st.columns([1, 1.2])

    with out_col1:
        st.subheader("Diagnostic Assessment")
        if risk_tier == "High Risk":
            st.error(f"**High Risk of Heart Disease**\n\nCalculated Probability: **{probability:.1f}%**")
        elif risk_tier == "Moderate Risk":
            st.warning(f"**Moderate Cardiovascular Risk**\n\nCalculated Probability: **{probability:.1f}%**")
        else:
            st.success(f"**Low / Normal Cardiac Risk**\n\nCalculated Probability: **{probability:.1f}%**")

        st.markdown(f"""
        **Risk Cohort:** <span style="color: {badge_color}; font-weight: bold;">{risk_tier}</span>
        
        **Standardized Clinical Thresholds:**
        * **&ge; 65%**: High Risk (Crimson / Red) — Urgent specialist evaluation recommended
        * **35% – 64%**: Moderate Risk (Amber / Yellow) — Lifestyle modification & monitoring
        * **&lt; 35%**: Low Risk (Emerald / Green) — Normal normative parameters
        """, unsafe_allow_html=True)

    with out_col2:
        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=probability,
            number={'suffix': "%", 'font': {'size': 24}},
            title={'text': "Cardiac Risk Probability", 'font': {'size': 18}},
            gauge={
                'axis': {'range': [0, 100], 'tickwidth': 1},
                'bar': {'color': "#1C3326"},
                'steps': [
                    {'range': [0, 35], 'color': "#A7D7B5"},
                    {'range': [35, 65], 'color': "#FDE68A"},
                    {'range': [65, 100], 'color': "#FCA5A5"}
                ],
                'threshold': {
                    'line': {'color': badge_color, 'width': 4},
                    'thickness': 0.8,
                    'value': probability
                }
            }
        ))
        fig.update_layout(height=260, margin=dict(l=20, r=20, t=30, b=20))
        st.plotly_chart(fig, use_container_width=True)
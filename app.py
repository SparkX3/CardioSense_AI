import streamlit as st
import pandas as pd
import numpy as np
import joblib
import plotly.graph_objects as go

# ---------------------------------------------------------
# Page Setup & Styling
# ---------------------------------------------------------
st.set_page_config(
    page_title="CardioSense | Heart Risk Assessment",
    page_icon="❤️",
    layout="wide"
)

st.markdown("""
<style>
    .main-title {
        font-size: 2.2rem;
        font-weight: 700;
        color: #0F172A;
        margin-bottom: 0.2rem;
    }
    .sub-title {
        font-size: 1rem;
        color: #64748B;
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
# Header
# ---------------------------------------------------------
st.markdown('<div class="main-title">❤️ CardioSense AI</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">Clinical Support Dashboard for Cardiovascular Risk Assessment</div>', unsafe_allow_html=True)

# ---------------------------------------------------------
# Patient Data Form
# ---------------------------------------------------------
col1, col2, col3 = st.columns(3)

with col1:
    st.subheader("📋 Demographics")
    age = st.slider("Age (years)", min_value=25, max_value=85, value=52, step=1)
    sex = st.radio("Biological Sex", options=[1, 0], format_func=lambda x: "Male" if x == 1 else "Female", horizontal=True)
    cp = st.selectbox(
        "Chest Pain Type",
        options=[0, 1, 2, 3],
        format_func=lambda x: {
            0: "Typical Angina",
            1: "Atypical Angina",
            2: "Non-Anginal Pain",
            3: "Asymptomatic"
        }[x]
    )

with col2:
    st.subheader("🩺 Baseline Vitals")
    trestbps = st.number_input("Resting Blood Pressure (mm Hg)", min_value=80, max_value=220, value=125, step=1)
    chol = st.number_input("Serum Cholesterol (mg/dl)", min_value=100, max_value=600, value=210, step=1)
    fbs = st.radio("Fasting Blood Sugar > 120 mg/dl", options=[0, 1], format_func=lambda x: "No" if x == 0 else "Yes", horizontal=True)
    restecg = st.selectbox(
        "Resting ECG Result",
        options=[0, 1, 2],
        format_func=lambda x: {
            0: "Normal",
            1: "ST-T Wave Abnormality",
            2: "Left Ventricular Hypertrophy"
        }[x]
    )

with col3:
    st.subheader("🏃 Stress Diagnostics")
    thalach = st.slider("Max Heart Rate (bpm)", min_value=60, max_value=220, value=155, step=1)
    exang = st.radio("Exercise-Induced Angina", options=[0, 1], format_func=lambda x: "No" if x == 0 else "Yes", horizontal=True)
    oldpeak = st.slider("ST Depression (oldpeak)", min_value=0.0, max_value=6.5, value=1.0, step=0.1)
    slope = st.selectbox("ST Slope", options=[0, 1, 2], format_func=lambda x: {0: "Upsloping", 1: "Flat", 2: "Downsloping"}[x])
    ca = st.selectbox("Major Vessels Colored (0–3)", options=[0, 1, 2, 3])
    thal = st.selectbox("Thalassemia Status", options=[1, 2, 3], format_func=lambda x: {1: "Normal", 2: "Fixed Defect", 3: "Reversible Defect"}[x])

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
    
    # Inference
    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1] * 100

    out_col1, out_col2 = st.columns([1, 1.2])

    with out_col1:
        st.subheader("Diagnostic Assessment")
        if probability >= 50.0:
            st.error(f"**High Risk of Heart Disease**\n\nCalculated Probability: **{probability:.1f}%**")
        else:
            st.success(f"**Low / Normal Cardiac Risk**\n\nCalculated Probability: **{probability:.1f}%**")

        st.markdown("""
        **Risk Thresholds:**
        * **< 35%**: Low Risk (Routine monitoring)
        * **35% - 60%**: Moderate Risk (Lifestyle modification & follow-up)
        * **> 60%**: High Risk (Clinical investigation recommended)
        """)

    with out_col2:
        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=probability,
            number={'suffix': "%", 'font': {'size': 24}},
            title={'text': "Cardiac Risk Probability", 'font': {'size': 18}},
            gauge={
                'axis': {'range': [0, 100], 'tickwidth': 1},
                'bar': {'color': "#0F172A"},
                'steps': [
                    {'range': [0, 35], 'color': "#86EFAC"},
                    {'range': [35, 65], 'color': "#FDE047"},
                    {'range': [65, 100], 'color': "#FCA5A5"}
                ],
                'threshold': {
                    'line': {'color': "red", 'width': 4},
                    'thickness': 0.8,
                    'value': probability
                }
            }
        ))
        fig.update_layout(height=260, margin=dict(l=20, r=20, t=30, b=20))
        st.plotly_chart(fig, use_container_width=True)
import os
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, recall_score, roc_auc_score

# 1. Verify Dataset Exists
DATA_PATH = "data/heart.csv"
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Missing '{DATA_PATH}'. Ensure heart.csv is inside the 'data' folder.")

print("Loading dataset...")
df = pd.read_csv(DATA_PATH)

# Standardize target column name if needed
if "output" in df.columns:
    df = df.rename(columns={"output": "target"})

# In the raw Cleveland dataset, target 0 represented severe disease presence (high ST depression,
# severe angina, blocked vessels), while target 1 represented absence of disease.
# Invert target so 1 = disease present (High Risk) and 0 = healthy / no disease (Low Risk).
# This guarantees model.predict_proba(X)[:, 1] * 100 directly reflects cardiovascular risk probability.
df["target"] = 1 - df["target"]

# 2. Separate Features (X) and Target (y)
X = df.drop(columns=["target"])
y = df["target"]

# 3. Train-Test Split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# 4. Feature Scaling for Continuous Variables
continuous_features = ["age", "trestbps", "chol", "thalach", "oldpeak"]
scaler = StandardScaler()

X_train_scaled = X_train.copy()
X_test_scaled = X_test.copy()

X_train_scaled[continuous_features] = scaler.fit_transform(X_train[continuous_features])
X_test_scaled[continuous_features] = scaler.transform(X_test[continuous_features])

# 5. Benchmark Models
rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
lr_model = LogisticRegression(random_state=42)

models = {
    "Logistic Regression": lr_model,
    "Random Forest": rf_model
}

print("\n--- Model Training & Benchmarking ---")
for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    y_proba = model.predict_proba(X_test_scaled)[:, 1]
    
    acc = accuracy_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_proba)
    
    print(f"\n{name}:")
    print(f"  Accuracy: {acc * 100:.2f}%")
    print(f"  Recall:   {rec * 100:.2f}%")
    print(f"  ROC-AUC:  {auc * 100:.2f}%")

# Primary deployment model: 100-tree Random Forest
best_model = rf_model

# 6. Save Model Artifacts
os.makedirs("models", exist_ok=True)
joblib.dump(best_model, "models/heart_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")
joblib.dump(list(X.columns), "models/feature_names.pkl")

print(f"\nSaved primary model (Random Forest, 100 Trees) and preprocessor to 'models/' successfully.")
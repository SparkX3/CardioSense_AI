import joblib
import json
import numpy as np

model = joblib.load("models/heart_model.pkl")
scaler = joblib.load("models/scaler.pkl")
feature_names = joblib.load("models/feature_names.pkl")

# Continuous features
continuous_features = ["age", "trestbps", "chol", "thalach", "oldpeak"]
continuous_indices = [feature_names.index(f) for f in continuous_features]

scaler_data = {
    "continuous_features": continuous_features,
    "continuous_indices": continuous_indices,
    "mean": scaler.mean_.tolist(),
    "scale": scaler.scale_.tolist()
}

trees_data = []
for estimator in model.estimators_:
    tree = estimator.tree_
    tree_dict = {
        "children_left": tree.children_left.tolist(),
        "children_right": tree.children_right.tolist(),
        "feature": tree.feature.tolist(),
        "threshold": tree.threshold.tolist(),
        # Value is shape (n_nodes, 1, n_classes)
        "value": tree.value[:, 0, :].tolist()
    }
    trees_data.append(tree_dict)

bundle = {
    "model_type": "RandomForestClassifier",
    "feature_names": feature_names,
    "classes": model.classes_.tolist(),
    "n_classes": len(model.classes_),
    "scaler": scaler_data,
    "trees": trees_data
}

with open("models/model_bundle.json", "w") as f:
    json.dump(bundle, f)

print(f"Successfully exported {len(trees_data)} trees and scaler to models/model_bundle.json")

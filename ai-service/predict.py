from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the real Manafwa XGBoost model
MODEL_PATH = "manafwa_xgboost_model.pkl"

model = joblib.load(MODEL_PATH)

CLASS_NAMES = {
    0: "Normal",
    1: "Mild",
    2: "Advanced",
    3: "Extreme"
}


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "Manafwa XGBoost Prediction API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON data received"
            }), 400

        # Get the features sent by the client
        features = data.get("features")

        if not features:
            return jsonify({
                "success": False,
                "message": "Missing 'features'"
            }), 400

        # Convert features to numpy array
        X = np.array(features).reshape(1, -1)

        # Prediction
        prediction = model.predict(X)[0]

        # Probability
        probabilities = model.predict_proba(X)[0]

        risk_level = CLASS_NAMES.get(
            int(prediction),
            "Unknown"
        )

        return jsonify({
            "success": True,
            "prediction": int(prediction),
            "risk_level": risk_level,
            "probabilities": probabilities.tolist()
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
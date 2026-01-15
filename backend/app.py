from flask import Flask, request, jsonify
from ai.summarizer import generate_summary

from ocr.cleaning import clean_text
from ocr.extractor import extract_text_from_image

from flask_cors import CORS
from routes.ocr_routes import ocr_routes
from routes.user_routes import user_routes   # add user routes

import os
import uuid

# ---------- OCR IMPORT ----------
import easyocr

# ---------- FIREBASE ----------
import firebase_admin
from firebase_admin import credentials, firestore

# ------------------------------------

app = Flask(__name__)
CORS(app)

# ---------- INITIALIZE FIREBASE ----------
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# ---------- EASY OCR INITIALIZATION ----------
reader = easyocr.Reader(['en'])   # loads English OCR


# ==================================================
#  ROUTE 1: TEST ROUTE
# ==================================================
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend running successfully!"})


# ==================================================
#  ROUTE 2: OCR EXTRACTION
# ==================================================
@app.route("/extract", methods=["POST"])
def extract_text_route():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        image = request.files['image']

        img_path = os.path.join("uploads", image.filename)
        image.save(img_path)

        # Run OCR
        extracted_text = extract_text_from_image(img_path)

        # Clean text
        cleaned_text = clean_text(extracted_text)

        # Generate summary
        summary = generate_summary(cleaned_text)

        os.remove(img_path)

        return jsonify({
            "extracted_text": cleaned_text,
            "summary": summary
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================================================
#  REGISTER ROUTES (THIS MUST BE OUTSIDE)
# ==================================================
app.register_blueprint(ocr_routes)
app.register_blueprint(user_routes)


# ==================================================
#  MAIN RUN
# ==================================================
if __name__ == "__main__":
    if not os.path.exists("uploads"):
        os.makedirs("uploads")

    app.run(host="0.0.0.0", port=5000, debug=True)

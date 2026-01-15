from flask import Blueprint, request, jsonify
import os
from ocr.extractor import extract_text_from_image
from ocr.cleaning import clean_text

ocr_routes = Blueprint("ocr_routes", __name__)

UPLOAD_FOLDER = "uploads"

# Ensure uploads folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@ocr_routes.route("/extract", methods=["POST"])
def extract_text():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        image = request.files["image"]

        # Save image temporarily
        img_path = os.path.join(UPLOAD_FOLDER, image.filename)
        image.save(img_path)

        # Extract raw OCR text
        raw_text = extract_text_from_image(img_path)

        # Clean the text
        cleaned_text = clean_text(raw_text)

        # Remove temp file
        os.remove(img_path)

        return jsonify({
            "extracted_text": cleaned_text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

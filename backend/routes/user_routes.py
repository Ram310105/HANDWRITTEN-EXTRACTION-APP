from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import uuid
import datetime

user_routes = Blueprint("user_routes", __name__)


# ============================================================
#  SAVE EXTRACTION HISTORY FOR A USER
# ============================================================
@user_routes.route("/save-history", methods=["POST"])
def save_history():
    try:
        db = firestore.client()   # <-- FIXED: moved inside function

        data = request.json

        user_id = data.get("userId")
        text = data.get("text")
        image_url = data.get("imageUrl", "")
        date = data.get("date", str(datetime.datetime.now()))

        if not user_id or not text:
            return jsonify({"error": "Missing required fields"}), 400

        history_ref = db.collection("users").document(user_id).collection("extractions")

        history_id = str(uuid.uuid4())

        history_ref.document(history_id).set({
            "text": text,
            "imageUrl": image_url,
            "date": date
        })

        return jsonify({"message": "History saved successfully", "id": history_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================================
#  GET ALL HISTORY FOR A USER
# ============================================================
@user_routes.route("/get-history/<user_id>", methods=["GET"])
def get_history(user_id):
    try:
        db = firestore.client()  # <-- FIXED: moved inside function

        history_ref = db.collection("users").document(user_id).collection("extractions")
        snapshots = history_ref.stream()

        history_list = []

        for doc in snapshots:
            item = doc.to_dict()
            item["id"] = doc.id
            history_list.append(item)

        return jsonify({"history": history_list})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

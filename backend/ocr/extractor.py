import easyocr
import os

# Store models in D drive instead of C drive
MODEL_DIR = "D:/easyocr-models"
os.makedirs(MODEL_DIR, exist_ok=True)

reader = easyocr.Reader(['en'], gpu=False, model_storage_directory=MODEL_DIR)

def extract_text_from_image(image_path):
    try:
        results = reader.readtext(image_path, detail=0)
        return "\n".join(results)
    except Exception as e:
        print("OCR ERROR:", e)
        return ""

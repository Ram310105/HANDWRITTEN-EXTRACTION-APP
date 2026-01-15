import React, { useState } from "react";
import axios from "axios";

function UploadBox({ onExtract }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/extract",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onExtract(res.data.extracted_text || "");
    } catch (err) {
      alert("Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Upload Handwritten Image</h2>

      <div
        style={{
          ...styles.dropZone,
          borderColor: dragActive ? "#1E88E5" : "#bbb",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={styles.fileInput}
        />

        <p style={styles.dropText}>
          Click to upload or drag & drop <br />
          <span style={{ fontSize: 12 }}>Max size: 10MB</span>
        </p>
      </div>

      {preview && (
        <img src={preview} alt="preview" style={styles.preview} />
      )}

      <button
        onClick={uploadImage}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
    maxWidth: "650px",
    margin: "auto",
    textAlign: "center",
  },

  title: {
    marginBottom: "15px",
    fontWeight: "600",
  },

  dropZone: {
    border: "2px dashed #bbb",
    borderRadius: "12px",
    padding: "35px",
    cursor: "pointer",
    position: "relative",
    background: "#f9fafc",
  },

  dropText: {
    color: "#555",
    fontSize: "15px",
  },

  fileInput: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
  },

  preview: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "contain",
    marginTop: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  button: {
    marginTop: "20px",
    padding: "12px 25px",
    background: "#1E88E5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default UploadBox;

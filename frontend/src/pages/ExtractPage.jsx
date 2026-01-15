import React, { useState } from "react";
import axios from "axios";
import TextDisplay from "../components/TextDisplay";

function ExtractPage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!image) return alert("Upload an image");

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/extract", formData);
    setResult(res.data.extracted_text);
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleUpload}>Extract</button>

      <TextDisplay text={result} />
    </div>
  );
}

export default ExtractPage;

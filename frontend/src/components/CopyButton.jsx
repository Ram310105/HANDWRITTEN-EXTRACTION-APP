import React from "react";

function CopyButton({ text }) {
  const copyToClipboard = () => {
    if (!text) {
      alert("No text available to copy!");
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy text.");
      });
  };

  return (
    <button 
      onClick={copyToClipboard} 
      style={styles.button}
    >
      Copy Text
    </button>
  );
}

const styles = {
  button: {
    padding: "10px 18px",
    background: "#007BFF",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  }
};

export default CopyButton;

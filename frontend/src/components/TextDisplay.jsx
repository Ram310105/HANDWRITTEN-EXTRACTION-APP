import React from "react";

function TextDisplay({ text }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Extracted Text</h2>

      <textarea
        style={styles.textBox}
        value={text}
        readOnly
      />

    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "700px",
    margin: "20px auto",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 3px 12px rgba(0,0,0,0.1)",
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  textBox: {
    width: "100%",
    height: "300px",
    padding: "15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #aaa",
    outline: "none",
    resize: "none",
    whiteSpace: "pre-wrap",
  },
};

export default TextDisplay;

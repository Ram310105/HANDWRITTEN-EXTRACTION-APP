import React from "react";

function HistoryCard({ item, onOpen }) {
  return (
    <div style={styles.card}>
      {/* Image Preview */}
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt="extracted" 
          style={styles.image}
        />
      )}

      {/* Text Info */}
      <div style={styles.infoContainer}>
        <h3 style={styles.title}>Extraction Result</h3>

        <p style={styles.preview}>
          {item.text.length > 80 
            ? item.text.substring(0, 80) + "..." 
            : item.text}
        </p>

        <p style={styles.date}>📅 {item.date}</p>

        <button 
          style={styles.button} 
          onClick={() => onOpen(item)}
        >
          View More
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "row",
    padding: "15px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "15px",
    width: "100%",
    maxWidth: "600px",
  },
  image: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "15px",
    border: "1px solid #ddd",
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: "20px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  preview: {
    fontSize: "15px",
    color: "#444",
    marginBottom: "8px",
  },
  date: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "10px",
  },
  button: {
    padding: "8px 15px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default HistoryCard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion, useScroll, useTransform } from "framer-motion";

function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [email, setEmail] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 300], [0, 15]);
  const y = useTransform(scrollY, [0, 300], [0, -80]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      setEmail(user.email);
      setLoginTime(new Date().toLocaleString());

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserName(snap.data().username);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      {/* LEFT */}
      <motion.div
        style={{ ...styles.left, rotateX: rotate, y }}
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          style={styles.brand}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          Handwriting Extractor
        </motion.h1>
        <p style={styles.tagline}>
          AI-powered text extraction from handwritten and printed documents.
        </p>
      </motion.div>

      {/* RIGHT */}
      <div style={styles.right}>
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div>
            <h2>Welcome, {userName} 👋</h2>
            <p style={styles.meta}>{email}</p>
            <p style={styles.meta}>Login time: {loginTime}</p>
          </div>

          <motion.button
            onClick={handleLogout}
            style={styles.logout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.div>

        <motion.div
          style={styles.card}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          whileHover={{ rotateX: 6, rotateY: -6 }}
        >
          <h3>Your One-Stop OCR Tool</h3>
          <p style={styles.cardText}>
            Upload handwritten or printed images and extract text instantly.
          </p>

          <motion.button
            style={styles.uploadBtn}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/extract")}
          >
            Upload & Extract
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    background: "#0b0b0b",
    color: "#fff",
    fontFamily: "Inter, Segoe UI, sans-serif",
    perspective: "1200px",
  },
  left: {
    width: "40%",
    padding: "70px",
    background: "linear-gradient(160deg,#141e30,#243b55)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  brand: {
    fontSize: "42px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
  tagline: {
    fontSize: "18px",
    opacity: 0.85,
  },
  right: {
    width: "60%",
    padding: "50px",
    background: "#101010",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "50px",
  },
  meta: {
    fontSize: "14px",
    color: "#aaa",
  },
  logout: {
    background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
    border: "none",
    padding: "12px 22px",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    padding: "45px",
    borderRadius: "20px",
    maxWidth: "520px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
    transformStyle: "preserve-3d",
  },
  cardText: {
    color: "#ccc",
    margin: "15px 0 35px",
  },
  uploadBtn: {
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    border: "none",
    padding: "15px 30px",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "14px",
    cursor: "pointer",
  },
};

export default Dashboard;

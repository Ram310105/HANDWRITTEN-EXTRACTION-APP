import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      localStorage.setItem("user", res.user.uid);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      alert("Enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, form.email);
      alert("Password reset email sent");
    } catch {
      alert("Error sending reset email");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        <input
          name="email"
          placeholder="Email address"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.forgot} onClick={handleForgotPassword}>
          Forgot password?
        </div>

        <button
          onClick={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#141e30,#243b55)",
    fontFamily: "Inter, Segoe UI, sans-serif",
  },
  card: {
    width: "360px",
    padding: "40px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    borderRadius: "18px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "6px",
  },
  subtitle: {
    color: "#ccc",
    fontSize: "14px",
    marginBottom: "30px",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    marginBottom: "14px",
    fontSize: "15px",
  },
  forgot: {
    alignSelf: "flex-end",
    fontSize: "13px",
    color: "#8ab4f8",
    cursor: "pointer",
    marginBottom: "25px",
  },
  button: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Login;

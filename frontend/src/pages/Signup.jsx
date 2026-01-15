import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    if (!email || !password || !username) {
      alert("Please fill all fields.");
      return;
    }

    try {
      // Create account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Save user data in Firestore
      await setDoc(doc(db, "users", uid), {
        username: username,
        email: email,
        createdAt: new Date().toISOString()
      });

      alert("Signup successful!");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign up</h2>

        <input
          type="text"
          placeholder="User name"
          className="auth-input"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signup} className="auth-button">
          Sign up
        </button>

        <Link to="/login" className="auth-link">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;

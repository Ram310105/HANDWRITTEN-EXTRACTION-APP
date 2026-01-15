import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      navigate("/login");
    });
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo / App Name */}
      <Link to="/" style={styles.logo}>
        Handwriting Extractor
      </Link>

      {/* Nav Items */}
      <div style={styles.navItems}>
        {isLoggedIn && (
          <>
            <Link to="/extract" style={styles.link}>Extract</Link>
            <Link to="/history" style={styles.link}>History</Link>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.button}>Login</Link>
            <Link to="/signup" style={styles.button}>Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E88E5",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    textDecoration: "none",
  },

  navItems: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
  },

  button: {
    padding: "8px 15px",
    background: "#fff",
    color: "#1E88E5",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
  },

  logoutBtn: {
    padding: "8px 15px",
    background: "#FF5252",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;

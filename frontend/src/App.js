import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignupPage from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ExtractPage from "./pages/ExtractPage";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth pages */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* OCR page */}
      <Route path="/extract" element={<ExtractPage />} />

      {/* Fallback */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;

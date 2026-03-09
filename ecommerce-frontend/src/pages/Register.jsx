import React, { useState } from "react";
import api from "../api";
import "./Register.css";

function Register({ setPage }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const submit = async () => {
    try {
      await api.post("/auth/register", form);
      setMessage("Registration successful! You can now log in.");
    } catch (e) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join us and start shopping</p>

        {message && <p className="register-message">{message}</p>}

        <input
          className="input-field"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="input-field"
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="input-field"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="register-btn" onClick={submit}>
          Register
        </button>

        <p className="login-text">
          Already have an account? 
          <span className="link" onClick={() => setPage("login")}> Login</span>
        </p>

      </div>
    </div>
  );
}

export default Register;

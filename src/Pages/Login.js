// src/Pages/Login.js
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handle(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        {
          email,
          password,
        }
      );

      alert(response.data.message);
      localStorage.setItem("Token", response.data.token);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert("Server error");
      }
    }
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handle}>
        <h2>Login</h2>

        <input
          className="input-field"
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-field"
          type="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" type="submit">
          LOGIN
        </button>

        <p className="small-text">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </div>
  );
}

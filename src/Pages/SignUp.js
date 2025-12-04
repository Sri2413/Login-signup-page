// src/Pages/SignUp.js
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handle(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          name,
          email,
          dob,
          password,
        }
      );

      alert(response.data.message);
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
    <div className="signup-container">
      <form className="signup-box" onSubmit={handle}>
        <h2>Create Account</h2>

        <input
          className="input-field"
          type="text"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          type="date"
          placeholder="Date of Birth"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <input
          className="input-field"
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="input-field"
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="submit-btn" type="submit">
          SIGN UP
        </button>

        <p className="small-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

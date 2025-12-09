// src/Pages/SignUp.js
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //email checking functionality:

  function emailCheck(email) {
    let hasAt = false;
    let hasDot = false;

    for (let ch of email) {
      if (ch === "@") hasAt = true;
      if (ch === ".") hasDot = true;
    }

    if (!hasAt || !hasDot) {
      toast.error("Email must contain @ and .");
      return false;
    }

    if (email.length < 6) {
      toast.error("Invalid Email");
      return false;
    }
    if (!email.endsWith(".com")) {
      toast.error("Email must ends with .com");
      return false;
    }

    return true;
  }

  //password checking functionality:
  function passWordCheck(password) {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSpecial = false;

    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let small = "abcdefghijklmnopqrstuvwxyz";
    let numeric = "0123456789";
    let specialCharacters = "!@#$%^&*()?><:}{[]./,;";

    for (let ch of password) {
      if (alpha.includes(ch)) hasUpper = true;
      else if (small.includes(ch)) hasLower = true;
      else if (numeric.includes(ch)) hasNumber = true;
      else if (specialCharacters.includes(ch)) hasSpecial = true;
    }

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      toast.error(
        "Password must contain Uppercase, Lowercase, Number and Special Character"
      );
      return false;
    }

    return true;
  }

  async function handle(e) {
    e.preventDefault();

    if (!emailCheck(email)) return;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password length must be 6 or more");
      return;
    }

    // Run Password Validation
    if (!passWordCheck(password)) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/signup`,
        {
          name,
          email,
          dob,
          password,
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server error");
      }
    }
  }

  return (
    <div className="signup-container">
      <ToastContainer position="top-center" />

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

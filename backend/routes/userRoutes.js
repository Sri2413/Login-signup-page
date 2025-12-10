// backend/routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, dob, password } = req.body;
    console.log("Signup request body:", req.body); // Add this

    if (!name || !email || !dob || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      dob,
      password: hashedPassword,
    });

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
    };

    res
      .status(201)
      .json({ message: "User Registered Successfully", user: userSafe });
  } catch (err) {
    console.error("Signup error:", err); // <-- check console for full error
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("login request body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: "10m",
    });

    res.json({ message: "Login Successful", token });
    console.log(token);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

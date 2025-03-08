import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ error: "Invalid credentials" });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default router;

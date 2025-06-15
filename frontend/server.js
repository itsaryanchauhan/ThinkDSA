// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import geminiRoutes from "./geminiRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/thinkdsa",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  geminiKey: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Registration endpoint
app.post("/api/register", async (req, res) => {
  const { email, password, name, geminiKey } = req.body;
  if (!email || !password || !name || !geminiKey) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered." });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, name, geminiKey });
    await user.save();
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      geminiKey: user.geminiKey,
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed." });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      geminiKey: user.geminiKey,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed." });
  }
});

app.use("/api", geminiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

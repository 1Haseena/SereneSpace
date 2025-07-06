// file: server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://skhaseena3034:serene1234@cluster0.v3x1vqp.mongodb.net/serenespace?retryWrites=true&w=majority", {
  ssl: true,
  tlsInsecure: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


const Thought = require("./Thought");

// Test route
app.get("/", (req, res) => {
  res.send("🌿 SereneSpace backend is working!");
});

app.post("/thought", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const newThought = new Thought({ message });
    await newThought.save();
    res.status(201).json({ success: true, thought: newThought });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
// GET /thoughts - Return all saved thoughts
app.get("/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch thoughts" });
  }
});

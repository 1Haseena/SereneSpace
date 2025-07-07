// file: Thought.js
const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Thought", ThoughtSchema);

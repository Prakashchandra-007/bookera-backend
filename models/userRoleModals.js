const mongoose = require("mongoose");

const userRoles = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, required: true, ref: "userData" },
  role_id: { type: mongoose.Schema.ObjectId, required: true, ref: "role" },
  role: { type: String },
});

module.exports = mongoose.model("userRoles", userRoles);

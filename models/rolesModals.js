const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  display_name: { type: String },
  description: { type: String },

  created_at: {
    type: String,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true,
  },
  updated_at: {
    type: String,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true,
  },
});

module.exports = mongoose.model("role", roleSchema);

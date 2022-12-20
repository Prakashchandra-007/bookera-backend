const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  url: {
    type: String,
    default: "",
  },
  author: { type: String, default: "" },
  created_at: { type: String, default: null },
  update_at: {
    type: String,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true,
  },
  created_by: {
    type: String,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true,
  },
  updated_by: { type: String, default: null },

  type: { type: Array, default: [] },
  upload_to: { type: String, default: null },
});

module.exports = mongoose.model("image", imageSchema);

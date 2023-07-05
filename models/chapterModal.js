const mongoose = require("mongoose");
const chapterData = new mongoose.Schema({
  book_id: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: "bookData",
  },
  slug: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  html_content_text: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  updated_at: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  created_by: { type: String, default: null },
  updated_by: { type: String, default: null },
  restricted: { type: Array, default: [] },
});

module.exports = mongoose.model("chapterData", chapterData);

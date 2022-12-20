const mongoose = require("mongoose");
const pageData = new mongoose.Schema({
 
  book_id: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: "bookData",
  },
  name: {
    type: String,
    default: "",
  },
  chapter_Id: {
    type: String,
    default: "",
  },
  html: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    
  },
  updatedAt: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    
  },
  createdBy: { type: String, default: null },
  updatedBy: { type: String, default: null },
  restricted: { type: Array, default: [] },
  draft: { type: String, default: null },
  markdown: { type: String, default: null },
  revision_count: { type: String },
  template: { type: String, default: null },
});

module.exports = mongoose.model("pageData", pageData);

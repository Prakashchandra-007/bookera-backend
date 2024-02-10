const mongoose = require("mongoose");

const chapterBlockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const chapterDataSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  blocks: {
    type: [chapterBlockSchema],
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
});

const chapterSchema = new mongoose.Schema({
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
  chapterData: chapterDataSchema,
});

module.exports = mongoose.model("chapterData", chapterSchema);

const mongoose = require("mongoose");
const tags = new mongoose.Schema({
  entity_id: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: "bookData",
  },
  entity_type: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  order: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true,
  },
  updated_at: {
    type: Date,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true,
  },
});

module.exports = mongoose.model("tags", tags);

const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  category: { type: String, default: "" },
  image: {
    type: String,
  },
  avg_rating: {
    type: Number,
    default: 0,
  },
  author: { type: String, default: "" },
  createdAt: {
    type: String,
    default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true,
  },
  tags: { type: Array, default: [] },
  recommendation_to: { type: Array, default: [] },
});

module.exports = mongoose.model("bookData", bookSchema);

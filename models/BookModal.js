const mongoose = require("mongoose");
const PublishStatus = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "english",
  },
  category: { type: String, default: "" },
  subCategory: { type: String, default: "" },
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
    default: new Date(),
    required: true,
  },

  tags: { type: Array, default: [] },
  recommendation_to: { type: Array, default: [] },
  deleted: {
    type: Boolean,
    default: false,
  },
  publishStatus: {
    type: String,
    enum: Object.values(PublishStatus),
    default: PublishStatus.DRAFT,
  },
});

module.exports = mongoose.model("bookData", bookSchema);

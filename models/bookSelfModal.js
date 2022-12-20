const mongoose = require("mongoose");
import contentId from "./contentModal";
const bookSelfData = new mongoose.Schema({
  content_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: contentId,
  },
  createdAt: { type: date },
  updatedAt: { type: date },
});

module.exports = mongoose.model("bookSelfData", bookSelfData);
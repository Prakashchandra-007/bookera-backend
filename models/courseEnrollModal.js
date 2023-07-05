const mongoose = require("mongoose");
const courseEnrollData = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: "userData",
    unique: true,
  },
  enrolledCourses: {
    type: Array,
    default: [],
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
});

module.exports = mongoose.model("courseEnrollData", courseEnrollData);

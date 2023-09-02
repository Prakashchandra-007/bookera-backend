const mongoose = require("mongoose");

const purchasedBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData", // Reference to the User model
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Reference to the Book model
    required: true,
  },
  currentChapter: {
    type: Number,
    default: 0, // Default value is 0
    validate: {
      validator: (value) => {
        return value >= 0; // Validate that currentChapter is non-negative
      },
      message: "Current chapter must be a non-negative number",
    },
  },
  lastReadTimestamp: {
    type: Date,
    default: Date.now, // Default value is the current timestamp
  },
  purchasedDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PurchasedBook", purchasedBookSchema);

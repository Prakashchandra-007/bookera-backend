const mongoose = require("mongoose");
import userData from "./userModel";
import bookSchema from "./bookSchema";
var book_id  = mongoose.model('book_id',bookSchema );
const userDataDetails = new mongoose.Schema({
  id: { type: String },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref:'userData'
  },
  content_id:[{
    type:mongoose.schema.ObjectId,
    ref:'book_id'
  }]
});

module.exports = mongoose.model("userDataDetails", userDataDetails);

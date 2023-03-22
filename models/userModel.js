const mongoose = require("mongoose");
const userData = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  password: { type: String },
  email_id: {
    type: String,
    require: true,
    unique: true,
  },
  image: { type: String },
  user_role: { type: String },
  user_location: { type: String },
  user_phone: { type: String },
  user_social_ids: { type: Array },
  user_career_status: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("userData", userData);

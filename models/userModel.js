const mongoose = require("mongoose");
const Role = require("./roleModal");
const userData = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  password: { type: String, required: true },
  email_id: {
    type: String,
    require: true,
    unique: true,
  },
  image: { type: String },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "64bbd8e5a3b91288cdb5129e",
  },
  user_location: { type: String },
  user_phone: { type: String },
  user_social_ids: { type: Array },
  user_career_status: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("userData", userData);

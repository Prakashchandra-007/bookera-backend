const mongoose = require("mongoose");
const authData = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("authData", authData);

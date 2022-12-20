const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Data", dataSchema);

// const userData = new mongoose.Schema({
//   name: {
//     required: true,
//     type: String,
//   },
//   password: {type: String, required: true},
//   email_id: {
//     required: true,
//     type: String,
//   },
//   user_role: {type: String,},
//   user_location:{type: String,},
//   user_phone:{type: String,},
//   user_social_ids:{type: Array,},
//   user_career_status: {type: String,},
// });

// module.exports = mongoose.model("userData", userData);
const Consumed_content = new mongoose.Schema({

});



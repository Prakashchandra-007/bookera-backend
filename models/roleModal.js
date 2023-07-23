// models/roleModel.js

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    editCourse: {
      type: Boolean,
      default: false,
    },
    verifyCourse: {
      type: Boolean,
      default: false,
    },
    seeAnalytics: {
      type: Boolean,
      default: false,
    },
    publishContent: {
      type: Boolean,
      default: false,
    },
    canViewRoles: {
      type: Boolean,
      default: false,
    },
    // Add more permissions here as needed
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;

// middlewares/checkPermission.js

const Role = require("../models/roleModal");

class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermissionError";
  }
}

const checkPermission = (permission) => async (req, res, next) => {
  const { role } = req.user;
  try {
    // Fetch the role from the database based on the user's role name
    const userRole = await Role.findOne({ _id: role });
    // Check if the user's role has the specified permission
    if (!userRole.permissions[permission]) {
      return next(new PermissionError("Permission denied"));
    }

    next();
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Error fetching role" });
  }
};

module.exports = { checkPermission, PermissionError };

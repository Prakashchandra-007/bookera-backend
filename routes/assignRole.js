const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Role = require("../models/roleModal");
const checkPermission = require("../middleware/checkPermission");

// Route to assign roles to users
router.patch(
  "/assign-role",
  checkPermission("canAssignRoles"),
  async (req, res) => {
    try {
      const { email, roleName } = req.body;

      // Validate inputs
      if (!email || !roleName) {
        return res
          .status(400)
          .json({ message: "Email and roleName are required" });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the role in the role table
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      // Update the user's role with the new role
      user.role = roleName;
      await user.save();

      res.json({ message: "Role assigned successfully", user });
    } catch (error) {
      console.error("Error assigning role:", error);
      res.status(500).json({ message: "Error assigning role" });
    }
  }
);

module.exports = router;

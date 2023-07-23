// routes/roles.js

const express = require("express");
const router = express.Router();
const Role = require("../models/roleModal");
const {
  checkPermission,
  PermissionError,
} = require("../middlewares/permissionMiddleware");

// Route to create a new role (requires admin permission)
router.post("/roles", checkPermission("canCreateRoles"), async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.json({ message: "Role created successfully", role });
  } catch (error) {
    if (error instanceof PermissionError) {
      return res.status(403).json({ message: "Permission denied" });
    }
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Error creating role" });
  }
});

// Route to update a role (requires admin permission)
router.patch(
  "/roles/:roleId",
  checkPermission("canEditRoles"),
  async (req, res) => {
    try {
      const { roleId } = req.params;
      const { name, permissions } = req.body;
      const role = await Role.findByIdAndUpdate(
        roleId,
        { name, permissions },
        { new: true }
      );
      res.json({ message: "Role updated successfully", role });
    } catch (error) {
      if (error instanceof PermissionError) {
        return res.status(403).json({ message: "Permission denied" });
      }
      console.error("Error updating role:", error);
      res.status(500).json({ message: "Error updating role" });
    }
  }
);

// Route to delete a role (requires admin permission)
router.delete(
  "/roles/:roleId",
  checkPermission("canDeleteRoles"),
  async (req, res) => {
    try {
      const { roleId } = req.params;
      await Role.findByIdAndDelete(roleId);
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      if (error instanceof PermissionError) {
        return res.status(403).json({ message: "Permission denied" });
      }
      console.error("Error deleting role:", error);
      res.status(500).json({ message: "Error deleting role" });
    }
  }
);

// Route to get the list of all roles (requires admin permission)
router.get("/roles", checkPermission("canViewRoles"), async (req, res) => {
  try {
    const roles = await Role.find();
    res.json({ roles });
  } catch (error) {
    if (error instanceof PermissionError) {
      return res.status(403).json({ message: "Permission denied" });
    }
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Error fetching roles" });
  }
});

module.exports = router;

// middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Token not provided" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    try {
      // Fetch the user from the database
      const foundUser = await User.findById(user.id);
      if (!foundUser)
        return res.status(404).json({ message: "User not found" });

      // Attach the user's role and permissions to the request object
      req.user = {
        id: user.id,
        email_id: user.email_id,
        role: foundUser.role,
        permissions: foundUser.permissions,
      };

      next();
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
    }
  });
};

module.exports = authenticateToken;

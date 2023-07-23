const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Role = require("../models/roleModal");
//reset pass imports
const crypto = require("crypto");
const nodemailer = require("nodemailer");
//jwt imports
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // Replace this with a secure secret key

// User registration
const sanitizeHtml = require("sanitize-html");
const { validateEmail, validatePassword } = require("../Utilities/validation");
const authenticateToken = require("../middlewares/jwtMiddleware");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

router.post("/register", async (req, res) => {
  try {
    let { email_id, password, name, user_role, user_location, user_phone } =
      req.body;

    // Sanitize input
    email_id = sanitizeHtml(email_id);
    password = sanitizeHtml(password);
    name = sanitizeHtml(name);
    user_role = sanitizeHtml(user_role);
    user_location = sanitizeHtml(user_location);
    user_phone = sanitizeHtml(user_phone);

    // Validate input
    if (!email_id || !password || !name || !user_phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate email format
    if (!emailRegex.test(email_id)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate phone number format
    if (!phoneRegex.test(user_phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Validate password complexity
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      });
    }

    // Check if the email_id already exists
    const existingUser = await User.findOne({ email_id });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email_id,
      password: hashedPassword,
      name,
      user_role,
      user_location,
      user_phone,
    });

    await newUser.save();
    // Token expires in 1 hour
    const token = jwt.sign({ email_id }, secretKey, { expiresIn: "1h" });
    res.status(201).json({
      userRegistered: true,
      message: "User registered successfully",
      token,
    });
    // res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// User login
router.post("/login", passport.authenticate("local"), async (req, res) => {
  // User authenticated successfully
  try {
    // Get the user's email and role ID from req.user
    const { email_id, role } = req.user;

    // Fetch the role details using the role ID
    const roleDetails = await Role.findById(role);
    if (!roleDetails) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Extract the necessary role information from roleDetails (e.g., permissions)
    const { permissions, name } = roleDetails;

    // Token expires in 1 hour
    const token = jwt.sign({ email_id, role: name, permissions }, secretKey, {
      expiresIn: "1h",
    });

    // Respond with the token and other data as needed
    res.json({
      isLogined: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Error fetching role" });
  }
});

// Route for requesting password reset

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  // Validate email input
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Generate a secure token for password reset
  const token = crypto.randomBytes(32).toString("hex");

  try {
    // Find the user associated with the email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store the token in the user's document (you can use any field, e.g., resetToken)
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Save the updated user
    await user.save();

    // Send the password reset link to the user's email address
    sendPasswordResetEmail(email, token);

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
});

//Route for handling password reset
router.post("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Validate password input
  if (!password || password.length < 8) {
    return res.status(400).json({
      message: "Invalid password. Password must be at least 8 characters long",
    });
  }

  // Validate the token and find the user associated with the token
  const user = findUserByToken(token);

  if (!user) {
    return res.status(404).json({ message: "Invalid or expired token" });
  }

  // Update the user's password with the new password
  user.password = password;

  // Save the updated user
  user.save();

  res.json({ message: "Password reset successful" });
});

// POST route to handle "Forgot Password" request
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Find the user by email (case-insensitive search)
    const user = await User.findOne({
      email_id: email,
    }).catch((error) => {
      console.error("Error finding user:", error);
      return null; // Return null or any other value to indicate user not found
    });
    console.log(user);
    if (!user) {
      // Return success message even if the user doesn't exist to avoid email enumeration
      return res.json({ message: "Password reset link sent to your email" });
    }

    // Generate a secure token for password reset
    const token = crypto.randomBytes(32).toString("hex");
    // Update user's reset token and expiry time in the database
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Save the updated user data
    await user.save();

    // Send the password reset link to the user's email address
    sendPasswordResetEmail(email, token);

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgot password route:", error);
    res.status(500).json({ message: "Error processing the request" });
  }
});

// PATCH route to change user password
router.patch("/change-password", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email_id;
    const { oldPassword, newPassword } = req.body;

    // Validate new password input
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message:
          "Invalid new password. Password must be at least 8 characters long and contain a combination of uppercase and lowercase letters, numbers, and special characters.",
      });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email_id: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches the user's current password
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Hash the new password and update the user's password in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password" });
  }
});

// Function to send password reset email
function sendPasswordResetEmail(email, token) {
  // Configure nodemailer to send emails
  const transporter = nodemailer.createTransport({
    // Configuration options for sending emails
    // ...
  });

  // Compose the email message
  const emailMessage = {
    from: "your-email@example.com",
    to: email,
    subject: "Password Reset",
    html: `<p>Please click the following link to reset your password:</p>
           <a href="http://your-website.com/reset-password/${token}">Reset Password</a>`,
  };

  // Send the email
  transporter.sendMail(emailMessage, (error, info) => {
    if (error) {
      console.log("Error sending password reset email:", error);
    } else {
      console.log("Password reset email sent:", info.response);
    }
  });
}

// Function to find user by token
function findUserByToken(token) {
  // Find the user associated with the token in the database
  // ...
  // Return the user object or null if not found
  // ...
}

module.exports = router;

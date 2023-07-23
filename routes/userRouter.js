const authenticateToken = require("../middlewares/jwtMiddleware");
const Model = require("../models/userModel");
const express = require("express");
const router = express.Router();
module.exports = router;

// Post Method
// router.post("/addNewUserData", async (req, res) => {
//   const data = new Model({
//     name: req.body.name,
//     password: req.body.password,
//     image: req.body.image,
//     email_id: req.body.email_id,
//     user_role: req.body.user_role,
//     user_location: req.body.user_location,
//     user_phone: req.bodyuser_phone,
//     user_social_ids: req.body.user_social_ids,
//     user_career_status: req.body.user_career_status,
//     token: req.body.token,
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

//Get all Method
router.get("/getAllUser", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getUserbyid/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by email ID Method
router.get("/getUserbyemail/:emailId", async (req, res) => {
  try {
    const data = await Model.find({ email_id: req.params.emailId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/userUpdate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update by EMAIL Method
router.patch("/userUpdatebyemail/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findOneAndUpdate(email, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH route to update user profile details
router.patch("/profile/settings", authenticateToken, (req, res) => {
  const userEmail = req.user.email_id;
  // Check if the user exists in the database
  console.log(userEmail);
  Model.findOne({ email_id: userEmail })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Update the user's profile data
      user.name = req.body.name || user.name;
      user.user_role = req.body.user_role || user.user_role;
      user.user_location = req.body.user_location || user.user_location;
      user.user_phone = req.body.user_phone || user.user_phone;
      // Save the updated user profile
      return user.save();
    })
    .then((updatedUser) => {
      // Remove sensitive data (e.g., password) before sending the response
      const userProfile = {
        name: updatedUser.name,
        email_id: updatedUser.email_id,
        user_role: updatedUser.user_role,
        user_location: updatedUser.user_location,
        user_phone: updatedUser.user_phone,
        // Add other profile data you want to expose to the user
      };

      res.json(userProfile);
    })
    .catch((error) => {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Error updating user profile" });
    });
});

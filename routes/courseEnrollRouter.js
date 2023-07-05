const Model = require("../models/courseEnrollModal");
const express = require("express");
const router = express.Router();
module.exports = router;

// Post Method
router.post("/addNewEnrollment", async (req, res) => {
  const isPresent = await Model.find({ userId: req.body.userId });
  if (isPresent.length !== 0) {
    res.send("already present so not recoreded");
    return;
  }
  const data = new Model({
    userId: req.body.userId,
    enrolledCourses: req.body.enrolledCourses,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAllEnrollment", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/getAllEnrollmentbyUserId/:id", async (req, res) => {
  try {
    const data = await Model.find({ userId: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by ID Method
router.get("/getEnrollmentByid/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/updateEnrollment/:id", async (req, res) => {
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

//Delete by ID Method
router.delete("/deleteEnroll/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

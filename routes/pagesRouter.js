const Model = require("../models/PageModal");
const express = require("express");
const router = express.Router();
module.exports = router;

// Post Method
router.post("/createPage", async (req, res) => {
  const data = new Model({
      book_id: req.body.book_id,
      name:req.body.name,
      chapter_Id: req.body.chapter_Id,
      html:req.body.html,
      text: req.body.text,
      priority: req.body.priority,
      createdAt:req.body.createdAt,
      updatedAt:req.body.updatedAt,
      createdBy:req.body.createdBy,
      updatedBy: req.body.updatedBy,
      restricted:req.body.restricted,
      draft: req.body.draft,
      markdown: req.body.markdown,
      revision_count: req.body.revision_count,
      template:req.body.template,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAllPages", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getPagebyid/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/updatePage/:id", async (req, res) => {
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
router.delete("/deletePage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

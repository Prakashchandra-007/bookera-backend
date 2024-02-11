const Model = require("../models/chapterModal");
const express = require("express");
const router = express.Router();
module.exports = router;

// Post Method
// router.post("/addNewChapter", async (req, res) => {
//   const data = new Model({
//     book_id: req.body.book_id,
//     slug: req.body.slug,
//     name: req.body.name,
//     html_content_text: req.body.html_content_text,
//     description: req.body.description,
//     priority: req.body.priority,
//     created_at: req.body.created_at,
//     updated_at: req.body.updated_at,
//     created_by: req.body.created_by,
//     updated_by: req.body.updated_by,
//     restricted: req.body.restricted,
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
router.post("/addNewChapter", async (req, res) => {
  const {
    book_id,
    slug,
    name,
    html_content_text,
    description,
    priority,
    created_at,
    updated_at,
    created_by,
    updated_by,
    restricted,
    chapterData,
    chapterNumber,
  } = req.body;

  try {
    const data = new Model({
      book_id,
      slug,
      name,
      // html_content_text,
      description,
      priority,
      created_at,
      updated_at,
      created_by,
      updated_by,
      restricted,
      chapterNumber,
      chapterData, // Assigning the chapterData property
    });

    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAllChapters", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/getAllChaptersbyBook/:id", async (req, res) => {
  try {
    const data = await Model.find({ book_id: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by ID Method
router.get("/getChapterbyid/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/updateChapter/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let updatedData = req.body;
    // Check if chapterData is included in the request body
    if (updatedData.chapterData) {
      // If included, set chapterData property separately
      const { chapterData, ...rest } = updatedData;
      updatedData = rest;
      updatedData.chapterData = chapterData;
    }

    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/deleteChapter/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

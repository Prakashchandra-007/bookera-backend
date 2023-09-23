const express = require("express");
const Model = require("../models/BookModal");
const router = express.Router();
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
const PublishStatus = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};
// Draft: The book is still being worked on or is not ready for public consumption. It's in a preliminary or incomplete state.
// Published: The book is available to readers and is actively promoted. Readers can access and read the content of the book.
// Archived: The book has been removed from public view, taken out of circulation, or is no longer actively promoted. It may be considered  no longer relevant. Readers typically cannot access or find the book in the same way as published books.
module.exports = router;

// Post create book Method
router.post("/postBook", async (req, res) => {
  const data = new Model({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    avg_rating: req.body.avg_rating,
    author: req.body.author,
    chapters: req.body.chapters,
    createdAt: req.body.createdAt,
    tags: req.body.tags,
    recommended_to: req.body.recommended_to,
  });

  try {
    const dataToSave = await data.save();
    res.status(201).json({ status: true, data: dataToSave }); // 201 Created
  } catch (error) {
    if (res.statusCode > 500) {
      res
        .status(res.statusCode)
        .json({ status: false, message: "Server error" });
    } else {
      res.status(400).json({ status: false, message: error.message }); // 400 Bad Request
    }
  }
});

//Get all books Method
router.get("/getAllBook", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get book by ID Method
router.get("/getBookbyid/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update book by ID Method
router.patch("/updateBook/:id", async (req, res) => {
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

//hard Delete books by ID Method
router.delete("/deleteBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get all published books
router.get("/getAllPublishedBooks", async (req, res) => {
  try {
    const publishedBooks = await Model.find({ publishStatus: "published" });
    res.json(publishedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update publishStatus of a book by ID
router.patch("/updatePublishStatus/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newPublishStatus = req.body.publishStatus;
    // Validate that the newPublishStatus is one of the allowed values (draft, published, archived)
    if (!Object.values(PublishStatus).includes(newPublishStatus)) {
      return res.status(400).json({ message: "Invalid publishStatus value." });
    }

    const options = { new: true };

    const updatedBook = await Model.findByIdAndUpdate(
      id,
      { publishStatus: newPublishStatus },
      options
    );

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Soft delete a book by ID
router.patch("/softDeleteBook/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Find the book by ID and update the deleted field to true
    const updatedBook = await Model.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

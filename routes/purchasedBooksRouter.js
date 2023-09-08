const express = require("express");
const router = express.Router();
const PurchasedBook = require("../models/PurchasedBooksModal");

// GET all purchased books
router.get("/allpurchasedBooks", async (req, res) => {
  try {
    const purchasedBooks = await PurchasedBook.find({});
    res.json(purchasedBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve purchased books" });
  }
});

// GET purchased books by user ID
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userPurchasedBooks = await PurchasedBook.find({ userId });
    res.json(userPurchasedBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve purchased books" });
  }
});

// POST create a new purchase
router.post("/makePurchase", async (req, res) => {
  const { userId, bookId, currentChapter, lastReadTimestamp } = req.body;

  try {
    const newPurchase = new PurchasedBook({
      userId,
      bookId,
      currentChapter,
      lastReadTimestamp,
    });

    const dataToSave = await newPurchase.save();
    res.status(201).json({ success: true, dataToSave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
});

// PUT update a purchase by purchase ID
router.put("/:purchaseId", async (req, res) => {
  const purchaseId = req.params.purchaseId;
  const { currentChapter } = req.body;

  try {
    const updatedPurchase = await PurchasedBook.findByIdAndUpdate(
      purchaseId,
      { currentChapter },
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }

    res.json(updatedPurchase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the purchase" });
  }
});

// DELETE a purchase by purchase ID
router.delete("/:purchaseId", async (req, res) => {
  const purchaseId = req.params.purchaseId;

  try {
    const deletedPurchase = await PurchasedBook.findByIdAndRemove(purchaseId);

    if (!deletedPurchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the purchase" });
  }
});

module.exports = router;

const multer = require("multer");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
// const promise = mongoose.connect(
//   "mongodb+srv://admin:<admin>@cluster0.fedwfpf.mongodb.net/test",
//   { useNewUrlParser: true }
// );
const mongoString =
  "mongodb+srv://admin:admin@cluster0.fedwfpf.mongodb.net/test";
const promise = mongoose.connect(mongoString, { useNewUrlParser: true });
const storage = new GridFsStorage({
  url: mongoString,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });

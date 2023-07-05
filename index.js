// require("dotenv").config();
const routes = require("./routes/routes");
const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");
const pageRouter = require("./routes/pagesRouter");
const chapterRouter = require("./routes/chapterRouter");
const authRouter = require("./routes//authRouter");
const imageRouter = require("./routes/imagesRouter");
const tagRouter = require("./routes/tagsRouter");
const userRoleRouter = require("./routes/userRoleRouter");
const roleRouter = require("./routes/roleRouter");
const upload = require("./routes/imageUploadRouter");
const courseEnrollRouter = require("./routes/courseEnrollRouter");
const ngrok = require("ngrok");
var bodyParser = require("body-parser");
const Grid = require("gridfs-stream");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoString =
  "mongodb+srv://admin:admin@cluster0.fedwfpf.mongodb.net/test&ssl=true";
// const promise = mongoose.connect(mongoString, { useNewUrlParser: true });
const conn = mongoose.connection;
// mongoose.connect(mongoString);
const database = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = Grid(conn, mongoose.mongo);
  gfs.collection("photos");
});
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
// ngrok.connect(2000, () => {
//   console.log("public");
// });

app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    res.send(readStream);
    const readStream = gfs.createReadStream(file.filename, file);
    console.log(readStream);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads"));
app.use("/api", routes);
app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", pageRouter);
app.use("/api", chapterRouter);
app.use("/api", authRouter);
app.use("/api", imageRouter);
app.use("/api", tagRouter);
app.use("/api", userRoleRouter);
app.use("/api", roleRouter);
app.use("/api", courseEnrollRouter);
app.use("/file", upload);

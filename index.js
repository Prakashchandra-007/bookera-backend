require("dotenv").config();
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

const express = require("express");
const mongoose = require("mongoose");
const mongoString =
  "mongodb+srv://admin:admin@cluster0.fedwfpf.mongodb.net/test";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

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

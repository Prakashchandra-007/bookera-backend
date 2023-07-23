// require("dotenv").config();
const routes = require("./routes/routes");
const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");
const pageRouter = require("./routes/pagesRouter");
const chapterRouter = require("./routes/chapterRouter");
const imageRouter = require("./routes/imagesRouter");
const tagRouter = require("./routes/tagsRouter");
const userRoleRouter = require("./routes/userRoleRouter");
const roleRouter = require("./routes/roleRouter");
const upload = require("./routes/imageUploadRouter");
const courseEnrollRouter = require("./routes/courseEnrollRouter");
const authRouter = require("./routes/authRouter");
const ngrok = require("ngrok");
const bodyParser = require("body-parser");
const Grid = require("gridfs-stream");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const mongoString = process.env.DATABASE_URL;
// "mongodb+srv://admin:admin@cluster0.fedwfpf.mongodb.net/test&ssl=true";
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
// auth
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
// ngrok.connect(2000, () => {
//   console.log("public");
// });
// local passport implementation

passport.use(
  new LocalStrategy(
    { usernameField: "email_id" },
    (email_id, password, done) => {
      console.log("?????????", email_id);
      User.findOne({ email_id })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect email_id" });
          }
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return done(err);
            }

            if (result) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password" });
            }
          });
        })
        .catch((err) => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

app.use(passport.initialize());
app.use(passport.session());

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

app.use("/api/auth", authRouter);
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
// app.use("/api", userRoleRouter);
app.use("/api", roleRouter);
app.use("/api", courseEnrollRouter);
app.use("/file", upload);

const Model = require("../models/userModel");
// const Modeluser = require("../models/userModel");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
module.exports = router;

//login
router.post("/login", async (req, res) => {
  const { email_id, password } = req.body;
  try {
    const user = await Model.findOne({ email_id: email_id });
    if (user) {
      //generate and access token
      const accessToken = jwt.sign(
        { id: user._id, userRole: user.user_role },
        "secrecgKey"
      );
      console.log(accessTokens);
      res.json({
        username: user.email_id,
        accessToken: accessToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// res.json(user);
// if (user) {
//   const accesstoken = jwt.sign(
//     { id: user.id, username: user.username },
//     "mysecrestKys13ha"
//   );
//   //screate to should from env
//   res.json(user);
// } else {
//   res.status(404).json("incorrect user data");
// }

//middleware to veryfy token
const verifyUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(token, "seckertKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid ");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(404).json("incorrect ");
  }
};

require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
const { initializeDbConnection } = require("./db/db.connect");

const signup = require("./routes/UsersignUp.router");
const login = require("./routes/UserLogIn.router");
const post = require("./routes/Post.router");
const profile = require("./routes/Profile.router");
const searchedProfile = require("./routes/SearchedProfile.router");
const notification = require("./routes/Notification.route");

const authVerify = require("./middlewares/auth.verify");

app.use(cors());
app.use(bodyParser.json());

initializeDbConnection();

app.get("/", (req, res) => {
  res.send("Hello Worlddd!");
});

app.use("/signup", signup);
app.use("/login", login);
app.use("/posts", authVerify, post);
app.use("/profile", authVerify, profile);
app.use("/searched-profile", authVerify, searchedProfile);
app.use("/notifications", authVerify, notification);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

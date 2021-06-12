require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
const { initializeDbConnection } = require("./db/db.connet");

const signup = require("./routes/UsersignUp.route");
const login = require("./routes/UserLogIn.route");
const post = require("./routes/Post.router");

const authverify = require("./middlewares/auth.verify");

app.use(cors());
app.use(bodyParser.json());

initializeDbConnection();

app.get("/", (req, res) => {
  res.send("Hello Worlddd!");
});

app.use("/signup", signup);
app.use("/login", login);
app.use("/posts", authverify, post);
// app.use("/historyvideos", authverify, history);
// app.use("/likedvideos", authverify, likedVideos);
// app.use("/watchlatervideos", authverify, watchLater);
// app.use("/playlists", authverify, playlist);
// app.use("/dislikedvideos", authverify, dislikedvideos);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

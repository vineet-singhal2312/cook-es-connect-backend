require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
const { initializeDbConnection } = require("./db/db.connet");
// const video = require("./routes/videos.router");
// const history = require("./routes/history.router");
// const likedVideos = require("./routes/likedvideos.router");
// const watchLater = require("./routes/watchlater.router");
// const playlist = require("./routes/playlist.router");
// const dislikedvideos = require("./routes/dislikedvideos.router");
const signup = require("./routes/UsersignUp.route");
// const login = require("./routes/userLogIn.route");
// const authverify = require("./middlewares/auth.verify");

app.use(cors());
app.use(bodyParser.json());

initializeDbConnection();

app.get("/", (req, res) => {
  res.send("Hello Worlddd!");
});
3;
app.use("/signup", signup);
// app.use("/login", login);
// app.use("/videos", video);
// app.use("/historyvideos", authverify, history);
// app.use("/likedvideos", authverify, likedVideos);
// app.use("/watchlatervideos", authverify, watchLater);
// app.use("/playlists", authverify, playlist);
// app.use("/dislikedvideos", authverify, dislikedvideos);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

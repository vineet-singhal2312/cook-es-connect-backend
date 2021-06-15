const express = require("express");
const { CreatePost } = require("../controllers/postController");
const { Post } = require("../model/Post.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { userId } = req.user;

    await Post.find({ userId })
      .populate("userId")
      .populate("likes")
      .populate("dislikes")
      .populate("hearts")
      .populate("claps")
      .populate("laughs")
      .exec(function (err, results) {
        if (err) {
          return res.status(404).json({
            success: false,
            message: "something is wrong in fetching data",
          });
        }
        if (results) {
          return res.status(200).json({
            success: true,
            message: "task done",
            results,
          });
        }
      });
    try {
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .post(async (req, res) => {
    const { postTitle, postCaption, imageUrl } = req.body;
    const { userId } = req.user;
    console.log(userId, postCaption, postTitle , imageUrl);
    await CreatePost(userId, postTitle, postCaption, imageUrl, Post, res);
    // res.status(200).json({
    //   success: true,
    //   message: "task done",
    // });
    try {
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  });

module.exports = router;

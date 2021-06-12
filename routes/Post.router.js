const express = require("express");
const { CreatePost } = require("../controllers/postController");
const { Post } = require("../model/Post.model");
const router = express.Router();

router
  .route("/")

  .post(async (req, res) => {
    const { postTitle, postContent } = req.body;
    const { userId } = req.user;

    await CreatePost(userId, postTitle, postContent, Post, res);

    try {
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  });

modules.export = router;

const express = require("express");
const {
  CreatePost,
  AddReactionOnPost,
  DeleteReactionFromPost,
} = require("../controllers/postController");
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
    console.log(userId, postCaption, postTitle, imageUrl);
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

router
  .route("/likes")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    console.log(userId, postId);

    try {
      await AddReactionOnPost(userId, postId, { likes: userId }, Post, res);

      console.log(" andar");
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("this is delete ka area");
      const { postId } = req.body;
      const { userId } = req.user;

      console.log(postId, userId);
      await DeleteReactionFromPost(
        userId,
        postId,
        { likes: userId },
        Post,
        res
      );
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

router
  .route("/dislikes")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    console.log(userId, postId);

    try {
      await AddReactionOnPost(userId, postId, { dislikes: userId }, Post, res);

      console.log(" andar");
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("this is delete ka area");
      const { postId } = req.body;
      const { userId } = req.user;

      console.log(postId, userId);
      await DeleteReactionFromPost(
        userId,
        postId,
        { dislikes: userId },
        Post,
        res
      );
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

router
  .route("/hearts")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    console.log(userId, postId);

    try {
      await AddReactionOnPost(userId, postId, { hearts: userId }, Post, res);

      console.log(" andar");
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("this is delete ka area");
      const { postId } = req.body;
      const { userId } = req.user;

      console.log(postId, userId);
      await DeleteReactionFromPost(
        userId,
        postId,
        { hearts: userId },
        Post,
        res
      );
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

router
  .route("/claps")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    console.log(userId, postId);

    try {
      await AddReactionOnPost(userId, postId, { claps: userId }, Post, res);

      console.log(" andar");
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("this is delete ka area");
      const { postId } = req.body;
      const { userId } = req.user;

      console.log(postId, userId);
      await DeleteReactionFromPost(
        userId,
        postId,
        { claps: userId },
        Post,
        res
      );
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

router
  .route("/laughs")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    console.log(userId, postId);

    try {
      await AddReactionOnPost(userId, postId, { laughs: userId }, Post, res);

      console.log(" andar");
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("this is delete ka area");
      const { postId } = req.body;
      const { userId } = req.user;

      console.log(postId, userId);
      await DeleteReactionFromPost(
        userId,
        postId,
        { laughs: userId },
        Post,
        res
      );
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

module.exports = router;

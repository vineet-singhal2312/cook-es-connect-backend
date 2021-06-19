const express = require("express");
const {
  CreatePost,
  AddReactionOnPost,
  DeleteReactionFromPost,
  AddCommentOnPost,
} = require("../controllers/postController");
const { Post } = require("../model/Post.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { userId } = req.user;

    await Post.find({})
      .populate("userId")
      .populate("likes")
      .populate("dislikes")
      .populate("hearts")
      .populate("claps")
      .populate("laughs")
      .populate({
        path: "comments.userId",
        model: "User-sign-up",
      })
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
    await CreatePost(userId, postTitle, postCaption, imageUrl, Post, res);
  });

router
  .route("/likes")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    console.log(userId, postId);

    await AddReactionOnPost(userId, postId, { likes: userId }, Post, res);
  })
  .delete(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    console.log(postId, userId);
    await DeleteReactionFromPost(userId, postId, { likes: userId }, Post, res);
  });

router
  .route("/dislikes")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;
    await AddReactionOnPost(userId, postId, { dislikes: userId }, Post, res);
  })
  .delete(async (req, res) => {
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
  });

router
  .route("/hearts")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    await AddReactionOnPost(userId, postId, { hearts: userId }, Post, res);
  })
  .delete(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    await DeleteReactionFromPost(userId, postId, { hearts: userId }, Post, res);
  });

router
  .route("/claps")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    await AddReactionOnPost(userId, postId, { claps: userId }, Post, res);
  })
  .delete(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    await DeleteReactionFromPost(userId, postId, { claps: userId }, Post, res);
  });

router
  .route("/laughs")

  .post(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    await AddReactionOnPost(userId, postId, { laughs: userId }, Post, res);
  })
  .delete(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    await DeleteReactionFromPost(userId, postId, { laughs: userId }, Post, res);
  });
router
  .route("/comments")

  .post(async (req, res) => {
    const { postId, userComment } = req.body;
    const { userId } = req.user;

    await AddCommentOnPost(userId, postId, userComment, Post, res);
  })
  .delete(async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.user;

    await DeleteReactionFromPost(userId, postId, { laughs: userId }, Post, res);
  });

module.exports = router;

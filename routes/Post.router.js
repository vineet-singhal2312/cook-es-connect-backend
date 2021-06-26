const express = require("express");
const {
  createReactionNotification,
} = require("../controllers/notificationController");
const {
  CreatePost,
  AddReactionOnPost,
  DeleteReactionFromPost,
  AddCommentOnPost,
  DeleteCommentFromPost,
} = require("../controllers/postController");
const { sendData } = require("../controllers/sendData");
const { Post } = require("../model/Post.model");
const { UserSignUp } = require("../model/UserSignUp.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { userId } = req.user;

    const user = await UserSignUp.find({ _id: userId });
    const following = user[0].following;
    console.log(following);
    await sendData(
      { $or: [{ userId }, { userId: { $in: following } }] },
      Post,
      res
    );
    // try {
    // } catch (error) {
    //   res.status(404).send({ success: false, message: "error!!!" });
    // }
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

    const post = await Post.find({ _id: postId });
    const targetUserId = post[0].userId;
    // console.log(userId, postId);
    // console.log(post[0].userId);
    await AddReactionOnPost(userId, postId, { likes: userId }, Post, res);
    await createReactionNotification(userId, targetUserId, postId, "liked");
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
    const post = await Post.find({ _id: postId });
    const targetUserId = post[0].userId;
    await AddReactionOnPost(userId, postId, { dislikes: userId }, Post, res);
    await createReactionNotification(userId, targetUserId, postId, "disliked");
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
    const post = await Post.find({ _id: postId });
    const targetUserId = post[0].userId;
    await AddReactionOnPost(userId, postId, { hearts: userId }, Post, res);
    await createReactionNotification(
      userId,
      targetUserId,
      postId,
      "reacted on"
    );
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
    const post = await Post.find({ _id: postId });
    const targetUserId = post[0].userId;
    await AddReactionOnPost(userId, postId, { claps: userId }, Post, res);
    await createReactionNotification(
      userId,
      targetUserId,
      postId,
      "reacted on"
    );
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
    const post = await Post.find({ _id: postId });
    const targetUserId = post[0].userId;
    await AddReactionOnPost(userId, postId, { laughs: userId }, Post, res);
    await createReactionNotification(
      userId,
      targetUserId,
      postId,
      "reacted on"
    );
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
    const post = await Post.find({ _id: postId });
    const targetUserId = post[0].userId;
    await AddCommentOnPost(userId, postId, userComment, Post, res);
    await createReactionNotification(
      userId,
      targetUserId,
      postId,
      "commented on"
    );
  })
  .delete(async (req, res) => {
    const { postId, commentId } = req.body;
    const { userId } = req.user;

    await DeleteCommentFromPost(userId, postId, commentId, Post, res);
  });

module.exports = router;

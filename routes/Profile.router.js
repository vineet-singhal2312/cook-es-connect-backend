const express = require("express");
const { ProfileUpdate } = require("../controllers/profileController");
const { sendData } = require("../controllers/sendData");

const { Post } = require("../model/Post.model");
const { UserSignUp } = require("../model/UserSignUp.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { userId } = req.user;

    try {
      const result = await UserSignUp.find({ _id: userId });
      console.log(result);
      res.status(200).json({
        success: true,
        message: "task done",
        result,
      });
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .post(async (req, res) => {
    const { postTitle, postCaption, imageUrl } = req.body;
    const { userId } = req.user;
    await CreatePost(userId, postTitle, postCaption, imageUrl, Post, res);
  })
  .put(async (req, res) => {
    const { updateToBeUserName } = req.body;
    const { userId } = req.user;
    
    await ProfileUpdate(
      userId,
      {
        userName: updateToBeUserName,
      },
      UserSignUp,
      res
    );
  });
router
  .route("/timeline")

  .post(async (req, res) => {
    const { timelineImageUrl } = req.body;
    const { userId } = req.user;

    await ProfileUpdate(
      userId,
      {
        timeLinePhoto: timelineImageUrl,
      },
      UserSignUp,
      res
    );
  });

router.route("/posts").get(async (req, res) => {
  const { userId } = req.user;
  await sendData({ userId }, Post, res);
});
router.route("/users").get(async (req, res) => {
  const { userId } = req.user;
  try {
    const results = await UserSignUp.find({});
    console.log(results);
    res.status(200).json({
      success: true,
      message: "task done",
      results,
    });
  } catch (error) {
    res.status(404).send({ success: false, message: "error!!!" });
  }
});

module.exports = router;

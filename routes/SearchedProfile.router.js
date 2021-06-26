const express = require("express");
const {
  createFollowNotification,
} = require("../controllers/notificationController");
const { sendData } = require("../controllers/sendData");

const { Post } = require("../model/Post.model");
const { UserSignUp } = require("../model/UserSignUp.model");
const router = express.Router();

router.route("/:searchedUserId").get(async (req, res) => {
  // const { userId } = req.user;
  const { searchedUserId } = req.params;
  console.log(searchedUserId);
  try {
    const result = await UserSignUp.find({ _id: searchedUserId });
    console.log(result);
    res.status(200).json({
      success: true,
      message: "task done",
      result,
    });
  } catch (error) {
    res.status(404).send({ success: false, message: "error!!!" });
  }
});
// .post(async (req, res) => {
//   const { postTitle, postCaption, imageUrl } = req.body;
//   const { userId } = req.user;
//   await CreatePost(userId, postTitle, postCaption, imageUrl, Post, res);
// });

router.route("/posts/:searchedUserId").get(async (req, res) => {
  //   const { userId } = req.user;
  const { searchedUserId } = req.params;

  await sendData({ userId: searchedUserId }, Post, res);
});
router
  .route("/follow")
  .post(async (req, res) => {
    const { searchedUserId } = req.body;

    const { userId } = req.user;

    try {
      await UserSignUp.findByIdAndUpdate(searchedUserId, {
        $push: { followers: userId },
      });
      await UserSignUp.findByIdAndUpdate(userId, {
        $push: { following: searchedUserId },
      });
      await createFollowNotification({
        sourceUserId: userId,
        targetUserId: searchedUserId,
      });

      const result = await UserSignUp.find({ _id: searchedUserId });
      console.log({ result });
      res.status(200).json({
        success: true,
        message: "task done",
        result,
      });
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    const { searchedUserId } = req.body;
    const { userId } = req.user;

    try {
      await UserSignUp.findByIdAndUpdate(searchedUserId, {
        $pull: { followers: userId },
      });
      await UserSignUp.findByIdAndUpdate(userId, {
        $pull: { following: searchedUserId },
      });
      const result = await UserSignUp.find({ _id: searchedUserId });
      console.log(result);
      res.status(200).json({
        success: true,
        message: "task done",
        result,
      });
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  });
module.exports = router;

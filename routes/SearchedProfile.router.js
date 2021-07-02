const express = require("express");
const {
  createFollowNotification,
} = require("../controllers/notificationController");
const { sendData } = require("../controllers/sendData");
const { Notification } = require("../model/Notification.model");

const { Post } = require("../model/Post.model");
const { UserSignUp } = require("../model/UserSignUp.model");
const router = express.Router();

router.route("/:searchedUserId").get(async (req, res) => {
  const { searchedUserId } = req.params;
  try {
    const result = await UserSignUp.find({ _id: searchedUserId });
    res.status(200).json({
      success: true,
      message: "task done",
      result,
    });
  } catch (error) {
    res.status(404).send({ success: false, message: "error!!!" });
  }
});

router.route("/posts/:searchedUserId").get(async (req, res) => {
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
      await Notification.remove({
        targetUserId: searchedUserId,
        sourceUserId: userId,
        type: "follow",
      });
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  });
router.route("/users/:searchedUserName").get(async (req, res) => {
  const { searchedUserName } = req.params;
  try {
    const results = await UserSignUp.find({
      userName: { $regex: searchedUserName, $options: "i" },
    });
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

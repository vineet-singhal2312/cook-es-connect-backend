const express = require("express");
const { sendData } = require("../controllers/sendData");

const { Post } = require("../model/Post.model");
const { Notification } = require("../model/Notification.model");
const router = express.Router();

router.route("/").get(async (req, res) => {
  const { userId } = req.user;
  console.log({ userId });
  try {
    await Notification.find({ targetUserId: userId })
        .populate("sourceUserId")
        .populate("postId")
        .sort({ createdAt: "desc" })
      .exec(function (err, results) {
        if (err) {
          return res.status.json({
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
    console.log("post bhi chalta hai!!");
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "error!!!" });
  }
});

module.exports = router;

// const sendData = async (requestedBody, collection, res) => {
//     try {
//       await collection
//         .find(requestedBody)
//         .populate("userId")
//         .populate("likes")
//         .populate("dislikes")
//         .populate("hearts")
//         .populate("claps")
//         .populate("laughs")
//         .populate({
//           path: "comments.userId",
//           model: "User-sign-up",
//         })
//         .exec(function (err, results) {
//           if (err) {
//             return res.status.json({
//               success: false,
//               message: "something is wrong in fetching data",
//             });
//           }
//           if (results) {
//             return res.status(200).json({
//               success: true,
//               message: "task done",
//               results,
//             });
//           }
//         });
//       console.log("post bhi chalta hai!!");
//     } catch (error) {
//       console.log(error);
//       res.status(404).send({ success: false, message: "error!!!" });
//     }
//   };

const { Notification } = require("../model/Notification.model");

const createReactionNotification = async (
  sourceUserId,
  targetUserId,
  postId,
  reaction
) => {
  console.log("request createReactionNotification");
  console.log(sourceUserId);
  console.log(targetUserId);

  if (sourceUserId == targetUserId) {
    console.log("request reject");
    return null;
  }
  const newLikeNotification = new Notification({
    message: `${reaction} your post`,
    postId,
    type: "like",
    targetUserId,
    sourceUserId,
  });
  await newLikeNotification.save();
};

module.exports = {
  createReactionNotification,
};

const { Notification } = require("../model/Notification.model");

const createReactionNotification = async (
  sourceUserId,
  targetUserId,
  postId,
  reaction
) => {
  if (sourceUserId == targetUserId) {
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

const createFollowNotification = async ({ sourceUserId, targetUserId }) => {
  if (sourceUserId == targetUserId) {
    return null;
  }
  const newFollowNotification = new Notification({
    message: `followed you`,
    type: "follow",
    targetUserId,
    sourceUserId,
  });
  await newFollowNotification.save();
};

module.exports = {
  createReactionNotification,
  createFollowNotification,
};

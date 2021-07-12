const { UserSignUp } = require("../model/UserSignUp.model");
const { sendData } = require("./sendData");

const CreatePost = async (
  userId,
  postTitle,
  postContent,
  imageUrl,
  collection,
  res
) => {
  try {
    const user = await UserSignUp.find({ _id: userId });
    const following = user[0].following;
    const newPost = new collection({
      userId,
      postTitle,
      postContent,
      imageUrl,
      likes: [],
      dislikes: [],
      hearts: [],
      claps: [],
      laughs: [],
    });

    await newPost.save();

    await sendData(
      { $or: [{ userId }, { userId: { $in: following } }] },
      collection,
      res
    );
  } catch (error) {
    res.status(404).send({ success: false, message: "error!!!" });
  }
};

const AddReactionOnPost = async (
  userId,
  postId,
  toBeUpdatedBody,
  collection,
  res
) => {
  try {
    const user = await UserSignUp.find({ _id: userId });
    const following = user[0].following;
    await collection.findByIdAndUpdate(postId, {
      $push: toBeUpdatedBody,
    });
    await sendData(
      { $or: [{ userId }, { userId: { $in: following } }] },
      collection,
      res
    );
  } catch (error) {
    res.status(404).send({ success: false, message: "error!!!" });
  }
};
const DeleteReactionFromPost = async (
  userId,
  postId,
  toBeDeletedBody,
  collection,
  res
) => {
  try {
    const user = await UserSignUp.find({ _id: userId });
    const following = user[0].following;
    await collection.findByIdAndUpdate(postId, {
      $pull: toBeDeletedBody,
    });
    await sendData(
      { $or: [{ userId }, { userId: { $in: following } }] },
      collection,
      res
    );
  } catch (error) {
    res.status(404).send({ success: false, message: "error" });
  }
};

const AddCommentOnPost = async (
  userId,
  postId,
  userComment,
  collection,
  res
) => {
  try {
    const user = await UserSignUp.find({ _id: userId });
    const following = user[0].following;
    await collection.findByIdAndUpdate(postId, {
      $push: {
        comments: {
          userId,
          comment: userComment,
        },
      },
    });
    await sendData(
      { $or: [{ userId }, { userId: { $in: following } }] },
      collection,
      res
    );
  } catch (error) {
    res.status(404).send({ success: false, message: "error!!!" });
  }
};

const DeleteCommentFromPost = async (
  userId,
  postId,
  commentId,
  collection,
  res
) => {
  try {
    const user = await UserSignUp.find({ _id: userId });
    const following = user[0].following;
    await collection.updateOne(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } },
      { safe: true, multi: true }
    );

    await sendData(
      { $or: [{ userId }, { userId: { $in: following } }] },
      collection,
      res
    );
  } catch (error) {
    res.status(404).send({ success: false, message: "error" });
  }
};

module.exports = {
  CreatePost,
  AddReactionOnPost,
  DeleteReactionFromPost,
  AddCommentOnPost,
  DeleteCommentFromPost,
};

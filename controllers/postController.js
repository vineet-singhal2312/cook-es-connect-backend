const CreatePost = async (
  userId,
  postTitle,
  postContent,
  imageUrl,
  collection,
  res
) => {
  try {
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

    await collection
      .find({})
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
    console.log("reaction ke andar");
    // console.log(typeof reactionName);

    await collection.findByIdAndUpdate(postId, {
      $push: toBeUpdatedBody,
    });

    await collection
      .find({})
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
    console.log(userId, postId, toBeDeletedBody, collection);
    // const user = await collection.find({ userId });

    await collection.findByIdAndUpdate(postId, {
      $pull: toBeDeletedBody,
    });

    await collection
      .find({})
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
    console.log("comment ke andar");
    // console.log(typeof reactionName);
    try {
      await collection.findByIdAndUpdate(postId, {
        $push: {
          comments: {
            userId,
            comment: userComment,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }

    await collection
      .find({})
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
    // res.status(200).send({ success: true, message: "done" });
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
    console.log(userId, postId, commentId, "delete kringe aaj comment");
    // const user = await collection.find({ userId });
    try {
      console.log("main kaam pr hoon");

      await collection.updateOne(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { safe: true, multi: true }
      );
      console.log("main kaam tamam");
    } catch (error) {
      console.log(error);
    }

    await collection
      .find({})
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

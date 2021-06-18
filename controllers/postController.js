const CreatePost = async (
  userId,
  postTitle,
  postContent,
  imageUrl,
  collection,
  res
) => {
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
    .find({ userId })
    .populate("userId")
    .populate("likes")
    .populate("dislikes")
    .populate("hearts")
    .populate("claps")
    .populate("laughs")
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

  //   return res.status(200).json({ success: true, message: `data post`, result });
};

const AddReactionOnPost = async (
  userId,
  postId,
  toBeUpdatedBody,
  collection,
  res
) => {
  console.log("reaction ke andar");
  // console.log(typeof reactionName);

  await collection.findByIdAndUpdate(postId, {
    $push: toBeUpdatedBody,
  });

  await collection
    .find({ userId })
    .populate("userId")
    .populate("likes")
    .populate("dislikes")
    .populate("hearts")
    .populate("claps")
    .populate("laughs")
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
};
const DeleteReactionFromPost = async (
  userId,
  postId,
  toBeDeletedBody,
  collection,
  res
) => {
  console.log(userId, postId, toBeDeletedBody, collection);
  // const user = await collection.find({ userId });

  await collection.findByIdAndUpdate(postId, {
    $pull: toBeDeletedBody,
  });

  await collection
    .find({ userId })
    .populate("userId")
    .populate("likes")
    .populate("dislikes")
    .populate("hearts")
    .populate("claps")
    .populate("laughs")
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
};

module.exports = { CreatePost, AddReactionOnPost, DeleteReactionFromPost };

// OrderModel.find()
//   .populate("user")
//   .populate("meal")
//   .exec(function (err, results) {
//     // callback
//   });

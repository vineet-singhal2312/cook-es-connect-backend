const CreatePost = (userId, postTitle, postContent, Post, res) => {
  const newPost = new Post({
    userId,
    postTitle,
    postContent,
    likes: [],
    dislikes: [],
    hearts: [],
    claps: [],
    laughs: [],
  });

  await newPost.save();

  await Post.find({ userId })
    .populate("userId")
    .populate("likel")
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

modules.export = { CreatePost };

OrderModel.find()
  .populate("user")
  .populate("meal")
  .exec(function (err, results) {
    // callback
  });

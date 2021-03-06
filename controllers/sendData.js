const sendData = async (requestedBody, collection, res) => {
  try {
    await collection
      .find(requestedBody)
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
      .sort({ createdAt: "descending" })
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

module.exports = {
  sendData,
};

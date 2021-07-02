const ProfileUpdate = async (userId, updateToBeBody, collection, res) => {
  try {
    await collection.findByIdAndUpdate(userId, updateToBeBody);
    const result = await collection.find({ _id: userId });

    res.status(200).json({
      success: true,
      message: "task done",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(406).send({ success: false, message: "error!!!" });
  }
};

module.exports = {
  ProfileUpdate,
};

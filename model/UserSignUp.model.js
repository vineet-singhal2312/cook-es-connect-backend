const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSignUpSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureImageUrl: {
    type: String,
    required: true,
  },
  timeLinePhoto: {
    type: String,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
      unique: true,
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },
  ],
});

const UserSignUp = new mongoose.model("User-sign-up", UserSignUpSchema);

module.exports = { UserSignUp };

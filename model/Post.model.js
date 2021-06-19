const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User-sign-up" },

  postTitle: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },
  ],
  hearts: [
    {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },
  ],
  claps: [
    {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },
  ],

  laughs: [
    {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },
  ],
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User-sign-up" },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  date: { type: Date, default: Date.now },
});

const Post = new mongoose.model("Post", postSchema);

module.exports = { Post };

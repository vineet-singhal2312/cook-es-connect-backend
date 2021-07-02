const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },

    sourceUserId: {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },

    targetUserId: {
      type: Schema.Types.ObjectId,
      ref: "User-sign-up",
    },
  },
  { timestamps: true }
);

const Notification = new mongoose.model("Notification", NotificationSchema);

module.exports = { Notification };

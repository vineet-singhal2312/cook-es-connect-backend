const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSignUpSchema = new mongoose.Schema({
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
});

const userSignUp = new mongoose.model("User-sign-up", userSignUpSchema);

module.exports = { userSignUp };

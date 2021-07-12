const { UserSignUp } = require("../model/UserSignUp.model");
const bcrypt = require("bcrypt");

const bcryptPasswordGenerator = (
  password,
  userName,
  email,
  profilePictureImageUrl,
  res
) => {
  bcrypt.hash(password, 10, function (err, bcryptPassword) {
    if (err) {
      res.status(400).json({ message: "something is wrong" });
    } else {
      saveUser(bcryptPassword, userName, email, profilePictureImageUrl, res);
    }
  });
};

const saveUser = async (
  bcryptPassword,
  userName,
  email,
  profilePictureImageUrl,
  res
) => {
  try {
    const newUser = new UserSignUp({
      userName: userName,
      email: email,
      password: bcryptPassword,
      profilePictureImageUrl: profilePictureImageUrl,
      timeLinePhoto:
        "https://res.cloudinary.com/dxlube6si/image/upload/v1624519526/kxrwldihjw1ix0mlwtk6.jpg",
    });
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "Your registration is successful" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "something is wrong in saving user" });
  }
};

module.exports = { bcryptPasswordGenerator };

const { userSignUp } = require("../model/UserSignUp.model");
const bcrypt = require("bcrypt");

const bcryptPasswordGenerator = (password, userName, email, res) => {
  bcrypt.hash(password, 10, function (err, bcryptPassword) {
    if (err) {
      res.status(403).json({ message: "something is wrong" });
    } else {
      saveUser(bcryptPassword, userName, email, res);
    }
  });
};

const saveUser = async (bcryptPassword, userName, email, res) => {
  try {
    const newUser = new userSignUp({
      userName: userName,
      email: email,
      password: bcryptPassword,
    });
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "Your registration is successful" });
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "something is wrong in saving user" });
  }
};

module.exports = { bcryptPasswordGenerator };

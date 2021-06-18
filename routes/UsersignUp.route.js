const express = require("express");
const { bcryptPasswordGenerator } = require("../controllers/signupController");

const router = express.Router();

router
  .route("/")

  .post(async (req, res) => {
    try {
      const {
        userName,
        email,
        password,
        confirmPassword,
        profilePictureImageUrl,
      } = req.body;

      if (password !== confirmPassword) {
        res.status(400).json({ message: "Both password are not same!!" });
      } else {
        // console.log(
        //   userName,
        //   email,
        //   password,
        //   confirmPassword,
        //   profilePictureImageUrl
        // );

        bcryptPasswordGenerator(
          password,
          userName,
          email,
          profilePictureImageUrl,
          res
        );
      }
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;

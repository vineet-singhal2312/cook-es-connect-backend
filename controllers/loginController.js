const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const passwordAuthentication = (
  password,
  userPassword,
  id,
  email,
  name,
  profilePictureImageUrl,
  res
) => {
  bcrypt.compare(password, userPassword, function (err, result) {
    if (err) {
      return res.json({ message: "something is wrong" });
    }
    if (result) {
      const token = jwt.sign(
        {
          userEmail: email,
          userId: id,
        },
        "secret",
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        success: true,
        message: "login successful",
        token,
        userName: name,
        profilePictureImageUrl,
        id,
      });
    } else {
      return res.status(400).json({ message: "authentication failed" });
    }
  });
};

module.exports = { passwordAuthentication };

var jwt = require("jsonwebtoken");

function AuthVerify(req, res, next) {
  console.log("yahahaa aya");
  const token = req.headers.authorization;
  console.log("token", token);

  try {
    const decoded = jwt.verify(token, "secret");

    req.user = {
      userId: decoded.userId,
      userEmail: decoded.userEmail,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
}

module.exports = AuthVerify;

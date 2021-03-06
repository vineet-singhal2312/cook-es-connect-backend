var jwt = require("jsonwebtoken");

function AuthVerify(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_KEY_STRING);

    req.user = {
      userId: decoded.userId,
      userEmail: decoded.userEmail,
    };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
}

module.exports = AuthVerify;

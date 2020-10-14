const jwt = require("jsonwebtoken");
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorisation required" });
  }
  next();
};

exports.adminMiddelware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "unauthorized Admin access" });
  }
  next();
};

exports.userMiddelware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "unauthorized user access" });
  }
  next();
};

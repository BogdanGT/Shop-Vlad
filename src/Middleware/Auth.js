const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const decode = jwt.decode(token, process.env.JWT_SECRET);
  if (!decode) return res.send("Invalid user has been provided");
  req.user = decode.user;
  next();
};

module.exports = verifyToken;

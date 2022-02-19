const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  const decode = jwt.decode(token, process.env.JWT_SECRET);
  req.user = decode.user;
  next();
};

module.exports = verifyToken;

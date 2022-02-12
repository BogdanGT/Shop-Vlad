const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  const decode = jwt.decode(token, process.env.JWT_SECRET);
  req.user = decode.user;
  next();
};

// nume pret discount descirere (scurt/lung) rating brand categorie
module.exports = verifyToken;

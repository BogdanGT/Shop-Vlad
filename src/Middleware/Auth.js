const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  next();
  //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //     if (err) {
  //       return res.json({ err: "Invalid token has been provided" });
  //     } else {
  //       console.log(decoded);
  //       req.token = decoded;
  //       next();
  //     }
  //   });
};

module.exports = verifytoken;

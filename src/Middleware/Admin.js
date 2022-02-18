const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.send("A valid token must be provided");
  }
  const user = await User.findOne({ _id: decoded.user.id });
  if (!user) return res.send("Invalid user has been provided");
  if (user.role == "admin") {
    next();
  } else
    return res.json({ err: "You do not have permission to do edit this." });
};

module.exports = verifyAdmin;

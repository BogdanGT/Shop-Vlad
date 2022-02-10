const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const cookieParser = require("cookie-parser");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ errMsg: "User not found" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (checkPassword) {
    let options = {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      signed: true,
    };

    // Set cookie
    res.cookie("token", "token", options); // options is optional
    return res.json({ successMsg: "Login sdf" });
  } else {
    return res.json({ successMsg: "not login" });
  }
});

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, password, username);

  const passwordEnc = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    password: passwordEnc,
  });
  res.json({ user });
});

module.exports = app;

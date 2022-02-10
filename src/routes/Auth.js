const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");
const User = require("../Models/User");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  // res.send("hahdsfasf");
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ errMsg: "User not found" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  const payload = {
    user: { id: user._id },
  };

  const token = jwt.sign(payload, "SECRET", { expiresIn: 60 * 60 * 24 * 30 });

  if (checkPassword) {
    const token = jwt.sign(
      { id: user._id, email },
      "Sa-mi trag pula prin mormanul lu ma-ta si sa iti iau toata familia cu mortii in pula de terminat ca ma pis pe crucea ma-tii de idiot cretin tembel.@@suge-o by nu spargi parola niciodata"
    );
    return res.json({ token });
  } else {
    return res.json({ successMsg: "not login" });
  }
});

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, password, username);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ err: "User already exists" });
  }

  const passwordEnc = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    password: passwordEnc,
  });
  const token = jwt.sign(
    { id: user._id, email },
    "Sa-mi trag pula prin mormanul lu ma-ta si sa iti iau toata familia cu mortii in pula de terminat ca ma pis pe crucea ma-tii de idiot cretin tembel.@@suge-o by nu spargi parola niciodata"
  );
  res.json({ token });
});

module.exports = app;

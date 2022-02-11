// DEPENDENCIES
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// MIDDLEWARE
const authMiddleware = require("../Middleware/Auth");
const verifytoken = require("../Middleware/Auth");
const upload = require("../Middleware/Multer");
// MODELS
const User = require("../Models/User");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ errMsg: "User not found" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  const payload = {
    user: { id: user._id },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  if (checkPassword) {
    return res.json({ successMsg: { accessToken: token } });
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

  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  // sa ma iei de pula mere asd gggggggg asd
  // nume , pret , brand , descriere 2 , poze
  let mail_options = {
    from: process.env.NODEMAILER_EMAIL,
    to: "bogdantunsugt@gmail.com",
    subject: "asd",
    text: `Registery Code - asd`,
  };

  await transporter.sendMail(mail_options);

  const passwordEnc = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    password: passwordEnc,
  });

  const payload = {
    user: { id: user._id },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  res.json({ successMsg: { accessToken: token } });
});

app.put("/change-password", authMiddleware, async (req, res) => {
  // res.send(req.user.id);
  const { password } = req.body;
  const { id } = req.user;
  let user = await User.findOne({ _id: id });
  if (!user) return res.send({ err: "User not found" });
  const newPassword = await bcrypt.hash(password, 10);
  user.password = newPassword;
  await user.save();
  res.send(user);
});

module.exports = app;

const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const authMiddleware = require("../Middleware/Auth");

const User = require("../Models/User");
const verifytoken = require("../Middleware/Auth");

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
  // discout,stoc,nume,poze,descriereScurta,lunga,brand,categorie mazga
  // asdfasdfasdfasdf gabi suge cariciu asd
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

app.get("/asd", authMiddleware, (req, res) => {
  // res.send(req.user.id);
  console.log(req.user.id);
});

module.exports = app;

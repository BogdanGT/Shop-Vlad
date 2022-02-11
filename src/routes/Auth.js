const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

  const token = jwt.sign(
    payload,
    "Sa-mi trag pula prin mormanul lu ma-ta si sa iti iau toata familia cu mortii in pula de terminat ca ma pis pe crucea ma-tii de idiot cretin tembel.@@suge-o by nu spargi parola niciodata",
    { expiresIn: 60 * 60 * 24 * 30 }
  );

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

  // if (existingUser) {
  //   return res.json({ err: "User already exists" });
  // }

  // let transporter = nodemailer.createTransport({
  //   // service: "gmail",
  //   host: "gmail",
  //   // port: 465,
  //   // secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "gabriel.ionescu@ltme.ro", // generated ethereal user
  //     pass: "screwyou", // generated ethereal password
  //   },
  // });

  // // send mail with defined transport object
  // let info = transporter.sendMail(
  //   {
  //     from: " gabriel.ionescu@ltme.ro", // sender address
  //     to: "bogdantunsugt@gmail.com", // list of receivers
  //     subject: "Testing existance", // Subject line
  //     text: "CODE NUMBER", // plain text body
  //     html: "<b>Hello mothersfucker?</b>", // html body
  //   },
  //   (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     } else console.log("Message sent: %s", info.messageId);

  //     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   }
  // );

  // SSSSSSSSSSSSSSS
  const passwordEnc = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    password: passwordEnc,
  });

  const payload = {
    user: { id: user._id },
  };

  const token = jwt.sign(
    payload,
    "Sa-mi trag pula prin mormanul lu ma-ta si sa iti iau toata familia cu mortii in pula de terminat ca ma pis pe crucea ma-tii de idiot cretin tembel.@@suge-o by nu spargi parola niciodata",
    { expiresIn: 60 * 60 * 24 * 30 }
  );

  res.json({ successMsg: { accessToken: token } });
  // res.json({ msg: "fuck yeah" });
});

module.exports = app;

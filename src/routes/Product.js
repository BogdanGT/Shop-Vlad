const express = require("express");
// const res = require("express/lib/response");
// const upload = require("../Middleware/Multer");
const Produs = require("../Models/Produs");
const app = express.Router();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    console.log("asdfasdf");
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    cb(null, `aasdfasdfa.jpg`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("asdfasdf");
});

app.post("/", upload.array("image"), (req, res) => {
  const { name, price, brand, descriptionS, descriptionL } = req.body;
  Produs.create({
    name,
    price,
    brand,
    descriptionS,
    descriptionL,
    image,
  });
  console.log(req.file);
  res.send("upload succeded");
});

module.exports = app;

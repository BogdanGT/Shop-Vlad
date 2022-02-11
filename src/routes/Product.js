const express = require("express");
// const res = require("express/lib/response");
// const upload = require("../Middleware/Multer");
const Produs = require("../Models/Produs");
const app = express.Router();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    cb(null, `${id}.jpg`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("asdfasdf");
});

app.post("/", upload.array("image"), (req, res) => {
  const { name, price, brand, descriptionS, descriptionL } = req.body;
  const images = req.files.map((e) => {
    return e.path;
  });
  console.log(images);
  Produs.create({
    name,
    price,
    brand,
    descriptionS,
    descriptionL,
    images: images,
  });

  res.send("Upload succeded!");
});

module.exports = app;

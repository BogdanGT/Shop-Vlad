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

app.get("/", async (req, res) => {
  const products = await Produs.find();
  console.log(products);
  res.json({ products });
});

app.post("/", [upload.array("image")], (req, res) => {
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

app.get("/getProduct/:product_id", async (req, res) => {
  const product_id = req.params.product_id;
  const product = await Produs.findById(product_id);

  res.json({ product });
});

app.get("/getProductsByCategory/:product_category", async (req, res) => {
  const product_category = req.params.product_category;
  const product = await Produs.find({ cateogrie: product_category });

  console.log(product);

  res.json({ product });
});

module.exports = app;

const express = require("express");
// const res = require("express/lib/response");
// const upload = require("../Middleware/Multer");
const Produs = require("../Models/Produs");
const Comand = require("../Models/Comenzi");
const app = express.Router();
const { v4: uuidv4 } = require("uuid");
const verifyAdmin = require("../Middleware/Admin");
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

app.get("/getProduct/:product_id", async (req, res) => {
  const product_id = req.params.product_id;
  const product = await Produs.findById(product_id);

  if (!product) return res.send({ err: "Category not found!" });

  res.json({ product });
});

app.get("/getProductsByCategory/:product_category", async (req, res) => {
  const product_category = req.params.product_category;

  const product = await Produs.find({ cateogrie: product_category });

  if (!product) return res.send({ err: "Category not found!" });

  res.json({ product });
});

app.post("/user", async (req, res) => {
  const { email, adress, products } = req.body;
  // return res.send("asdf");
  // res.json({ asd: "fuckyeah" });
  const produs = await Comand.create({
    email,
    adress,
    products,
  });
  res.send(produs);
});

// ADMIN REQUESTS

app.use(verifyAdmin);

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

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const produs = await Produs.findOne({ _id: id });

  try {
    await Produs.deleteOne({ _id: produs._id });
  } catch (error) {
    return res.json({ err: error.message });
  }

  res.json({ err: "Delete was succesfull." });
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;

  const produs = await Produs.findOne({ _id: id });

  if (!produs) return res.json({ err: "Produs not found" });
});

module.exports = app;

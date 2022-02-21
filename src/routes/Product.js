const express = require("express");
const Produs = require("../Models/Produs");
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

//------USER------
app.get("/last8", async (req, res) => {
  const aggregate = await Produs.aggregate([
    { $limit: 8 },
    {
      $group: {
        _id: "$_id",
        asd: "$price",
      },
    },
    {
      $sort: { timestamp: -1 },
    },
  ]);
  res.json({ succesMsg: aggregate });
});

app.get("/", async (req, res) => {
  const products = await Produs.find();
  console.log(products);
  console.log("asdasd");
  res.json({ products });
});

app.get("/:product_id", async (req, res) => {
  const product_id = req.params.product_id;
  const product = await Produs.findById(product_id);

  if (!product) return res.send({ err: "Category not found!" });

  res.json({ product });
});

app.get("/categorie/:product_category", async (req, res) => {
  const product_category = req.params.product_category;

  const product = await Produs.find({ cateogrie: product_category });

  if (!product) return res.send({ err: "Category not found!" });

  res.json({ product });
});

app.get("/nume/:product_name", async (req, res, next) => {
  const { product_name } = req.params;
  const product = await Produs.find({ name: product_name });
  if (product.length == 0) return res.json({ err: "Products not found." });
  console.log(product);
  res.send(product);
});

//------ADMIN------
app.use(verifyAdmin);

app.post("/", [upload.array("image")], (req, res) => {
  const { name, price, brand, descriptionS, descriptionL } = req.body;
  const images = req.files.map((e) => {
    return e.path;
  });
  const date = new Date().toString();
  console.log(date);
  Produs.create({
    name,
    price,
    brand,
    descriptionS,
    descriptionL,
    images: images,
    timestamp: date,
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

module.exports = app;

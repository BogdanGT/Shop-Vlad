const express = require("express");
const app = express.Router();
const { v4: uuidv4 } = require("uuid");
const isAdmin = require("../Middleware/Admin");
const isUser = require("../Middleware/User");

const multer = require("multer");
const {
  get_all_products,
  get_product,
  get_products_by_category,
  last_8,
  nushcee,
  top_vandute,
} = require("../controllers/Produs/User");
const {
  create_produs,
  delete_produs,
  get_stock,
} = require("../controllers/Produs/Admin");

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

//------ADMIN------

app.post("/", upload.array("images"), create_produs);

app.delete("/:id", isAdmin, delete_produs);

app.get("/stock", get_stock);

//------USER------

app.get("/search", get_all_products);

app.get("/last8", isUser, last_8);

app.get("/top_vandute", isUser, top_vandute);

app.get("/:product_id", isUser, get_product);

app.get("/categorie/:product_category", isUser, get_products_by_category);

app.get("/nume/:product_name", isUser, nushcee);

module.exports = app;

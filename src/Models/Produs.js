const mongoose = require("mongoose");

const produsSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    descriptionS: String,
    descriptionL: String,
    stock: Number,
    images: Array,
    informatii: Object,
    categorie: String,
    bloc: String,
  },
  { collection: "Produse" }
);

const Produs = mongoose.model("Produs", produsSchema);

module.exports = Produs;

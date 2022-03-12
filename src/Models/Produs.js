const mongoose = require("mongoose");

const produsSchema = new mongoose.Schema(
  {
    name: String,
    descriptionS: String,
    descriptionL: String,
    images: Array,
    informatii: Object,
    categorie: String,
    timestamp: Number,
    variation: Object,
    nr_solds: Number,
    subcategorie: Array,
  },
  { collection: "Produse" }
);

const Produs = mongoose.model("Produs", produsSchema);

module.exports = Produs;

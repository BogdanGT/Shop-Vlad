const mongoose = require("mongoose");

const produsSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    images: Array,
    informatii: Object,
    categorie: String,
    timestamp: {
      type: Number,
      default: 0,
    },
    variation: Object,
    nr_solds: {
      type: Number,
      default: 0,
    },
    subcategorie: Array,
  },
  { collection: "Produse" }
);

const Produs = mongoose.model("Produs", produsSchema);

module.exports = Produs;

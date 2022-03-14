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

// TO DO: get request pt comenzi plasate/confirmate/toate comenzile
//  vizualizeaza comanda screen
//  confirma comanda la comenzi plasate fetch edit plasata

module.exports = Produs;

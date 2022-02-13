const mongoose = require("mongoose");

const produsSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  descriptionS: String,
  descriptionL: String,
  images: Array,
});

const Produs = mongoose.model("Produs", produsSchema);

module.exports = Produs;

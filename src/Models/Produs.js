const mongoose = require("mongoose");

const produsSchema = new mongoose.Schema({
  name: String,
  price: String,
  brand: String,
  descriptionS: String,
  descriptionL: String,
  //   image: String,
});

const Produs = mongoose.model("Produs", produsSchema);

module.exports = Produs;

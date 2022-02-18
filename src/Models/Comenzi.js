const mongoose = require("mongoose");

const comandSchema = new mongoose.Schema({
  email: String,
  adress: String,
  products: Array,
});

const Comand = mongoose.model("Comand", comandSchema);

module.exports = Comand;

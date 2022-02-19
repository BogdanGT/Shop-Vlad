const mongoose = require("mongoose");

const comandSchema = new mongoose.Schema(
  {
    email: String,
    nume: String,
    prenume: String,
    strada: String,
    produse: Array,
    info: String,
    bloc: String,
    oras: String,
    judet: String,
    codPostal: String,
    telefon: String,
  },
  { collection: "Comenzi" }
);

const Comanda = mongoose.model("Comanda", comandSchema);

module.exports = Comanda;

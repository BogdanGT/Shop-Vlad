const mongoose = require("mongoose");

const comandSchema = new mongoose.Schema(
  {
    creator: String,
    email: String,
    nume: String,
    prenume: String,
    strada: String,
    produse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produs" }],
    info: String,
    bloc: String,
    judet: String,
    localitate: String,
    codPostal: String,
    telefon: String,
    status: String,
  },
  { collection: "Comenzi" }
);

const Comanda = mongoose.model("Comanda", comandSchema);

module.exports = Comanda;

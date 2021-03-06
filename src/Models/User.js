const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    nume: String,
    prenume: String,
    telefon: String,
    role: String,
    adresa: Object,
  },
  { collection: "Useri" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

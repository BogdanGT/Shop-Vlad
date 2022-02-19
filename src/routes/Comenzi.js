const express = require("express");
const Comand = require("../Models/Comenzi");
const app = express.Router();

// -----USER-----
app.post("/", async (req, res) => {
  const {
    nume,
    prenume,
    strada,
    bloc,
    oras,
    judet,
    codPostal,
    telefon,
    email,
    info,
    produse,
  } = req.body;
  console.log(req.body);
  console.log("asd");
  const produs = await Comand.create({
    nume,
    prenume,
    strada,
    bloc,
    oras,
    judet,
    codPostal,
    telefon,
    email,
    info,
    produse,
  });
  res.send(produs);
});

// -----ADMIN-----

app.get("/", async (req, res) => {
  const produs = await Comand.find({});
  res.send(produs);
});

module.exports = app;

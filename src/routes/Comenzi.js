const express = require("express");
const command = require("nodemon/lib/config/command");
const Comand = require("../Models/Comenzi");
const app = express.Router();
const verifyToken = require("../Middleware/Auth");
const verifyAdmin = require("../Middleware/Admin");
// -----USER-----
app.post("/", verifyToken, async (req, res) => {
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
  // console.log(req.body);
  console.log(req.user.id);
  // console.log();
  // console.log("asd");
  const produs = await Comand.create({
    creator: req.user.id,
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
    status: true,
  });
  res.send(produs);
});

app.put("/:cid", verifyToken, async (req, res) => {
  const { status } = req.body;
  const id = req.user.id;
  const { cid } = req.params;
  const comand = await Comand.findOne({ _id: cid });
  if (!comand) return res.json({ err: "Comand not found" });
  if (comand.creator != id) {
    return res.json({ err: "You need to be the owner of the command." });
  }
  comand.status = status;
  await comand.save();
  res.json({ obj: comand.status });
});

app.get("/user", verifyToken, async (req, res) => {
  const id = req.user.id;
  let comenzi;
  try {
    comenzi = await Comand.find({ creator: id });
  } catch (error) {
    return res.send({ err: "The creator does not exist" });
  }
  res.send(comenzi);
});

// -----ADMIN-----

app.get("/", verifyAdmin, async (req, res) => {
  const produs = await Comand.find({});
  res.send(produs);
});

module.exports = app;

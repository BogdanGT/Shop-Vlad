const express = require("express");
const command = require("nodemon/lib/config/command");
const Comand = require("../Models/Comenzi");
const app = express.Router();
const verifyToken = require("../Middleware/Auth");
const verifyAdmin = require("../Middleware/Admin");
const User = require("../Models/User");
// -----USER-----
app.post("/", verifyToken, async (req, res) => {
  const {
    nume,
    prenume,
    strada,
    bloc,
    judet,
    localitate,
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
  await Comand.create({
    creator: req.user.id,
    nume,
    prenume,
    strada,
    bloc,
    judet,
    localitate,
    codPostal,
    telefon,
    email,
    info,
    produse,
    status: "plasata",
  });
  const user = await User.findById(req.user.id);
  console.log(user.adresa);

  if (Object.keys(user.adresa).length == 0) {
    user.adresa = {
      strada,
      bloc,
      judet,
      localitate,
      codPostal,
      nume,
      prenume,
      telefon,
    };
    await user.save();
  }

  res.json({ successMsg: "Comanda a plasata cu succes!" });
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

  const comenzi = await Comand.find({ creator: id });
  if (comenzi.length == 0) return res.send("shit");

  res.send(comenzi);
});

// -----ADMIN-----

app.get("/", verifyAdmin, async (req, res) => {
  const produs = await Comand.find({});
  res.send(produs);
});

module.exports = app;

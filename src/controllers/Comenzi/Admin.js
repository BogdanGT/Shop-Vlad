const Comanda = require("../../Models/Comenzi");
const mongoose = require("mongoose");

exports.all_comenzi = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const comenzi = await Comanda.find({
      email: {
        $regex: id,
        $options: "i",
      },
    });
    console.log(comenzi);
    res.json({ successMsg: comenzi });
  } else {
    const comenzi = await Comanda.find({});
    res.json({ successMsg: comenzi });
  }
};

exports.get_comanda = async (req, res) => {
  const { cid } = req.params;
  const comenzi = await Comanda.findOne({ _id: cid });
  console.log(comenzi);
  res.json({ successMsg: comenzi });
};

exports.update_status_admin = async (req, res) => {
  const { cid } = req.params;
  const { status } = req.body;
  console.log(status);
  const comenzi = await Comanda.findOne({ _id: cid });
  comenzi.status = status;
  await comenzi.save();
  res.json({ successMsg: "Produsul a fost confirmat!" });
};

exports.delete_comanda = async (req, res) => {
  const { cid } = req.params;
  const { status } = req.body;
  console.log(status);
  const comenzi = await Comanda.findOne({ _id: cid });
  comenzi.status = "Anulata";
  await comenzi.save();
  // await comenzi.remove();

  res.json({ successMsg: "Produsul a fost confirmat!" });
};

exports.update_comanda = async (req, res) => {
  const {
    nume,
    prenume,
    telefon,
    email,
    judet,
    localitate,
    strada,
    codPostal,
    produse,
  } = req.body;
  console.log(req.params.cid);
  await Comanda.updateOne(
    { _id: req.params.cid },
    {
      nume,
      prenume,
      telefon,
      email,
      judet,
      localitate,
      strada,
      codPostal,
      produse,
    }
  );

  res.json({ successMsg: "asd" });
};

exports.comenzi_plasate = async (req, res) => {
  const comenzi = await Comanda.find({ status: "Plasata" });
  console.log("asdasd");
  res.json({ successMsg: comenzi });
};

exports.comenzi_confirmate = async (req, res) => {
  const comenzi = await Comanda.find({ status: "Confirmata" });
  console.log(comenzi);
  res.json({ successMsg: comenzi });
};

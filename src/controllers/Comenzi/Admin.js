const Comanda = require("../../Models/Comenzi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

exports.update_status = async (req, res) => {
  const id = req.user.id;
  const { cid } = req.params;
  const comand = await Comanda.findOne({ _id: cid });
  if (!comand) return res.json({ err: "Comand not found" });
  if (comand.creator != id) {
    return res.json({ err: "You need to be the owner of the command." });
  }
  comand.status = "anulata";
  await comand.save();
  res.json({ successMsg: "Statusul produsul a fost schimbat!" });
};

// exports.all_comenzi = async (req, res) => {
//   const { id } = req.query;
//   const comenzi = await Comanda.find({});
//   res.json({ successMsg: comenzi });
// };

exports.all_comenzi = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const comenzi = Comanda.find({});
  console.log(comenzi);
  res.json({ successMsg: comenzi });
  // if (id) {
  //   console.log(id);
  //   const comenzi = Comanda.findById({
  //     _id: id,
  //   });
  //   // const comenzi = await Comanda.find({
  //   //   _id: {
  //   //     $regex: id,
  //   //     $options: "i",
  //   //   },
  //   // });
  //   res.json({ successMsg: comenzi });
  // } else {
  //   const comenzi = await Comanda.find({});
  //   res.json({ successMsg: comenzi });
  // }
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

const Comanda = require("../../Models/Comenzi");

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

exports.all_comenzi = async (req, res) => {
  const comenzi = await Comanda.find({});
  res.json({ successMsg: comenzi });
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
  await comenzi.remove();

  res.json({ successMsg: "Produsul a fost confirmat!" });
};

exports.comenzi_plasate = async (req, res) => {
  const comenzi = await Comanda.find({ status: "plasat" });
  console.log("asdasd");
  res.json({ successMsg: comenzi });
};

exports.comenzi_confirmate = async (req, res) => {
  const comenzi = await Comanda.find({ status: "confirmat" });
  console.log(comenzi);
  res.json({ successMsg: comenzi });
};

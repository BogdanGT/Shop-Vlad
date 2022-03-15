const Comanda = require("../../Models/Comenzi");

exports.update_status = async (req, res) => {
  const { status } = req.body;
  const id = req.user.id;
  const { cid } = req.params;
  const comand = await Comanda.findOne({ _id: cid });
  if (!comand) return res.json({ err: "Comand not found" });
  if (comand.creator != id) {
    return res.json({ err: "You need to be the owner of the command." });
  }
  comand.status = status;
  await comand.save();
  res.json({ successMsg: "Statusul produsul a fost schimbat!" });
};

exports.all_comenzi = async (req, res) => {
  const comenzi = await Comanda.find({});
  res.json({ successMsg: comenzi });
};

exports.plasate_comenzi = async (req, res) => {
  const comenzi = await Comanda.find({ status: "plasat" });
  console.log(comenzi);
  res.json({ successMsg: comenzi });
};

exports.confirmate_comenzi = async (req, res) => {
  const comenzi = await Comanda.find({ status: "confirmat" });
  console.log(comenzi);
  res.json({ successMsg: comenzi });
};

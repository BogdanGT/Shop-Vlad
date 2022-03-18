const Comanda = require("../../Models/Comenzi");
const Produs = require("../../Models/Produs");
const User = require("../../Models/User");

exports.create_comanda = async (req, res) => {
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
  await Comanda.create({
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
    status: "Plasata",
  });

  const user = await User.findById(req.user.id);

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

  produse.map(async (el) => {
    await Produs.updateMany(
      { _id: el.id, "variation.nume": el.marime },
      {
        $inc: { "variation.$.stock": -el.quantity, nr_solds: el.quantity },
        $set: { timestamp: Date.now() },
      },
      { safe: true, multi: true }
    );
  });
  res.json({ successMsg: "Comanda a plasata cu succes!" });
};

exports.update_status = async (req, res) => {
  const id = req.user.id;
  const { cid } = req.params;
  const comand = await Comanda.findOne({ _id: cid });
  if (!comand) return res.json({ err: "Comand not found" });
  if (comand.creator != id) {
    return res.json({ err: "You need to be the owner of the command." });
  }
  comand.status = "Anulata";
  await comand.save();
  res.json({ successMsg: "Statusul produsul a fost schimbat!" });
};

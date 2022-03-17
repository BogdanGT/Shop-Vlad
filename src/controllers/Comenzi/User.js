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
    status: "plasat",
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
  console.log("asdfs");
  res.json({ successMsg: "Comanda a plasata cu succes!" });
};

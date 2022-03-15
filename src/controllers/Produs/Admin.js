const Produs = require("../../Models/Produs");

exports.get_stock = async (req, res) => {
  const aggregate = await Produs.aggregate([
    { $match: { "variation.stock": { $lt: 20 } } },
    {
      $sort: { stock: 1 },
    },
  ]);
  res.json({ successMsg: aggregate });
};

exports.create_produs = async (req, res) => {
  const { name, categorie, subcategorii, description, informatii, variation } =
    req.body;
  const images = req.files.map((e) => {
    return e.path;
  });
  await Produs.create({
    name,
    categorie,
    description,
    images,
    subcategorie: JSON.parse(subcategorii),
    informatii: JSON.parse(informatii),
    variation: JSON.parse(variation),
  });

  res.json({ successMsg: "Produsul a fost adaugat!" });
};

exports.delete_produs = async (req, res) => {
  const { id } = req.params;

  const produs = await Produs.findOne({ _id: id });

  try {
    await Produs.deleteOne({ _id: produs._id });
  } catch (error) {
    return res.json({ errorMsg: error.message });
  }

  res.json({ errorMsg: "Produsul a fost sters!" });
};

exports.get_stock = async (req, res) => {
  const aggregate = await Produs.aggregate([
    { $match: { stock: { $lt: 20 } } },
    {
      $sort: { stock: 1 },
    },
  ]);
  res.json({ successMsg: aggregate });
};

const Produs = require("../../Models/Produs");

exports.get_stock = async (req, res) => {
  const aggregate = await Produs.aggregate([
    { $match: { stock: { $lt: 20 } } },
    {
      $sort: { stock: 1 },
    },
  ]);
  res.json({ successMsg: aggregate });
};

exports.create_produs = async (req, res) => {
  const { name, price, categorie, stock, descriptionL, subcategorii } =
    req.body;
  // console.log(subcategorii);
  console.log(req.body);
  // console.log(req.files);
  const images = req.files.map((e) => {
    return e.path;
  });
  await Produs.create({
    name,
    price,
    categorie,
    stock,
    descriptionL,
    images: images,
    timestamp: 0,
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

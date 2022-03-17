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

exports.update_produs = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    categorie,
    description,
    subcategorii,
    informatii,
    variation,
    imagesUri,
  } = req.body;
  const images = req.files.map((e) => {
    return e.path;
  });
  const produs = await Produs.findById(id);

  // produs.images.map((el, index) => {
  //   JSON.parse(imagesUri).map((el2) => {
  //     if (el == el2) {
  //       console.log(el, "bun");
  //     } else {
  //       console.log(el, "rau");
  //     }
  //   });
  // });

  console.log(imagesUri.concat(produs.images));
  await Produs.updateOne(
    { _id: id },
    {
      $set: {
        name,
        images:
          imagesUri.length != 0 ? JSON.parse(imagesUri).concat(images) : images,
        categorie,
        description,
        subcategorie: JSON.parse(subcategorii),
        informatii: JSON.parse(informatii),
        variation: JSON.parse(variation),
      },
    },
    { new: true }
  );
};

exports.get_stock = async (req, res) => {
  const aggregate = await Produs.aggregate([
    { $match: { "variation.stock": { $lt: 20 } } },
    {
      $sort: { stock: 1 },
    },
  ]);
  res.json({ successMsg: aggregate });
};

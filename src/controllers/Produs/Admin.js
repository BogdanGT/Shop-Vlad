const Produs = require("../../Models/Produs");

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
    { $match: { "variation.stock": { $lt: 5 } } },
    {
      $sort: { "variation.stock": 1 },
    },
  ]);
  let produse = [];
  aggregate.forEach((produs, index_produs) => {
    produs.variation.forEach((vars, index_vars) => {
      if (vars.stock <= 5) {
        produse.push({
          nume: produs.nume,
          description: produs.description,
          images: produs.images,
          informatii: produs.informatii,
          categorie: produs.categorie,
          timestamp: produs.timestamp,
          nume_marime: vars.nume,
          stock_marime: vars.stock,
          pret_marime: vars.pret,
          nr_solds: produs.nr_solds,
          subcategorie: produs.subcategorie,
          _id: produs._id,
        });
      }
    });
  });
  res.json({ successMsg: produse });
};

exports.update_aprovizionare = async (req, res) => {
  await Produs.updateOne(
    {
      _id: req.params.product_id,
      "variation.nume": req.body.nume,
    },
    {
      $set: {
        "variation.$.stock": req.body.stoc,
      },
    },
    { new: true }
  );
  console.log(req.body, req.params.product_id);
};

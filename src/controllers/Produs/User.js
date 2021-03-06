const Produs = require("../../Models/Produs");
const User = require("../../Models/User");
const mongoose = require("mongoose");
const Comanda = require("../../Models/Comenzi");

exports.get_all_products = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  if (name) {
    const produse = await Produs.find({
      name: { $regex: name, $options: "i" },
    });
    console.log(produse);
    res.json({ successMsg: produse });
  } else {
    const produse = await Produs.aggregate([
      { $sort: { "variation.stock": -1 } },
    ]);
    res.json({ successMsg: produse });
  }
};

exports.get_product = async (req, res) => {
  const product_id = req.params.product_id;
  const product = await Produs.findById(product_id);
  console.log("asdasdasd");

  if (!product) return res.send({ err: "Category not found!" });

  res.json({ successMsg: product });
};

exports.get_products_by_category = async (req, res) => {
  const product_category = req.params.product_category;

  const product = await Produs.find({ cateogrie: product_category });

  if (!product) return res.send({ err: "Category not found!" });

  res.json({ successMsg: product });
};

exports.nushcee = async (req, res, next) => {
  const { product_name } = req.params;
  const product = await Produs.find({ name: product_name });
  if (product.length == 0) return res.json({ err: "Products not found." });

  res.send(product);
};

exports.last_8 = async (req, res) => {
  const data = await Produs.aggregate([
    { $match: { timestamp_cumparare: { $gt: 0 } } },
    {
      $sort: { timestamp_cumparare: -1 },
    },
    { $limit: 8 },
  ]);
  res.json({ successMsg: data });
};

exports.top_vandute = async (req, res) => {
  const data = await Produs.aggregate([
    { $match: { nr_solds: { $gt: 0 } } },
    {
      $sort: { nr_solds: -1 },
    },
    { $limit: 8 },
  ]);
  res.json({ successMsg: data });
};

exports.adaugate_recent = async (req, res) => {
  const data = await Produs.aggregate([
    { $match: { timestamp_adaugare: { $gt: 0 } } },
    {
      $sort: { timestamp_adaugare: -1 },
    },
    { $limit: 8 },
  ]);
  res.json({ successMsg: data });
};

exports.add_review = async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = mongoose.Types.ObjectId();

  const comanda = await Comanda.findOne({
    email: user.email,
    "produse.id": req.params.product_id,
  });

  if (comanda) {
    await Produs.findByIdAndUpdate(
      req.params.product_id,
      {
        $push: {
          review: {
            message: req.body.message,
            rating: req.body.stars,
            username: `${user.nume} ${user.prenume}`,
            _id: id,
            userId: user._id,
          },
        },
      },
      { new: true }
    );
  } else {
    return res.json({ errorMsg: { data: "You didn't bought it" } });
  }

  res.json({ successMsg: { data: id } });
};

exports.delete_review = async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log();
  await Produs.findByIdAndUpdate(
    req.params.product_id,
    {
      $pull: {
        review: {
          _id: mongoose.Types.ObjectId(req.params.review_id),
        },
      },
    },
    { new: true }
  );
  console.log(req.body);
  res.json({ successMsg: { data: "delete" } });
};

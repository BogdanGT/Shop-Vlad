const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Auth = require("./src/routes/Auth");
const Product = require("./src/routes/Produs");
const Comanda = require("./src/routes/Comenzi");
mongoose
  .connect(
    "mongodb://mywves-7qizra-miptiP:dyfku8-tybxun-hoHjef@127.0.0.1:27017/test/?authSource=admin"
  )
  .then(() => console.log("mongoose conected"))
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
app.use("/auth", Auth);
app.use("/product", Product);
app.use("/comanda", Comanda);

app.use("/Images", express.static("./Images"));

app.listen(5000, () => {
  console.log("app lisen");
});

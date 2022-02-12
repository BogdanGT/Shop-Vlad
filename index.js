const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Auth = require("./src/routes/Auth");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("merge"))
  .catch(() => console.log("nu merge"));

app.use(cors());
app.use(express.json());
app.use("/auth", Auth);

app.listen(5000, () => {
  console.log("asdasd");
});

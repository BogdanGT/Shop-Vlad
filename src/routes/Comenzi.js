const express = require("express");
const app = express.Router();
const isUser = require("../Middleware/User");
const isAdmin = require("../Middleware/Admin");
const { create_comanda } = require("../controllers/Comenzi/User");
const {
  update_status,
  all_comenzi,
  comenzi_plasate,
  comenzi_confirmate,
  get_comanda,
  update_status_admin,
  delete_comanda,
} = require("../controllers/Comenzi/Admin");

// -----ADMIN-----

app.get("/", all_comenzi);

app.get("/single/:cid", get_comanda);

app.get("/plasate", comenzi_plasate);

app.get("/confirmate", comenzi_confirmate);

app.put("/update/:cid", update_status_admin);

app.delete("/delete/:cid", delete_comanda);

// -----USER-----

app.post("/", isUser, create_comanda);

app.put("/:cid", isUser, update_status);

module.exports = app;

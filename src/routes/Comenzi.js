const express = require("express");
const app = express.Router();
const isUser = require("../Middleware/User");
const isAdmin = require("../Middleware/Admin");
const {
  create_comanda,
  update_status,
} = require("../controllers/Comenzi/User");
const {
  all_comenzi,
  comenzi_plasate,
  comenzi_confirmate,
  get_comanda,
  update_status_admin,
  delete_comanda,
  update_comanda,
} = require("../controllers/Comenzi/Admin");

// -----ADMIN-----

app.get("/", all_comenzi);

app.get("/single/:cid", get_comanda);

app.get("/plasate", comenzi_plasate);

app.get("/confirmate", comenzi_confirmate);

app.put("/update/:cid", update_status_admin);

app.delete("/delete/:cid", delete_comanda);

app.put("/update_comanda/:cid", update_comanda);

// -----USER-----

app.post("/", create_comanda);

app.put("/:cid", update_status);

module.exports = app;

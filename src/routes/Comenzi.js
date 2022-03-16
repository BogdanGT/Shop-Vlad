const express = require("express");
const app = express.Router();
const isUser = require("../Middleware/User");
const isAdmin = require("../Middleware/Admin");
const { create_comanda } = require("../controllers/Comenzi/User");
const {
  update_status,
  all_comenzi,
  plasate_comenzi,
  confirmate_comenzi,
  get_comanda,
  update_status_admin,
  delete_comanda,
} = require("../controllers/Comenzi/Admin");

// -----ADMIN-----

app.get("/", all_comenzi);

app.get("/single/:cid", get_comanda);

app.get("/plasate", plasate_comenzi);

app.get("/confirmate", confirmate_comenzi);

app.put("/update/:cid", update_status_admin);

app.delete("/delete/:cid", delete_comanda);

// -----USER-----

app.post("/", isUser, create_comanda);

app.put("/:cid", isUser, update_status);

module.exports = app;

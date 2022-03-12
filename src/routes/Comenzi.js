const express = require("express");
const app = express.Router();
const isUser = require("../Middleware/User");
const isAdmin = require("../Middleware/Admin");
const { create_comanda } = require("../controllers/Comenzi/User");
const { update_status, all_comenzi } = require("../controllers/Comenzi/Admin");

// -----ADMIN-----
app.put("/:cid", isAdmin, update_status);

app.get("/", isAdmin, all_comenzi);

// -----USER-----
app.post("/", isUser, create_comanda);

module.exports = app;

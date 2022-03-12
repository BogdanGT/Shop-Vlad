const express = require("express");
const app = express.Router();
const authMiddleware = require("../Middleware/User");

const {
  change_address,
  change_password,
  contact,
  login,
  my_comenzi,
  my_user,
  register,
  update_user,
  verify_admin,
} = require("../controllers/Auth/User");

app.post("/login", login);

app.post("/register", register);

app.put("/", authMiddleware, update_user);

app.put("/change-password", authMiddleware, change_password);

app.put("/change-address", authMiddleware, change_address);

app.get("/comenzi", authMiddleware, my_comenzi);

app.post("/contact", authMiddleware, contact);

app.get("/user", authMiddleware, my_user);

app.get("/verify_admin", authMiddleware, verify_admin);

module.exports = app;

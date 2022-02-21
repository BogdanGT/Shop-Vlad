const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
    name: String,
    first_name: String,
    adress: String,
    phone_number: String,
    role: String,
  },
  { collection: "Useri" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

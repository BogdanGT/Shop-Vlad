const User = require("../../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Comanda = require("../../Models/Comenzi");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ errorMsg: "Email sau parola gresite!" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  const payload = {
    user: { id: user._id },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  if (checkPassword) {
    return res.json({ successMsg: { accessToken: token } });
  } else {
    return res.json({ errorMsg: "Email sau parola gresite!" });
  }
};

exports.register = async (req, res) => {
  const { email, nume, prenume, telefon, password } = req.body;
  console.log(req.body);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ errMsg: { email: "Exista un cont cu acest email!" } });
  }

  // const transporter = nodemailer.createTransport({
  //   service: process.env.NODEMAILER_SERVICE,
  //   auth: {
  //     user: process.env.NODEMAILER_EMAIL,
  //     pass: process.env.NODEMAILER_PASSWORD,
  //   },
  // });
  // sa ma iei de pula mere asd gggggggg asd
  // nume , pret , brand , descriere 2 , poze
  // let mail_options = {
  //   from: process.env.NODEMAILER_EMAIL,
  //   to: "bogdantunsugt@gmail.com",
  //   subject: "Ai primit codul de inregistrare!",
  //   text: `Codul de inregistrare este - ${registerCode}`,
  // };

  // await transporter.sendMail(mail_options);

  const passwordEnc = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    nume,
    prenume,
    telefon,
    password: passwordEnc,
    role: "user",
    adresa: {},
  });
  console.log(user);

  const payload = {
    user: { id: user._id },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  await user.save();

  res.json({ successMsg: { accessToken: token } });
};

exports.update_user = async (req, res) => {
  const { nume, prenume, email, telefon } = req.body;
  console.log(req.body);
  console.log("asdasd");
  const id = req.user.id;
  const user = await User.findOne({ _id: id });
  if (!user) return res.json({ err: "User not found" });
  user.nume = nume;
  user.prenume = prenume;
  user.email = email;
  user.telefon = telefon;
  user.save();
  res.json({ successMsg: user });
};

exports.change_password = async (req, res) => {
  const { parolaTa, parolaNoua } = req.body;
  const { id } = req.user;
  let user = await User.findOne({ _id: id });
  if (!user) return res.send({ errorMsg: "User not found" });

  const isGood = await bcrypt.compare(parolaTa, user.password);

  if (!isGood) {
    return res.json({ errorMsg: "Parola nu este buna!" });
  }

  const newPassword = await bcrypt.hash(parolaNoua, 10);
  user.password = newPassword;
  await user.save();
  res.send({ successMsg: "Parola a fost schimbata cu succes!" });
};

exports.change_address = async (req, res) => {
  const { strada, bloc, judet, localitate, codPostal, nume, prenume, telefon } =
    req.body;
  const user = await User.findById(req.user.id);

  user.adresa = {
    strada,
    bloc,
    judet,
    localitate,
    codPostal,
    nume,
    prenume,
    telefon,
  };
  await user.save();
  res.json({ successMsg: "Adresa a fost schimbata cu succes!" });
};

exports.my_comenzi = async (req, res) => {
  const comenzi = await Comanda.find({ creator: req.user.id });
  console.log(comenzi);

  res.json({ successMsg: comenzi });
};

exports.contact = async (req, res) => {
  const { name, mail, subiect, mesaj } = req.body;

  console.log(req.body);
  res.json({ successMsg: "Emailul a fost trimis cu succes!" });
};

exports.my_user = async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log(req.user);

  res.json({ user });
};

exports.verify_admin = async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log(user.role);

  res.json({ successMsg: { role: user.role } });
};

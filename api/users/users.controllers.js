const User = require("../../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const hashpass = async (password) => {
  try {
    const hashedpass = await bcrypt.hash(password, 10);
    return hashedpass;
  } catch (error) {
    console.log(error);
  }
};
const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "8h",
  });
  return token;
};
module.exports.signup = async (req, res, next) => {
  try {
    req.body.password = await hashpass(req.body.password);
    const user = await User.create(req.body);
    const token = generateToken(user);
    return res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};

module.exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("urls"); //.select("username");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

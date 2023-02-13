const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../db/models");
const { JWT_SECRET } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 900000, // 900000 -> 15 mins
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  return token;
};

exports.signin = async (req, res, next) => {
  try {
    console.log(req.user);
    const token = generateToken(req.user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

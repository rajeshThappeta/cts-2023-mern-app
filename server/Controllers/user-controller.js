//import User model
const User = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const getUsers = async (req, res) => {
  const usersList = await User.find();
  res.status(200).send({ message: "users", payload: usersList });
};

const getUserByUsername = (req, res) => {
  res.send({ message: "one user" });
};

//Create new User
const createUser = async (req, res) => {
  //check for existing user with same username
  let existingUser = await User.findOne({ username: req.body.username });
  //user already existed
  if (existingUser !== null) {
    return res.status(200).send({ message: "User already existed" });
  }
  //if user not existed, then hash password
  const hashedPassword = await bcryptjs.hash(req.body.password, 6);
  //replace plain password with hashed pw
  req.body.password = hashedPassword;
  const newUser = await User.create(req.body);

  res.status(201).send({ message: "User created", payload: newUser });
};

//User login
const loginUser = async (req, res) => {
  //get user crdentials object from req
  const userCredentials = req.body;
  //check username
  let user = await User.findOne({ username: userCredentials.username });
  //if invalid username
  if (user === null) {
    return res.status(401).send({ message: "Invalid username" });
  }
  //if username is found, compare passwords
  const result = await bcryptjs.compare(
    userCredentials.password,
    user.password
  );
  //if pasword not matched
  if (result === false) {
    return res.status(401).send({ message: "Invalid password" });
  }
  //Create jwt token and sign it
  const signedToken = jwt.sign(
    { username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  res
    .status(200)
    .send({ message: "login success", token: signedToken, user: user });
};

const updateUser = async (req, res) => {
  let user = await User.findOneAndUpdate(
    { username: req.body.username },
    { ...req.body }
  );
  res.status(200).send({ message: "User modified", payload: user });
};

const removeUser = (req, res) => {
  res.send({ message: "user removed" });
};

//export
module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  removeUser,
  loginUser
};

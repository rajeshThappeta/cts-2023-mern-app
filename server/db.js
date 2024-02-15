//import mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.ATLAS_DB_URL;
//coonect to DB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connection success");
  })
  .catch((err) => console.log("Error in DB connect", err));

//create User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required, but missed"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: String,
  dob: Date,
});

//create Model(class) for the userSchema
const User = mongoose.model("user", userSchema);

//export User model
module.exports = User;

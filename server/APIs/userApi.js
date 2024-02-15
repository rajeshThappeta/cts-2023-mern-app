const exp = require("express");
//create a mini-express app
const userApp = exp.Router();
userApp.use(exp.json());
userApp.use(exp.urlencoded({ extended: true }));

const verifyToken = require("../middlewares/verifyToken");
const expressAsyncHandler = require("express-async-handler");
const { getUsers } = require("../controllers/userController");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const verifyDuplicateUser = require("../middlewares/verifyDuplicateUser");

require("dotenv").config(); //process.env
console.log(process.env);

let usersCollection;
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  next();
});

//configure
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//configure cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  // params: {
  //   folder: "CloudinaryDemo",
  //   allowedFormats: ["jpeg", "png", "jpg"],
  // },
});

// userApp.use(
//   exp.urlencoded({
//     extended: true,
//   })
// );

const upload = multer({ storage: storage });
//userApp.use(upload.array());

//get all users
userApp.get("/users", expressAsyncHandler(getUsers));

//get user by id
userApp.get(
  "/users/:userId",
  expressAsyncHandler(async (req, res) => {
    //get user id from url params
    let userId = Number(req.params.userId);
    //find user by id
    let user = await usersCollection.findOne({ userId: userId });
    //send res
    res.status(200).send({ message: "user", payload: user });
  })
);

//post req handler
userApp.post(
  "/user",
  verifyDuplicateUser,
  upload.single("pic"),
  async (req, res) => {
    //get user from client
    const user = req.body;
    console.log(req.body);
    //console.log(req.file.url);

    //add image URL to user resource
    // user.imageUrl = req.file.url;

    //hash the password
    // let hashedPassword = await bcryptjs.hash(user.password, 5);
    //replace plain password with hashed password
    // user.password = hashedPassword;
    //save  user
    // usersCollection.insertOne(user);
    //res
    res.status(201).send({ message: "User created" });
  }
);

//login route
userApp.post("/user-login", async (req, res) => {
  //get user credemntials obj
  let userCred = req.body;
  //check the user in db with username
  let userOfDb = await usersCollection.findOne({ username: userCred.username });
  //if it returns null
  if (userOfDb === null) {
    res.status(404).send({ message: "Invalid user" });
  }
  //if user found
  else {
    //compare password
    let result = await bcryptjs.compare(userCred.password, userOfDb.password);
    //if passwords are not matched
    if (result === false) {
      res.status(404).send({ message: "Invalid password" });
    }
    //if passwords are matched
    else {
      //create a signed token(encoded token)
      let signedToken = jwt.sign(
        { username: userOfDb.username },
        process.env.SECRET_NAME,
        {
          expiresIn: 20,
        }
      );
      //send token to cleint
      res
        .status(200)
        .send({ message: "login success", token: signedToken, user: userOfDb });
    }
  }
});

//put req handler
userApp.put("/user", async (req, res) => {
  //get modified user from client
  const user = req.body;
  //update user by id
  let dbRes = await usersCollection.updateOne(
    { userId: user.userId },
    { $set: { ...user } }
  );
  console.log(dbRes);
  //send res
  res.status(200).send({ message: "User updated" });
});

//delete user by id
userApp.delete("/user/:id", (req, res) => {});

//protected route
userApp.get("/protected", verifyToken, (req, res) => {
  console.log(req.headers);
  res.send({ message: "This res from protected route" });
});

//export userApp
module.exports = userApp;

//$2a$05$skaC0O/WqVCXPdF7m4eBZuAerd.OKixjzDZsV.IDxmq.a01d.kddq
//$2a$06$U7vJHN5K0h/BHld0CaHDEub6Ib3eaVgSbuS1C4aZf.cWTY9q5jruK

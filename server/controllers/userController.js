const userApp=require('../APIs/userApi')



const getUsers = async (req, res) => {

 let usersCollection=req.app.get('usersCollection')
  //read all users
  let usersList = await usersCollection.find().toArray();
  //send res
  res.status(200).send({ message: "users", payload: usersList });
};

module.exports = { getUsers };

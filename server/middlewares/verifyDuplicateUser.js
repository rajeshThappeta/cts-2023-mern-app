
 function verifyDuplicateUser(req,res,next){

    //get user from client
    let user=req.body;
    console.log("md",req.body)
    const usersCollection=req.app.get('usersCollection')
    //ufind user by username
//    let userOfDb= await usersCollection.findOne({username:user.username})
//     console.log(userOfDb)
//    //if user found
//    if(userOfDb!==null){
//     res.status(200).send({message:"User already existed"})
//    }else{
//     next()
//    }
usersCollection.findOne({username:user.username}).then(userOfDb=>{
   if(userOfDb!==null){
    res.status(200).send({message:"User already existed"})
   }else{
      console.log("calling next")
    next()
   }
}).catch(err=>console.log("err",err))

}


module.exports=verifyDuplicateUser;
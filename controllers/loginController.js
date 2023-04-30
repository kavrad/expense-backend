const path=require('path');
const users=require('../models/users');


exports.login=function(req,res,next){
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}
exports.postLogin=async function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;
  let responseEmail=await users.findOne({where:{email:req.body.email}});
  let responsePassword=await users.findOne({where:{password:password}})
  if(responseEmail === null && responsePassword === null){
   res.json('The user does not exist')
  }else if(responseEmail === null){
    res.json('The email does not exist')
  }else if(responsePassword ===null){
   res.json('The pasword does not exist');
  }
  else{
    res.json(responseEmail);
  }
}
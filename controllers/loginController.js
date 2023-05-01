const path=require('path');
const users=require('../models/users');
const becrypt=require('bcrypt');

exports.login=function(req,res,next){
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}
exports.postLogin=async function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;
  let responseEmail=await users.findOne({where:{email:req.body.email}});
  
  becrypt.compare(password,responseEmail.password,function(err,same){
     if(err){
      res.json(err);
      return;
     }
   if(same){
    res.json(responseEmail);
    
   }else{
    res.json('The password is incorrect')
    }
  })
   
   
  //})
  
  //let responsePassword=await users.findOne({where:{password:password}})*/
  console.log(responseEmail.password,responseEmail.email);
}

/*
 else{
   
 }*/
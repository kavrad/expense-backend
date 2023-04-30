const users=require('../models/users');
const path=require('path');
exports.signUp=async function(req,res,next){
   console.log(req.body);
   let response=await users.findOne({where:{email:req.body.email}})
   if(response === null){
    users.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(()=>{
        res.redirect('/login');
    }).catch(err =>console.log(err));
   }else{
    return res.send('User already exists'); 
   }
   
}

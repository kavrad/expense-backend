const {v4 : uuidv4} = require('uuid');
const Sib=require('sib-api-v3-sdk');
const bycrypt=require('bcrypt');
require('dotenv').config();
const path=require('path');
const forgotPasswordsModel=require('../models/forgotPassword');
const users=require('../models/users');
exports.showForgotPassword=function(req,res,next){
    return res.sendFile(path.join(__dirname,'..','views','forgotPassword.html'));
}

exports.forgotPassword=async function(req,res,next){
    try{
        const id=uuidv4();
    const user=await users.findOne({where:{email:req.body.email}})
    if(user){
        
        forgotPasswordsModel.create({
            id:id,
            active:true,
            userId:user.id
        }).catch((err)=>{
            throw new Error(err);
        })
    
 const client= Sib.ApiClient.instance;
 const apiKey=client.authentications['api-key'];
 apiKey.apiKey="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";
 const tranEmailApi=new Sib.TransactionalEmailsApi();
 const sender={
    email:'kavyaht39@gmail.com',
    name:'Kavya'
 }
 const recievers=[
    {
        email:req.body.email
    }
 ]
 const result=await tranEmailApi.sendTransacEmail({
    sender,
    to:recievers,
    subject:'reset password',
    textContent:'It is a reset password link',
    htmlContent:`<a href="http://localhost:800/password/resetpassword/${id}">Reset password</a>`
 })
 console.log(result);
 res.status(200).json({message:'Link to reset password sent to your mail ', sucess: 'true',link:"http://localhost:800/password/resetpassword/${id}"})
}else{
    throw new Error('User doesnt exist')
}
}catch(err){
    console.log(err);
    return res.json({ message: err, sucess: false });
}
}

exports.showResetPassword=function(req,res,next){
    return res.sendFile(path.join(__dirname,'..','views','resetpassword.html'));
}

exports.resetPassword=function(req,res,next){
    const id=req.params.id;
    forgotPasswordsModel.findOne({where:{id:id}}).then((password)=>{
      if(password){
        password.update({active:false});
        res.status(200).send(`
          <html>
          <script>
          function formSubmit(e){
            e.preventDefault();
            console.log('called');
            axios.get("http://localhost:800/password/updatepassword/${id}").then((data)=>{
             alert(data.message);
            })
          }
          </script>
          <form action="/password/updatepassword/${id}" method="get">
          <label for="newpassword">Enter New password</label>
         <input name="newpassword" type="password" required></input>
         <button>reset password</button>
          </form>
        `)
        res.end();
      }
    })
}

exports.updatePassword=function(req,res,next){
    try{
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        console.log(newpassword,resetpasswordid);
        forgotPasswordsModel.findOne({where:{id:resetpasswordid}}).then((resetpasswordrequest )=>{
            console.log(resetpasswordrequest.userId);
            users.findOne({where:{id:resetpasswordrequest.userId}}).then((user)=>{
                console.log(user);
                if(user){
                    const saltRounds=10;
                    bycrypt.genSalt(saltRounds,function(err,salt){
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bycrypt.hash(newpassword,salt,function(err,hash){
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({password:hash}).then(()=>{
                                res.status(201).json({message:'sucesssfully updated new password'});
                            })
                        })
                    })
                }else{
                    return res.status(404).json({ error: 'No user Exists', success: false})
                }
            })
        })
    }catch(err){
        return res.status(403).json({ error, success: false } )

    }
}
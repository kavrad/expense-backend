const rzp=require('razorpay');
const orders=require('../models/order')

exports.purchasePremium=function(req,res,next){
  try{
    const razorpay=new rzp({
         key_id:"rzp_test_AXju51VVyyxDe7",
         key_secret:"kyzUqH7cqFHzQRgxp12KcOXE"
    })
    
    const amount=2500;
   razorpay.orders.create({amount:amount,currency:"INR"},(err,data)=>{
     if(err){
        console.log(err);
        return;
     }
     orders.create({
        orderId:data.id,
        status:"Pending",
        userId:req.user.id
     }).then(()=>{
        res.status(201).json({data,key_id:razorpay.key_id})
     }).catch(err =>{
        throw err;
     })
   })
   
  }catch(err){
    console.log(err);
  }
}
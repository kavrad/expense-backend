const orders=require('../models/order');
const users=require('../models/users');
exports.updateMembership=async function(req,res,next){
    try{
        console.log(req.body);
        let order=await orders.findOne({where:{orderId:req.body.order_id}})
            console.log(order)
            await order.update({paymentId:req.body.payment_id,status:"Successful"})
            await req.user.update({isPremium:true})
            return res.json({message:'Transaction Sucessful'})
       
    }catch(err){
        console.log(err);
      res.status(403).json({message:'Mission failed'})
    }
}

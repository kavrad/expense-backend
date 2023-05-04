const path=require('path');
const expenses=require('../models/expense');
const users=require('../models/users');
exports.addExpense=function(req,res,next){
res.sendFile(path.join(__dirname,'..','views','addExpenses.html'));
}

exports.postAddExpense=async function(req,res,next){
   console.log(req.body);
       expenses.create({
         expenseAmount:req.body.expenseAmount,
         desc:req.body.desc,
         category:req.body.category,
         userId:req.user.id,
         
      }).then(()=>{
         const totalExpense=Number(req.user.totalExpenses)+Number(req.body.expenseAmount);
         console.log(totalExpense);
         users.update({totalExpenses:totalExpense},{where:{id:req.user.id}}).then(()=>{
            res.redirect('/show-expense');
         }).catch((err)=>{
            return res.status(500).json({message:err,status:"failed"})
         })
        
      }).catch(err => console.log(err))
   }

exports.showExpense=function(req,res,next){
   try{
   expenses.findAll({where:{userId:req.user.id}}).then((expense)=>{
     return res.json(expense);
   })
}catch(err){
    res.json(JSON.stringify(err))
}
}
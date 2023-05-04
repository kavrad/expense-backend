const path=require('path');
const expenses=require('../models/expense');
exports.addExpense=function(req,res,next){
res.sendFile(path.join(__dirname,'..','views','addExpenses.html'));
}

exports.postAddExpense=async function(req,res,next){
   console.log(req.body);
   let response=await expenses.findOne({where:{desc:req.body.desc}});
   //f(response === null){
      expenses.create({
         expenseAmount:req.body.expenseAmount,
         desc:req.body.desc,
         category:req.body.category,
         userId:req.user.id
      }).then(()=>{
         res.redirect('/show-expense');
      }).catch(err => console.log(err))
   }/*else{
     res.redirect('/expense');
   }*/


exports.showExpense=function(req,res,next){
   try{
   expenses.findAll({where:{userId:req.user.id}}).then((expense)=>{
     return res.json(expense);
   })
}catch(err){
    res.json(JSON.stringify(err))
}
}
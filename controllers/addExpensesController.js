const path=require('path');
const expenses=require('../models/expense');
exports.addExpense=function(req,res,next){
res.sendFile(path.join(__dirname,'..','views','addExpenses.html'));
}

exports.postAddExpense=async function(req,res,next){
   console.log(req.body);
   console.log(Number.parseInt(expenses.id))
   let response=await expenses.findOne({where:{desc:req.body.desc}});
   if(response === null){
      expenses.create({
         expenseAmount:req.body.expenseAmount,
         desc:req.body.desc,
         category:req.body.category
      }).then(()=>{
         res.redirect('/show-expense');
      }).catch(err => console.log(err))
   }else{
     res.redirect('/expense');
   }
}

exports.showExpense=function(req,res,next){
   expenses.findAll().then((expense)=>{
     res.json(expense);
   })
}
const path=require('path');
const expenses=require('../models/expense');
const users=require('../models/users');
const sequelize=require('../utils/database')

exports.addExpense=function(req,res,next){
res.sendFile(path.join(__dirname,'..','views','addExpenses.html'));
}

exports.postAddExpense=async function(req,res,next){
   const t=await sequelize.transaction();
   try{
     console.log(req.body);
       let expenses=await expenses.create({
         expenseAmount:req.body.expenseAmount,
         desc:req.body.desc,
         category:req.body.category,
         userId:req.user.id,
         
      },{transaction:t})
         const totalExpense=Number(req.user.totalExpenses)+Number(req.body.expenseAmount);
         console.log(totalExpense);
         await users.update({totalExpenses:totalExpense},{where:{id:req.user.id}},{transaction:t})
         await t.commit();
         res.redirect('/show-expense');
         
      }catch(err){
      t.rollback();
      return res.status(500).json({message:err,status:"failed"})
   }
      
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
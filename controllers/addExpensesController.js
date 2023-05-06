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
     
        const newExpense=await expenses.create({
         expenseAmount:req.body.expenseAmount,
         desc:req.body.desc,
         category:req.body.category,
         userId:req.user.id,
         
      },{transaction:t})
        // const totalExpense=Number(req.user.totalExpenses)+Number(req.body.expenseAmount);
         const user=await users.findOne({where:{id:req.user.id},transaction:t});
         user.totalExpenses=Number(req.body.expenseAmount)+user.totalExpenses;
         user.save();
        await t.commit();
         res.redirect('/show-expense');
      
    }catch(err){
      console.log(err);
      await t.rollback();
      res.status(400).json({success:false})
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
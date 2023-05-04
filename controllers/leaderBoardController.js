const users=require('../models/users');
const expenses=require('../models/expense');
exports.getLeaderBoard=async function(req,res,next){
    try{
      const Users=await users.findAll();
      const Expenses=await expenses.findAll();
      console.log(Expenses)
      const groupExpenses={};
      Expenses.forEach(function(expense){
       if(groupExpenses[expense.userId]){
        groupExpenses[expense.userId]=groupExpenses[expense.userId]+expense.expenseAmount;
       }else{
        groupExpenses[expense.userId]=expense.expenseAmount;
       }
      })
      console.log(groupExpenses);
      const groupUsers=[];
      Users.forEach(function(user){
       groupUsers.push({name:user.name,amount:groupExpenses[user.id] || 0})
      })
    let newUserleaderBoard=groupUsers.sort(function(a,b){
       return b.amount-a.amount;
      })
      return res.status(200).json(newUserleaderBoard);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err,status:"failed"})
    }
}
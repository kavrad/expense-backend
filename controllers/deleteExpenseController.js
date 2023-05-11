const expenses=require('../models/expense');
const users=require('../models/users');
const sequelize=require('../utils/database');

exports.deleteExpense= async function(req,res,next){
  const t=await sequelize.transaction();
    const id=req.params.id;
   const user= await users.findOne({where:{id:req.user.id}});
    expenses.findOne({where:{Id:id,userId:req.user.id}}).then((expense)=>{
      const amount=expense.expenseAmount;
      const expenses=Number(user.totalExpenses);
      const totalExpenses=expense>amount?expenses-amount:amount-expenses;
      expense.destroy({transaction:t}).then(async ()=>{
        await users.update({totalExpenses:totalExpenses},{where:{id:id},transaction:t})
        await t.commit();
        res.json({expense:expense,message:'Are you sure you want to delete it??'});
      }).catch(async (err) => {
        console.log(err)
         await t.rollback();
        

      }
      );
    })
}


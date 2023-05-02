const expenses=require('../models/expense');
exports.deleteExpense=function(req,res,next){
    const id=req.params.id;
    expenses.findOne({where:{Id:id,userId:req.user.id}}).then((expense)=>{
      expense.destroy().then(()=>{
        res.json({expense:expense,message:'Are you sure you want to delete it??'});
      }).catch(err => console.log(err));
    })
}


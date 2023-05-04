const users=require('../models/users');
const expenses=require('../models/expense');
const sequelize = require('../utils/database');

exports.getLeaderBoard=async function(req,res,next){
    try{
      const Users=await users.findAll({
        attributes:['id','name',[sequelize.fn('sum',sequelize.col(`expenses.expenseAmount`)),'amount']],
        include:[
        {
            model:expenses,
            attributes:[]
        }
        ],
        group:['users.id'],
        order:[[sequelize.col('amount'),"DESC"]]
    });
    
      return res.status(200).json(Users);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err,status:"failed"})
    }
}
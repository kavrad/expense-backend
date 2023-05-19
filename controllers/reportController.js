const path=require('path');
const users=require('../models/users');
const expenses=require('../models/expense');
const sequelize=require('../utils/database');
const { QueryTypes } = require('sequelize');

exports.showReport=async function(req,res,next){
   res.status(200).sendFile(path.join(__dirname,'..','views','report.html'));
}

exports.dailyExpenses=async function(req,res,next){
   try{
        const userId=req.user.id;
        
        const result=await sequelize.query(`SELECT TIME(createdAt) AS time, category, 'desc' AS 'desc', expenseAmount 
        FROM expenses.expenses 
        WHERE DATE(createdAt) = CURDATE() AND userId = ${userId};
        
        
        `,{
            type:QueryTypes.SELECT     
        })
        console.log(result);
        res.status(200).json({success:true,result:result})
   }catch(err){
     console.log(err);
     res.json({success:false,message:err});
   }
}

exports.monthlyExpenses=async function(req,res,next){
   try{
     const userId=req.user.id;
   const result=await sequelize.query(`Select date(createdAt) as date,sum(expenseAmount) as expenseAmount from expenses.expenses where month(createdAt)=month(curdate()) and year(createdAt)=year(curdate()) and userId=${userId} group by date(createdAt);`,{type:QueryTypes.SELECT})
   res.status(200).json({success:true,result:result});
   }catch(err){
      console.log(err);
      res.status(400).json({success:false})
   }
}
exports.yearlyExpenses=async function(req,res,next){
   try{
     const userId=req.user.id;
     const result=await sequelize.query(`Select month(createdAt) as month,sum(expenseAmount) as expenseAmount,year(createdAt) as year from expenses.expenses Where userId=${userId} group by month(createdAt),userId,year(createdAt);`,{type:QueryTypes.SELECT})
     res.status(200).json({success:true,result:result})
   }catch(err){
     console.log(err);
     res.status(400).json({success:false})
   }
}
const {Sequelize, DataTypes} =require('sequelize');
const sequelize=require('../utils/database');
const expenses=sequelize.define('expenses',{
    Id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    expenseAmount:{
        type:DataTypes.INTEGER,
    },
    desc:{
        type:DataTypes.STRING
    },
    category:{
        type:DataTypes.STRING
    }
})
module.exports=expenses;
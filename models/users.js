const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../utils/database');
const users=sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:Math.random()
    },
    name:{
        type:DataTypes.STRING,
 
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        
    },
    password:{
        type:DataTypes.STRING
    }
})
module.exports=users;
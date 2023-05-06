const {Sequelize, DataTypes}=require('sequelize');
const sequelize=require('../utils/database');
const forgotPassword=sequelize.define('forgotPasswords',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    active:DataTypes.BOOLEAN,
    expiresBy:DataTypes.DATE
})
module.exports=forgotPassword;
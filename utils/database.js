const {Sequelize}=require('sequelize');

require('dotenv').config();

console.log(process.env.SQL_USER,process.env.SQL_PASSWORD);
const sequelize=new Sequelize(process.env.SQL_DATABASE,process.env.SQL_USER,process.env.SQL_PASSWORD,{
    dialect:'mysql',
    host:process.env.SQL_HOST,
});
module.exports=sequelize;
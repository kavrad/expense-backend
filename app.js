const fs=require('fs');
const https=require('https');
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const sequelize=require('./utils/database');
const users=require('./models/users');
const expenses=require('./models/expense');
const orders=require('./models/order')
const authentication=require('./utils/auth');
const forgotPasswords=require('./models/forgotPassword');
const forgotPasswordRoutes=require('./routes/password');
const helmet = require('helmet');
const morgan=require('morgan');

const port=5000;

const server=express();

const dotenv=require('dotenv').config();


server.use(bodyParser.urlencoded({extended:false}));

server.use(bodyParser.json())

server.use(express.static(path.join(__dirname,'public')));
const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
server.use(
    helmet({
      contentSecurityPolicy: false,
      xDownloadOptions: false,
    })
  );

server.use(morgan('combined',{stream:accessLogStream}))

const signUpRoutes=require('./routes/signUp');
server.use(signUpRoutes);

const loginRoutes=require('./routes/login');
server.use(loginRoutes);

const expenseRoutes=require('./routes/expense');
server.use(expenseRoutes);

const purchaseRoutes=require('./routes/purchase');
server.use('/purchase',purchaseRoutes)

const updateMemberRoutes=require('./routes/updateMember');
server.use(updateMemberRoutes);

const premiumRoutes=require('./routes/premium');
server.use(premiumRoutes);

const passwords=require('./routes/password');

server.use(passwords);

const PasswordRoutes=require('./routes/forgotPassword');
server.use('/password',PasswordRoutes);

const report=require('./routes/report');
server.use('/report',authentication.authenticate,report);

server.use(require('./routes/upload'));

users.hasMany(expenses);
expenses.belongsTo(users);

users.hasMany(orders);
orders.belongsTo(users);

users.hasMany(forgotPasswords);
forgotPasswords.belongsTo(users);

console.log(process.env);

sequelize.sync().then((result)=>{
    console.log(result);
    
    server.listen(port,function(err){
        try{
            if(err){
                throw err;
            }
            console.log(`Server is running on port ${port}`);
        }catch(err){
            console.log(err);
        }
    })
}).catch(err => console.log(err));

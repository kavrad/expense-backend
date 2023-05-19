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
const morgan=require('morgan');
const cors=require('cors');

const port=800;

const server=express();

const dotenv=require('dotenv').config();


server.use(bodyParser.urlencoded({extended:false}));

server.use(bodyParser.json())
server.use(cors());

//server.use(express.static(path.join(__dirname,'public')));

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})


server.use(morgan('combined',{stream:accessLogStream}))



const signUpRoutes=require('./routes/signUp');
server.use(signUpRoutes);
/*server.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname,'views','signUp.html'));
});*/

//server.post('/add-user',require('./controllers/signUpController').signUp);

const loginRoutes=require('./routes/login');
server.use(loginRoutes);

//server.get('/login',require('./controllers/loginController').login);

//server.post('/user/login',require('./controllers/loginController').postLogin);

const expenseRoutes=require('./routes/expense');
server.use(expenseRoutes);

//server.get('/expense',require('./controllers/addExpensesController').addExpense);

//server.post('/add-expense',authentication.authenticate,require('./controllers/addExpensesController').postAddExpense);

//server.get('/show-expense',authentication.authenticate,require('./controllers/addExpensesController').showExpense);

//server.delete('/delete-expense/:id',authentication.authenticate,require('./controllers/deleteExpenseController').deleteExpense);

const purchaseRoutes=require('./routes/purchase');
server.use('/purchase',purchaseRoutes)

//server.get("/purchase/premiumMembership",authentication.authenticate,require('./controllers/purchasePremiumController').purchasePremium);

const updateMemberRoutes=require('./routes/updateMember');
server.use(updateMemberRoutes);

//server.post('/updatemembership',authentication.authenticate,require('./controllers/updateMember').updateMembership);

//server.post('/updatemembershipFailed',authentication.authenticate,require('./controllers/updateMember').updateMembershipFailed)

const premiumRoutes=require('./routes/premium');
server.use(premiumRoutes);

//server.get('/get-premium',authentication.authenticate,require('./controllers/updateMember').isPremium);

//server.get('/purchase/leaderboard',authentication.authenticate,require('./controllers/leaderBoardController').getLeaderBoard)

const passwords=require('./routes/password');

server.use(passwords);

//server.get('/forgotpassword',require('./controllers/forgotPassword').showForgotPassword);

const PasswordRoutes=require('./routes/forgotPassword');
server.use('/password',PasswordRoutes);

//server.post('/password/forgot-password',authentication.authenticate,require('./controllers/forgotPassword').forgotPassword);

//server.get('/password/resetpassword/:id',require('./controllers/forgotPassword').showResetPassword);

//server.get('/password/resetpassword/:id',require('./controllers/forgotPassword').resetPassword);

//server.get('/password/updatepassword/:resetpasswordid',require('./controllers/forgotPassword').updatePassword);

//server.get('/expenses',authentication.authenticate,require('./controllers/addExpensesController').getExpense);

const report=require('./routes/report');
server.use('/report',authentication.authenticate,report);

server.use(require('./routes/upload'));

server.use((req,res)=>{
    console.log('url >>',req.url);
res.sendFile(path.join(__dirname,`views/${req.url}`))
})

users.hasMany(expenses);
expenses.belongsTo(users);

users.hasMany(orders);
orders.belongsTo(users);

users.hasMany(forgotPasswords);
forgotPasswords.belongsTo(users);



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

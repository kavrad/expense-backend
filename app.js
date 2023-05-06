const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const sequelize=require('./utils/database');
const users=require('./models/users');
const expenses=require('./models/expense');
const orders=require('./models/order')
const authentication=require('./utils/auth');
const resetpasswordController = require('./controllers/forgotPassword');
const port=800;
const server=express();
const dotenv = require('dotenv');
const Forgotpassword = require('./models/forgotPassword');
// get config vars
dotenv.config();

server.use(bodyParser.urlencoded({extended:false}));

server.use(bodyParser.json())

server.use(express.static(path.join(__dirname,'public')));

server.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname,'views','signUp.html'));
});

server.post('/add-user',require('./controllers/signUpController').signUp);

server.get('/login',require('./controllers/loginController').login);

server.post('/user/login',require('./controllers/loginController').postLogin);

server.get('/expense',require('./controllers/addExpensesController').addExpense);

server.post('/add-expense',authentication.authenticate,require('./controllers/addExpensesController').postAddExpense);

server.get('/show-expense',authentication.authenticate,require('./controllers/addExpensesController').showExpense);

server.delete('/delete-expense/:id',authentication.authenticate,require('./controllers/deleteExpenseController').deleteExpense);

server.get("/purchase/premiumMembership",authentication.authenticate,require('./controllers/purchasePremiumController').purchasePremium);

server.post('/updatemembership',authentication.authenticate,require('./controllers/updateMember').updateMembership);

server.post('/updatemembershipFailed',authentication.authenticate,require('./controllers/updateMember').updateMembershipFailed)

server.get('/get-premium',authentication.authenticate,require('./controllers/updateMember').isPremium);

server.get('/purchase/leaderboard',authentication.authenticate,require('./controllers/leaderBoardController').getLeaderBoard)

server.get('/forgot-password',resetpasswordController.showForgotPassword);

server.get('/password/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)

server.get('/password/resetpassword/:id', resetpasswordController.resetpassword)

server.use('/password/forgotpassword', resetpasswordController.forgotpassword)

users.hasMany(expenses);
expenses.belongsTo(users);

users.hasMany(orders);
orders.belongsTo(users);

users.hasMany(Forgotpassword);
Forgotpassword.belongsTo(users);

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

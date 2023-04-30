const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const sequelize=require('./utils/database');
const port=800;
const server=express();

server.use(bodyParser.json());

server.use(express.static(path.join(__dirname,'public')));

server.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname,'views','signUp.html'));
});

server.post('/add-user',require('./controllers/signUpController').signUp);

server.get('/login',require('./controllers/loginController').login);

server.post('/user/login',require('./controllers/loginController').postLogin);

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

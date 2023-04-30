const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const port=800;
const server=express();

server.use(bodyParser.urlencoded({extended:false}));

server.use(express.static(path.join(__dirname,'public')));

server.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname,'views','signUp.html'));
});

server.post('/add-user',require('./controllers/signUpController').signUp);

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
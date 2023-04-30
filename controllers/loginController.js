const path=require('path');

exports.login=function(req,res,next){
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}
exports.signUp=function(req,res,next){
   console.log(req.body);
   return res.redirect('/'); 
}
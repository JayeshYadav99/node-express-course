
const {CustomError}=require('../error/CustomError')
const Handleerrors=(err,req,res,next)=>
{
 if(err instanceof CustomError)
 {
    return res.status(err.statusCode).json({msg:err.message}); 
 }
 console.log(err);
 return res.status(500).json({msg:'please try again'}); 
}
module.exports=Handleerrors; 
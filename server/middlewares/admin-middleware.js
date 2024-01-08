const adminMiddleware = async(req,res,next) =>{
    try{
        if(!req.user.isAdmin){
            throw new Error("You are not admin");
        }
        next();
    }catch(err){
        next(err);
    }
}

module.exports = adminMiddleware;
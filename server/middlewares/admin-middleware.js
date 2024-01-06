const adminMiddleware = async(req,res,next) =>{
    try{
        console.log(req.user);
        if(!req.user.isAdmin){
            throw new Error("You are not admin");
        }
        next();
    }catch(err){
        next(err);
    }
}

module.exports = adminMiddleware;
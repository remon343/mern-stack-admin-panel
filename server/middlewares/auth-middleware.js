const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async(req,res,next) => {
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied"})
    }
    // Assuming token is in the format of Bearer <token> 
    try{
        const jwtToken = token.split(" ")[1];

        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        if(!isVerified){
            throw new Error("Token isnot valid");
        }
        const userData = await User.findOne({email: isVerified.email}).select("-password");

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    }catch(err){
        return res.status(401).json({msg: err.message});
    }
}

module.exports = authMiddleware;
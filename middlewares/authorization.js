const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.Authorization = async(req,res,next)=>{
    const token = req.get("Authorization");
    if(!token){
        const error = new Error("Invalid Authorization Token.");
        error.statusCode = 401;
        next(error);
        return;
    }
    try{
        const tokenData = jwt.verify(token,"amirhoseinTokenSec");
        const user = await User.findById(tokenData.userId);
        req.user = user;
        next();
    }catch(err){
        const error = new Error("Invalid Authorization Token.");
        error.statusCode = 401;
        next(error);
        return;
    }
}
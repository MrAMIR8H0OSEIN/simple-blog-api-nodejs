const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.postRegister = async(req,res,next)=>{
    try{
        const validate = validationResult(req);
        
        if(!validate.isEmpty()){
            const error = new Error("validation faild");
            error.statusCode = 422;
            error.validate = validate.array();
            throw error;
        }

        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.email;
        const hashedpassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedpassword,
        })
        await newUser.save();
        res.status(201).json({
            message: "succesful",
            user: {
                name: name,
                email: email
            }
        })
    }catch(err){
        next(err);
    }
}
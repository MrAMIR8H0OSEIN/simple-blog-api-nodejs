const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
        const password = req.body.password;
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
exports.postLogin = async(req,res,next)=>{
    try{
        const validate = validationResult(req);
        
        if(!validate.isEmpty()){
            const error = new Error("validation faild");
            error.statusCode = 422;
            error.validate = validate.array();
            throw error;
        }

        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email: email});

        if(!user){
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }
        const isValid = await bcrypt.compare(password,user.password);
        
        if(isValid){
            res.status(200).json({
                email: user.email,
                name: user.name,
                token: jwt.sign({userId:user._id},"amirhoseinTokenSec",{
                    expiresIn: "1h"
                })
            })
        }else{
            const error = new Error("Password Incorrect");
            error.statusCode = 406;
            throw error;
        }
    }catch(err){
        next(err);
    }
}
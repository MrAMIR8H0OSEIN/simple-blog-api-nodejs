const Post = require('../models/post');
const { validationResult } = require('express-validator');

exports.getPosts = (req,res)=>{
    res.status(200).json({
      posts: [
        {
          title: "test",
          content: "test",
        },
      ],
    });
}

exports.addPost = async(req,res,next)=>{
  try{
    const validate = validationResult(req);
    
    if(!validate.isEmpty()){
      const error = new Error("validation faild");
      error.statusCode = 422;
      error.validate = validate.array();
      throw error;
    }
  
    const title = req.body.title;
    const content = req.body.content;
    
    const newPost = Post({
      title: title,
      content: content,
      imageUrl: "images/sample.png",
      creator: {
        name: "Amirhosein Masalegooha",
      },
    });
  
    const result = await newPost.save();
  
    res.status(200).json({
        message: "Successfully",
        post: result
    })
  }catch(err){
    next(err);
  }
}
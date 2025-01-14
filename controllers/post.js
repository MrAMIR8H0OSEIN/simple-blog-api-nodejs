const Post = require('../models/post');
const { validationResult } = require('express-validator');

exports.getListPosts = async(req,res,next)=>{
  try{
    const posts = await Post.find();
    res.status(200).json({
      message: "Successfully",
      posts: posts
    })
  }catch(err){
    next(err)
  }
}
exports.getOnePost = async(req,res,next)=>{
  try{
    const postId = req.params.postId;
    const post = await Post.findById(postId).catch(()=>{
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    });
    res.status(200).json({
      message: "Successfully",
      post: post
    })
  }catch(err){
    next(err)
  }
}
exports.postAddPost = async(req,res,next)=>{
  try{
    const validate = validationResult(req);
    
    if(!validate.isEmpty()){
      const error = new Error("validation faild");
      error.statusCode = 422;
      error.validate = validate.array();
      throw error;
    }
    if(!req.file){
      const error = new Error("Please Upload File");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    
    const newPost = Post({
      title: title,
      content: content,
      imageUrl: `/${req.file.destination}/${req.file.filename}`,
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
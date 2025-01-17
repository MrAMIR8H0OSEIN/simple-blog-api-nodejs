const Post = require('../models/post');
const { validationResult } = require('express-validator');
const { deleteFile } = require('../utility/file');

exports.getListPosts = async(req,res,next)=>{
  try{
    const posts = await Post.find().populate({
      path: 'creator',
      select: ['name'],
    });
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
    const post = await Post.findById(postId).populate({
      path: 'creator',
      select: ['name'],
    }).catch(()=>{
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    });
    if(!post){
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Successfully",
      post: post
    })
  }catch(err){
    next(err)
  }
}
exports.postAddPost = async(req,res,next)=>{
  const image = req.file;
  try{
    const validate = validationResult(req);
    
    if(!validate.isEmpty()){
      const error = new Error("validation faild");
      error.statusCode = 422;
      error.validate = validate.array();
      throw error;
    }
    if(!image){
      const error = new Error("Please Upload File");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    
    const newPost = new Post({
      title: title,
      content: content,
      imageUrl: `/${image.destination}/${image.filename}`,
      creator: req.user._id,
    });
  
    const result = await newPost.save();

    req.user.posts.push(result._id);

    req.user.save();
  
    res.status(201).json({
        message: "Successfully",
        post: await result.populate({
          path: 'creator',
          select: ['name'],
        })
    })
  }catch(err){
    deleteFile(`/${image.destination}/${image.filename}`);
    next(err);
  }
}
exports.putEditPost = async(req,res,next)=>{
  const image = req.file;
  try{
    const postId = req.params.postId;

    const post = await Post.findById(postId).catch(()=>{
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    });
    if(!post){
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }

    if(post.creator.toString() !== req.user._id.toString()){
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const validate = validationResult(req);

    if(!validate.isEmpty()){
      const error = new Error("validation faild");
      error.statusCode = 422;
      error.validate = validate.array();
      throw error;
    }
    
    const title = req.body.title;
    const content = req.body.content;

    post.title = title;
    post.content = content;
    if(image){
      deleteFile(post.imageUrl);
      post.imageUrl = `/${image.destination}/${image.filename}`;
    }

    const result = await post.save();

    res.status(200).json({
      message: "Successfully",
      post: await result.populate({
        path: 'creator',
        select: ['name'],
      })
    })
  }catch(err){
    deleteFile(`/${image.destination}/${image.filename}`);
    next(err);
  }
}
exports.deleteRemovePost = async(req,res,next)=>{
  try{
    const postId = req.params.postId;

    const post = await Post.findByIdAndDelete(postId).catch(()=>{
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    });
    if(!post){
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
    if(post.creator.toString() !== req.user._id.toString()){
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    deleteFile(post.imageUrl);

    req.user.posts.pull(post._id);
    await req.user.save();

    res.status(200).json({
      message: "Successfully"
    })

  }catch(err){
    next(err);
  }
} 
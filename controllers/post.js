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

exports.addPost = async(req,res)=>{
  const validate = validationResult(req);
  if(!validate.isEmpty()){
    res.status(202).json({
      message: "validation faild",
      errors: validate.array()
    })
    return;
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
}
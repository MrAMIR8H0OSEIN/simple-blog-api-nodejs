const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use('/files',express.static(path.join(__dirname,'files')));

const postRoutes = require('./routes/post');
app.use('/posts',postRoutes);
const authRoutes = require('./routes/auth');
app.use('/auth',authRoutes);


app.use((error,req,res,next)=>{
  const statuscode = error.statusCode ?? 500;
  const message = error.message;
  res.status(statuscode).json({
    message,
    error: error
  })
  if(statuscode == 500){
    console.log(error);
  }
})

mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('starting ...')
    });
});
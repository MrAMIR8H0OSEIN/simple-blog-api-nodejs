const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const defaultRoutes = require('./routes/default');

app.use('/',defaultRoutes);

mongoose.connect('mongodb://localhost:27017/blog-api').then(()=>{
    app.listen(80,()=>{
        console.log('starting ...')
    });
});
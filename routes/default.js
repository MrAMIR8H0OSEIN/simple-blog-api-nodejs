const express = require('express');

const router = express.Router();

const posts = require('../controllers/post');
router.get('/posts',posts.getPosts);
router.post('/posts',posts.addPost);

module.exports = router;
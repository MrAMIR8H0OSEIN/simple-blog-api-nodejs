const express = require('express');
const {
    body
} = require('express-validator');

const router = express.Router();

const posts = require('../controllers/post');
router.get('/posts', posts.getPosts);
router.post('/posts', [
    body(['title', 'content'])
    .isString().trim().withMessage('مقدار ورودی حتما باید یک رشته باشد')
    .isLength({min: 5}).withMessage('مقدار ورودی حداقل باید 5 کاراکتر داشته باشد'),
], posts.addPost);

module.exports = router;
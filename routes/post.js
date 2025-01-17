const express = require('express');
const { body } = require('express-validator');
const multer = require('../utility/multer');
const { Authorization } = require("../middlewares/authorization");

const router = express.Router();

const posts = require('../controllers/post');
router.get('/', posts.getListPosts);
router.get('/:postId', posts.getOnePost);
router.post('/',Authorization,multer.upload(multer.imageFileFilter).single('image'), [
    body(['title', 'content'])
    .isString().trim().withMessage('مقدار ورودی حتما باید یک رشته باشد')
    .isLength({min: 5}).withMessage('مقدار ورودی حداقل باید 5 کاراکتر داشته باشد'),
], posts.postAddPost);
router.put('/:postId',Authorization,multer.upload(multer.imageFileFilter).single('image'), [
    body(['title', 'content'])
    .isString().trim().withMessage('مقدار ورودی حتما باید یک رشته باشد')
    .isLength({min: 5}).withMessage('مقدار ورودی حداقل باید 5 کاراکتر داشته باشد'),
], posts.putEditPost);

module.exports = router;
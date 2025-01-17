const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const auth = require('../controllers/auth');
router.post('/register',[
    body(["name","password"]).isString().trim().isLength({min:4}),
    body("email").isString().trim().isEmail(),
],auth.postRegister);
router.post('/login',[
    body("email").isString().trim().isEmail(),
],auth.postLogin);


module.exports = router;
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const auth = require('../controllers/auth');
router.post('/register',[
    body(["name","password"]).isString().trim().isLength({min:4}),
    body("email").isString().trim().isEmail(),
],auth.postRegister);


module.exports = router;
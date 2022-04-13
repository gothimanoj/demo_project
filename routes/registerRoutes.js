const express = require('express');
const router = express.Router();
const register = require('../controller/registerController.js');
const middle = require('../middlewere/multer');
const userAuth = require('../middlewere/auth.js');
const sdk = require('../middlewere/aws.js');

router.post('/register',middle,sdk.aws,register.createUser);
router.post('/login',register.Login);
router.post('/forget_password',register.forgotPass);
router.post('/reset_password',userAuth,register.resetPass);
router.post('/uploadImg',middle,register.img);
router.post('/update_profile',userAuth,register.updateUser);
router.post('/delete_profile',userAuth,register.deleteUser);


module.exports=router
const express = require('express');
const multer = require('multer');
const router = express.Router();

const authController = require('../controllers/authCtrl');

//create multer storage 
const {uploadImg} = require('../middlewares/uploadAvatar');

router.post('/signup', uploadImg, authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/logout', authController.postLogout);

//for reset part
router.get('/reset-pass', authController.getResetPass);
router.post('/reset', authController.postResetPass);
router.get('/reset/:token', authController.getResetWithToken);
router.post('/reset/password', authController.postResetWithToken);

//email checking
router.post('/email-check', authController.emailCheck);

//send security code 
router.post('/send-code', authController.sendCode);

// code checking
router.post('/code-check', authController.codeCheck)

module.exports = router;

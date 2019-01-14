const express = require('express');
const multer = require('multer');
const router = express.Router();

const authController = require('../controllers/authCtrl');

//create multer storage 
const teacherStorage = multer.diskStorage({
    destination: function(req,file,cb){
        //we still in root folder
        cb(null, './public/teacherData')
    },

    filename: function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//create multer filter 
const teacherFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'  ){
        cb(null, true)
    } else {
        cb(null,false)
        const err = new Error('Not right file type')
        throw err
    }
}

const uploadImg = multer({storage: teacherStorage, fileFilter: teacherFilter}).single('avatar');

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

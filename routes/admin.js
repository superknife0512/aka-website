const express = require('express');
const router = express.Router();
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForAdmin} =require('../middlewares/protectRole');
const multer = require('multer');

const {uploadImg} = require('../middlewares/uploadAvatar');

const imagesStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/eventImages');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
        console.log('File type is not right');
    }
}

const uploadFiles = multer({storage: imagesStorage, fileFilter: fileFilter}).array('eventImgs', 5);

const adminController = require('../controllers/adminCtrl');

router.get('/', protectAuth, protectForAdmin, adminController.getAdminBoard);
router.get('/course', protectAuth, protectForAdmin, adminController.getCreateCourse);
router.post('/course', protectAuth, protectForAdmin, adminController.postCreateCourse);
router.get('/event', protectAuth, protectForAdmin, adminController.getCreateEvent);
router.post('/event', protectAuth, protectForAdmin, uploadFiles, adminController.postCreateEvent);

router.get('/teachers-info', protectAuth, protectForAdmin, adminController.getTeachersInfo);
router.post('/teacher-info/edit', protectAuth, protectForAdmin, uploadImg, adminController.postTeacherEdit);
router.get('/teacher-info/edit/:teacherId',protectAuth, protectForAdmin, adminController.getTeacherEdit );

module.exports = router;
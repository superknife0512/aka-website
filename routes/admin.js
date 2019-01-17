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

const incomingEvent = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/incomingEvent');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const courseImgStore = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/courseImgs');
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
const IncEventUpload = multer({storage: incomingEvent, fileFilter: fileFilter}).single('eventImg');
const uploadCourseImg = multer({storage: courseImgStore, fileFilter: fileFilter}).single('courseImg');

const adminController = require('../controllers/adminCtrl');

router.get('/', protectAuth, protectForAdmin, adminController.getAdminBoard);

router.post('/delete', protectAuth, protectForAdmin, adminController.postDeleteTeacher);

// create-delete course
router.get('/course', protectAuth, protectForAdmin, adminController.getCreateCourse);
router.post('/course', protectAuth, protectForAdmin, uploadCourseImg, adminController.postCreateCourse);
router.post('/course/delete', protectAuth, protectForAdmin, uploadCourseImg, adminController.postDeleteCourse);

// edit and interact width testimonials
router.post('/course/add-testimonial', protectAuth, protectForAdmin, adminController.postAddTesti);
router.post('/course/delete-testimonial', protectAuth, protectForAdmin, adminController.postDeleteTesti);

// edit course
router.get('/course/edit', protectAuth, protectForAdmin, adminController.getEditCourse);
router.post('/course/edit', protectAuth, protectForAdmin, uploadCourseImg, adminController.postEditCourse);

// create-edit-delete event
router.get('/event', protectAuth, protectForAdmin, adminController.getCreateEvent);
router.get('/event/edit', protectAuth, protectForAdmin, adminController.getEditEvent);
router.post('/event/edit', protectAuth, protectForAdmin, uploadFiles, adminController.postEditEvent);
router.post('/event', protectAuth, protectForAdmin, uploadFiles, adminController.postCreateEvent);
router.post('/event/delete', protectAuth, protectForAdmin, adminController.postDeleteEvent);

//incoming event
router.post('/event/add-event', protectAuth, protectForAdmin, IncEventUpload, adminController.postIncomingEvent);
router.post('/event/over', protectAuth, protectForAdmin, adminController.postEventOver);

//interact with teacher info
router.get('/teachers-info', protectAuth, protectForAdmin, adminController.getTeachersInfo);
router.post('/teacher-info/edit', protectAuth, protectForAdmin, uploadImg, adminController.postTeacherEdit);
router.get('/teacher-info/edit/:teacherId',protectAuth, protectForAdmin, adminController.getTeacherEdit );

module.exports = router;
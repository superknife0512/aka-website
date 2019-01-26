const express = require('express');
const router = express.Router();
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForAdmin} =require('../middlewares/protectRole');
const multer = require('multer');
const MulterAzureStorage = require('multer-azure-storage');

const {uploadImg} = require('../middlewares/uploadAvatar');

const maxSize = 5*1000*1000;

//save file on azure storage
const azureStorage =  new MulterAzureStorage({
    azureStorageConnectionString: 'DefaultEndpointsProtocol=https;AccountName=superknife0512;AccountKey=kkTaurz/1zg9MLITL5o3rdCAd+0g3bXG/QWpwXf8KiGAL/X9eVa0KSexW9hiOWf/VWkbrgAI7/woAQeRgGwrug==;EndpointSuffix=core.windows.net',
    containerName: 'event-photos',
    containerSecurity: 'blob',
    
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
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadFiles = multer({storage: azureStorage, fileFilter: fileFilter, limits: {fileSize: maxSize}}).array('eventImgs', 5);
const IncEventUpload = multer({storage: azureStorage, fileFilter: fileFilter}).single('eventImg');
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

router.post('/search',protectAuth, protectForAdmin, adminController.getSearchPage );

module.exports = router;
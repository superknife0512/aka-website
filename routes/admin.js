const express = require('express');
const router = express.Router();
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForAdmin} =require('../middlewares/protectRole');
const multer = require('multer');
const MulterAzureStorage = require('multer-azure-storage');

const {uploadImg} = require('../middlewares/uploadAvatar');

const maxSize = 3*1000*1000;

//save file on azure storage
const eventStorage =  new MulterAzureStorage({
    azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: 'event-photos',
    containerSecurity: 'blob',    
})

const courseImgStore = new MulterAzureStorage({
    azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: 'course-photo',
    containerSecurity: 'blob',  
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadFiles = multer({storage: eventStorage, fileFilter: fileFilter, limits: {fileSize: maxSize}}).array('eventImgs', 5);
const IncEventUpload = multer({storage: eventStorage, fileFilter: fileFilter}).single('eventImg');
const uploadCourseImg = multer({storage: courseImgStore, fileFilter: fileFilter}).single('courseImg');
const uploadOnCourseImg = multer({storage: courseImgStore, fileFilter: fileFilter}).single('onCourseImg');

const adminController = require('../controllers/adminCtrl');

router.get('/', protectAuth, protectForAdmin, adminController.getAdminBoard);

router.post('/delete', protectAuth, protectForAdmin, adminController.postDeleteTeacher);

// create-delete course
router.get('/course', protectAuth, protectForAdmin, adminController.getCreateCourse);
router.post('/course', protectAuth, protectForAdmin, uploadCourseImg, adminController.postCreateCourse);
router.post('/course/delete', protectAuth, protectForAdmin, adminController.postDeleteCourse);

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

//interact with Online course 
router.get('/online-course',protectAuth, protectForAdmin, adminController.getCreateOnlineCourse );
router.post('/online-course',protectAuth, protectForAdmin, uploadOnCourseImg, adminController.postCreateOnlineCourse );
router.get('/online-course/edit',protectAuth, protectForAdmin, adminController.getEditOnlineCourse );
router.post('/online-course/edit',protectAuth, protectForAdmin, uploadOnCourseImg, adminController.postEditOnlineCourse );
router.post('/online-course/delete',protectAuth, protectForAdmin, adminController.postDeleteOnlineCourse );

// interact with addvideo function
router.post('/online-course/addVideo', protectAuth, protectForAdmin, adminController.postAddVideo );
router.get('/online-course/allVideo', protectAuth, protectForAdmin, adminController.getAllVideo );
router.delete('/online-course/video', protectAuth, protectForAdmin, adminController.deleteVideo );

module.exports = router;
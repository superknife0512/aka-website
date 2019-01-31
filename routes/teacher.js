const express = require('express');
const router = express.Router();
const multer = require('multer');

const teacherController = require('../controllers/teacherCtrl');
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForTeacher} =require('../middlewares/protectRole');

const postImgStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/posts')
    },
    filename: function(req,file,cb){
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

const uploadPost = multer({fileFilter: fileFilter, storage: postImgStorage}).array('postImgs', 4);

router.get('/', protectAuth, protectForTeacher, teacherController.getTeacherProfile);

// teacher schedule 
router.get('/schedule', protectAuth, protectForTeacher, teacherController.getTeacherSchedule);
router.post('/schedule', protectAuth, protectForTeacher, teacherController.postTeacherSchedule);
router.get('/schedule/edit', protectAuth, protectForTeacher, teacherController.getScheduleEdit);
router.post('/schedule/edit', protectAuth, protectForTeacher, teacherController.postScheduleEdit);

//teacher albums
router.get('/album', protectAuth, protectForTeacher, teacherController.getCreateAlbum);
router.post('/album', protectAuth, protectForTeacher, teacherController.postCreateAlbum);
router.post('/album/delete', protectAuth, protectForTeacher, teacherController.postAlbumDelete);
router.get('/album/edit', protectAuth, protectForTeacher, teacherController.getAlbumEdit);
router.post('/album/edit', protectAuth, protectForTeacher, teacherController.postAlbumEdit);

//add to mini album
router.post('/album/add', protectAuth, protectForTeacher, uploadPost, teacherController.postAlbumAdd);
router.post('/album/post-delete', protectAuth, protectForTeacher, teacherController.postPostDelete);



module.exports = router;

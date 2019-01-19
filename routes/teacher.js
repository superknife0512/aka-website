const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherCtrl');
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForTeacher} =require('../middlewares/protectRole');

router.get('/', protectAuth, protectForTeacher, teacherController.getTeacherProfile);

// teacher schedule 
router.get('/schedule', protectAuth, protectForTeacher, teacherController.getTeacherSchedule);
router.post('/schedule', protectAuth, protectForTeacher, teacherController.postTeacherSchedule);
router.get('/schedule/edit', protectAuth, protectForTeacher, teacherController.getScheduleEdit);
router.post('/schedule/edit', protectAuth, protectForTeacher, teacherController.postScheduleEdit);

//teacher albums
router.post('/album', protectAuth, protectForTeacher, teacherController.getAlbum);


module.exports = router;

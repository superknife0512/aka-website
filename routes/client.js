const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientCtrl');

/* GET home page. */
router.get('/', clientController.getHomePage);
router.get('/course-page', clientController.getCoursesPage);
router.get('/course-page/*.:courseId', clientController.getCourseDetail);
router.get('/teacher-page', clientController.getTeachersPage);
router.get('/teacher-page/*.:teacherId', clientController.getTeacherDetail);

module.exports = router;

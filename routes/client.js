const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientCtrl');

/* GET home page. */
router.get('/', clientController.getHomePage);
router.get('/course-page', clientController.getCoursesPage);
router.get('/course-page/*.:courseId', clientController.getCourseDetail);
// router.get('/teachers-page', clientController.getTeachersPage);
// router.get('/teachers-page/*.:teacherId', clientController.getTeacherDetail);

module.exports = router;

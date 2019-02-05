const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientCtrl');

/* GET home page. */
router.get('/', clientController.getHomePage);

router.get('/course-page', clientController.getCoursesPage);
router.get('/course-page/*.:courseId', clientController.getCourseDetail);

router.get('/teacher-page', clientController.getTeachersPage);
router.get('/teacher-page/*.:teacherId', clientController.getTeacherDetail);

router.get('/album/:albumId', clientController.getAlbumPage);

router.get('/event-page', clientController.getEventPage);
router.get('/event-page/*.:eventId', clientController.getEventDetail);

router.get('/about', clientController.getAboutPage);

router.get('/contact', clientController.getContactPage);
router.post('/contact', clientController.postContact);

router.post('/search', clientController.postSearch)

module.exports = router;

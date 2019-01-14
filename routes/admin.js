const express = require('express');
const router = express.Router();
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForAdmin} =require('../middlewares/protectRole');

const adminController = require('../controllers/adminCtrl');

router.get('/', protectAuth, protectForAdmin, adminController.getAdminBoard);
router.get('/course', protectAuth, protectForAdmin, adminController.getCreateCourse);
router.post('/course', protectAuth, protectForAdmin, adminController.postCreateCourse);
// router.get('/event', protectAuth, protectForAdmin, adminController.getCreateEvent);
// router.get('/teachers-info', protectAuth, protectForAdmin, adminController.getTeachersInfo);

module.exports = router;
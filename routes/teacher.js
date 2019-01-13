const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherCtrl');
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForTeacher} =require('../middlewares/protectRole');

router.get('/', protectAuth, protectForTeacher, teacherController.getTeacherProfile);

module.exports = router;

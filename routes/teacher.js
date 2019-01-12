const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherCtrl');

router.get('/', teacherController.getTeacherProfile);

module.exports = router;

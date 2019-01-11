const express = require('express');
const router = express.Router();

const authController = require('../controllers/authCtrl');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

module.exports = router;

const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminCtrl');

router.get('/', adminController.getAdminBoard);

module.exports = router;
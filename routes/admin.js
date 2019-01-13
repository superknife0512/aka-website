const express = require('express');
const router = express.Router();
const {protectAuth} =require('../middlewares/protectAuth');
const {protectForAdmin} =require('../middlewares/protectRole');

const adminController = require('../controllers/adminCtrl');

router.get('/', protectAuth, protectForAdmin, adminController.getAdminBoard);

module.exports = router;
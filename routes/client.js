const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientCtrl');

/* GET home page. */
router.get('/', clientController.getHomePage);

module.exports = router;

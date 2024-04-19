const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller.js');

// Menu item endpoints
router.post('/restaurant/addMenuItem', restaurantController.addMenuItem);

module.exports = router;


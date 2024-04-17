const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

// Restaurant endpoints
router.post('/createRestaurant', restaurantController.createRestaurant);
router.post('/searchRestaurant', restaurantController.searchRestaurant);

// Menu item endpoints
router.post('/addMenuItem', restaurantController.addMenuItem);
router.delete('/deleteMenuItem', restaurantController.deleteMenuItem);
router.put('/updateMenuItem', restaurantController.updateMenuItem);

module.exports = router;

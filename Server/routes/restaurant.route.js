const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant.controller.js');

router.post('/getRestaurantByEmail', restaurantController.getRestaurantByEmail);
router.post('/restaurant', restaurantController.createRestaurant);
// router.post('/restaurant/addMenuItem', restaurantController.addMenuItem);
router.get('/orders/:restaurantId', restaurantController.getOrdersByRestaurantId)
module.exports = router;


const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/login.controller.js');
const { getUserByEmail } = require('../controllers/user.controller.js');
const { createOrder, trackOrder, cancelOrder} = require('../controllers/order.controller.js');
const { searchRestaurant, createRestaurant } = require('../controllers/restaurant.controller.js');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js");
const { addMenuItem } = require('../controllers/restaurant.controller.js'); // Import addMenuItem method
router.post('/addMenuItem', addMenuItem); // Add route to create menu items

router.post('/login', login);
router.post('/signup', signup);
router.post('/getUserByEmail', getUserByEmail);
router.post('/createOrder', createOrder);
router.post('/searchRestaurant', searchRestaurant);
router.post('/createRestaurant', createRestaurant);

router.get('/', getProducts);
router.get('/:name', getProduct); //Update route to accept name instead of ID
router.post('/', createProduct);
router.put("/:name", updateProduct); // Update route to accept name instead of ID
router.delete("/:name", deleteProduct); // Update route to accept name instead of ID


// New endpoints for tracking, canceling, and creating new orders
router.get('/trackOrder/:userId', trackOrder);
router.delete('/cancelOrder/:userId', cancelOrder);


module.exports = router;
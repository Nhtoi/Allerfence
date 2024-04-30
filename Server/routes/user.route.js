const express = require('express')
const router = express.Router()

const { login, signup } = require('../controllers/login.controller.js')
const { getUserByEmail, updateAllergies, addAddress, displayAllergies, getAllergyIngredientMapping } = require('../controllers/user.controller.js')
const { getRestaurantByEmail } = require('../controllers/restaurant.controller.js')//RESTAURANT
const { createOrder, trackOrder, cancelOrder} = require('../controllers/order.controller.js')
const { searchRestaurant} = require('../controllers/restaurant.controller.js')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js")


const{ createRestaurant } = require('../controllers/restaurant.controller.js')
const { addMenuItem } = require('../controllers/restaurant.controller.js') 

router.post('/getRestaurantByEmail', getRestaurantByEmail) //RESTAURANT
router.post('/addMenuItem', addMenuItem)
router.post('/createRestaurant', createRestaurant)
router.post('/getAllergyIngredientMapping', getAllergyIngredientMapping)
router.post('/login', login)
router.post('/signup', signup)
router.post('/getUserByEmail', getUserByEmail)
router.post('/createOrder', createOrder)
router.post('/searchRestaurant', searchRestaurant)
router.post('/updateAllergies', updateAllergies)
router.post('/addAddress', addAddress)
router.get('/displayAllergies', displayAllergies)
router.get('/', getProducts)
router.get('/:name', getProduct) //Update route to accept name instead of ID
router.post('/', createProduct)
router.put("/:name", updateProduct) // Update route to accept name instead of ID
router.delete("/:name", deleteProduct) // Update route to accept name instead of ID


// New endpoints for tracking, canceling, and creating new orders
router.get('/trackOrder/:userId', trackOrder)
router.delete('/cancelOrder/:userId', cancelOrder)


module.exports = router
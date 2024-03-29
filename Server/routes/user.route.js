const express = require('express')
const router = express.Router()
const {login, signup} = require('../controllers/login.controller.js')
const { getUserByEmail } = require('../controllers/user.controller.js')
const { createOrder } = require('../controllers/order.controller.js')
const { searchRestaurant, createRestaurant } = require('../controllers/restaurant.controller.js')


router.post('/login', login)
router.post('/signup', signup); 
router.post('/getUserByEmail', getUserByEmail)
router.post('/createOrder', createOrder)
router.post('/searchRestaurant', searchRestaurant)
router.post('/createRestaurant', createRestaurant)

module.exports = router
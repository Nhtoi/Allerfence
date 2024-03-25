const express = require('express')
const router = express.Router()
const {login, signup} = require('../controllers/login.controller.js')
const { getUserByEmail } = require('../controllers/user.controller.js')


router.post('/login', login)
router.post('/signup', signup); 
router.post('/getUserByEmail', getUserByEmail)
module.exports = router
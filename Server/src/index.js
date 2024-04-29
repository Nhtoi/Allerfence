const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Allergy = require('../models/allergies.model') // Import the Allergies schema
const fs = require('fs')
const { parse } = require('csv-parse')
const app = express()
const restaurantRoute = require('../routes/restaurant.route.js')
const userRoute = require('../routes/user.route.js')
const bodyParser = require("body-parser")

// Middleware
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Log requests middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`)
    next()
})
app.use('/', userRoute)
app.use('/', restaurantRoute)
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to the database and start the server
mongoose.connect('mongodb+srv://admin:xCDV9stvlD6jrgQy@allerfence-users.wmfafph.mongodb.net/Allerfence-users?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to Database - users')
        app.listen(3000, () => {
            console.log('Server started on Port 3000')
        })
    })
    .catch((error) => {
        console.log('Connection Failed', error)
    })

module.exports = app

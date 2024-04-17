const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('../routes/user.route.js');
const Restaurant = require('../models/restaurant.model.js'); // Import the Restaurant model
const restaurantRoute = require('../routes/restaurant.route');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use('/restaurant', restaurantRoute);
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));

// Routes
app.use('/', userRoute);

// Connect to the database and start the server
mongoose.connect('mongodb+srv://admin:xCDV9stvlD6jrgQy@allerfence-users.wmfafph.mongodb.net/Allerfence-users?retryWrites=true&w=majority')
 .then(() => {
    console.log("Connected to Database - users");
    app.listen(3000, () => {
        console.log("Server started on Port 3000");
        // createTestRestaurant(); // Call the function to create the test restaurant
    });
 })
 .catch((error) => {
    console.log("Connection Failed", error);
});

//Function to create a test restaurant


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('../routes/user.route.js');
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRoute);

// Log requests middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// Connect to the database and start the server
mongoose.connect('mongodb+srv://admin:xCDV9stvlD6jrgQy@allerfence-users.wmfafph.mongodb.net/Allerfence-users?retryWrites=true&w=majority')
 .then(() => {
    console.log("Connected to Database - users");
    app.listen(3000, () => {
        console.log("Server started on Port 3000");
    });
 })
 .catch((error) => {
    console.log("Connection Failed", error);
});


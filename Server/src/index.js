const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const userRoute = require('../routes/user.route.js')
const app = express()

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));

//routes
app.use('/', userRoute)

//connet to db and port 3000
mongoose.connect('mongodb+srv://admin:xCDV9stvlD6jrgQy@allerfence-users.wmfafph.mongodb.net/Allerfence-users?retryWrites=true&w=majority')
 .then(()=>{
    console.log("Connected to Data Base - users")
    app.listen(3000, ()=>{
        console.log("Started on Port 3000")
    })
 })
.catch(()=>{
    console.log("Connection Failed")
})


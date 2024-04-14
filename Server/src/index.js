const { Socket } = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoute = require('../routes/user.route.js');
const app = express()
const { Server } = require("socket.io");

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
    .then(() => {
        console.log("Connected to Data Base - users")
        app.listen(3000, () => {
            console.log("Started on Port 3000")
        })
    })
    .catch(() => {
        console.log("Connection Failed")
    })
//SOCKET.IOOOOOOOOO
// Import the 'http' module to create a server
const http = require("http");
// Import the 'cors' middleware to enable cross-origin resource sharing
app.use(cors());

// Create a server using the 'http' module and pass the 'app' instance
const server = http.createServer(app);

// Import the 'Server' class from the 'socket.io' library
const io = new Server(server, {
    // Configure CORS settings for the socket.io server
    cors: {
        // Allow requests from the specified origin
        origin: "http://localhost:3002",
        // Allow only specified methods (GET and POST)
        methods: ["GET", "POST"],
    },
});

// Event listener for when a client connects to the socket.io server
io.on("connection", (socket) => {
    // Log a message when a user connects, including their socket ID
    console.log(`User Connected: ${socket.id}`);

    // Event listener for when a user joins a room
    socket.on("join_room", (data) => {
        // Join the specified room
        socket.join(data);
        // Log a message indicating which user joined which room
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    // Event listener for when a user sends a message
    socket.on("send_message", (data) => {
        // Log the message data received from the user
        console.log(data);
        // Send the received message to all clients in the same room except the sender
        socket.to(data.room).emit("receive_message", data);
    });

    // Event listener for when a user disconnects
    socket.on("disconnect", () => {
        // Log a message when a user disconnects, including their socket ID
        console.log("User Disconnected", socket.id);
    });
});

// Start the server and listen on port 3001
server.listen(3001, () => {
    // Log a message when the server starts running
    console.log("SERVER RUNNING");
});

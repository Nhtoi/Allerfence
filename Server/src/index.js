const { Socket } = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoute = require('../routes/user.route.js');
const app = express()
const { Server } = require("socket.io");
const chatRoutes = require('../routes/chat.route.js');
const Message = require('../models/message.model.js');
const testOrdersModel = require('../models/testOrders.model.js');
const orderModel = require('../models/orders.model.js')


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
//app.use('/', userRoute)
app.use('/api/chat', chatRoutes);


app.get('/activeOrders',async(req,res)=>{
try{
const orders = await orderModel.find()
return res.status(201).json(orders)
}catch(err){
    return res.status(500).json({ err });

}

})
app.get('/activeOrders/:id',async(req,res)=>{
    try{
    const orders = await orderModel.findById(req.params.id)

    return res.status(201).json(orders)
    }catch(err){
        return res.status(500).json({ err });
    
    }
    
    })

    app.put('/activeOrders/:id',async(req,res)=>{
        try{
        const ordersUpdated = await ordersModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
        return res.status(201).json(ordersUpdated)
        }catch(err){
            return res.status(500).json({ err });
        
        }
        
        })
    
        app.put('/activeOrders/:id/accept', async (req, res) => {
            try {
                const orderId = req.params.id;
                const acceptedOrder = await orderModel.findByIdAndUpdate(orderId, { orderStatus: 'accepted' }, { new: true });
                if (!acceptedOrder) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                return res.status(200).json(acceptedOrder);
            } catch (error) {
                console.error("Error accepting order:", error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });


app.post('/postOrders', async(req, res) => {
    try{
        const newOrder = await orderModel.create(req.body)
        return res.status(201).json(newOrder);

    }catch(err){
        return res.status(500).json({ err });
    }
   
});









//connet to db and port 3000
mongoose.connect('mongodb+srv://admin:xCDV9stvlD6jrgQy@allerfence-users.wmfafph.mongodb.net/Allerfence-users?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to Data Base - users")
        app.listen(8080, () => {
            console.log("Started on Port 3000")
        })
    })
    .catch(() => {
        console.log("Connection Failed")
    })
//SOCKET.IOOOOOOOOO
// Import the 'http' module to create a server
const http = require("http");
const Order = require('../models/orders.model.js');
// Import the 'cors' middleware to enable cross-origin resource sharing
app.use(cors());

// Create a server using the 'http' module and pass the 'app' instance
const server = http.createServer(app);

// Import the 'Server' class from the 'socket.io' library
const io = new Server(server, {
    // Configure CORS settings for the socket.io server
    cors: {
        // Allow requests from the specified origin
        origin: "*",
        // Allow only specified methods (GET and POST)
        methods: ["GET", "POST",],
    },
});

// Event listener for when a client connects to the socket.io server
io.on("connection", (socket) => {
    // Log a message when a user connects, including their socket ID
    console.log(`User Connected: ${socket.id}`);
   
    socket.on("fetch_all_messages", async (room) => {
        try {
            // Fetch all messages for the specified room from MongoDB
            const messages = await Message.find({ room }).exec();
    
            // Emit the fetched messages back to the client
            socket.emit("all_messages", messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    });
    
    // Event listener for when a user joins a room
    socket.on("join_room", async (data) => {
        try {
            socket.join(data);
            const messages = await Message.find({ room: data }).exec();
            socket.emit('fetched_messages', messages);
            for await (const doc of messages) {
                console.log(doc);
              }
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    });


    socket.on("send_message", async (data) => {
        // Log the message data received from the user
         socket.to(data.room).emit("receive_message", data);
        console.log(data);
        // Save the message to the database
        try {
          const message = new Message(data);
          await message.save();
          // Send the received message to all clients in the same room except the sender
         
        } catch (error) {
          console.error("Error saving message:", error);
        }
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

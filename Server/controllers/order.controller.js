const Orders = require('../models/orders.model');

const createOrder = async (req, res) => {
    try{
    console.log(req.body);
    const data = {
        orderId: req.body.orderId,
        userId: req.body.userId,
        status: req.body.status,
        items:{
            name: req.body.name,
            quantity: req.body.quantity
        },  
        price: req.body.price,
        type: req.body.type,
        restaurant: {
            
        }
        
    };

    // const restaurant = await Restaurants.findById(data.restaurant);
    // if (!restaurant) {
    //     return res.status(404).json({ message: 'Restaurant not found' });
    // }
    const order = new Orders(data)
    await order.save()
        return res.status(201).json(order)    
            } catch (error) {
    console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal server error' });
}
}
module.exports = { createOrder };

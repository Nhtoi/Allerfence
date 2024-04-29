const Orders = require('../models/orders.model');

const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const data = {
            customerName: req.body.name,
            orderId: req.body.orderId,
            userId: req.body.userId,
            restaurantId: req.body.restaurantId,
            customerAddress: req.body.customerAddress,
            restaurantAddress: req.body.restaurantAddress,
            status: req.body.status,
            items: req.body.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            specialInstructions: req.body.specialInstructions,
            total: req.body.total,
            type: req.body.type,
            restaurant: {} // You can add restaurant data here if needed
        };

        // const restaurant = await Restaurants.findById(data.restaurant);
        // if (!restaurant) {
        //     return res.status(404).json({ message: 'Restaurant not found' });
        // }

        const order = new Orders(data);
        await order.save();
        
        return res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const trackOrder = async (req, res) => {
    try {
        const userId = req.params.userId; // Retrieve userId from request parameters
        const orders = await Orders.find({ userId: userId}); // Find orders by userId
        if (!orders || orders.length === 0) {
            // If no orders are found for the user, return a 404 status and alert the user
            return res.status(404).json({ message: "You don't have any active orders to track" });
        }
        // If orders are found, return the order details
        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error tracking order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const cancelOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orderId = req.params.orderId;
        
        const order = await Orders.findOneAndDelete({ userId: userId});
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { createOrder, trackOrder, cancelOrder };

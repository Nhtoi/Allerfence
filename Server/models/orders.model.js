const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        // orderId: {
        //     type: String, 
        //     required: true,
        //     unique: true 
        // },
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId, 
        //     required: true
        // },
        status: {
            type: String, 
            required: true,
            default: 'pending' 
        },
        items: [{
            name: { type: String, required: true }, 
            quantity: { type: Number, required: true }, 
            
        }],
        price: {
            type: Number, 
            required: true
        },
        type: {
            type: String, //'delivery', 'pickup'
            required: true
        },
        //Here for when restaurant schema is created
        // restaurant: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Restaurant',
        //     required: true
        // }
    },
    {
        timestamps: true
    }
    
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

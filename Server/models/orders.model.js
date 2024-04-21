const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true
        },
        status: {
            type: String, 
            required: false,
            default: 'pending' 
        },
        items: [{
            name: { type: String, required: true }, 
            quantity: { type: Number, required: true }, 
            price: { type: Number, required: true }, 
            
        }],
        total: {
            type: Number,
            required: false

        },
        type: {
            type: String, //'delivery', 'pickup'
            required: false
        },

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

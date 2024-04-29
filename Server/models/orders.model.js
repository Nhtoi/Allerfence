const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    customerName:{
        type: String,
        required: true,
        default: 'Unkwown'
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['delivery', 'pickup'],
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    customerAddress: {
        type: String,
        required: true,
        default: 'Unknown'
    },
    restaurantAddress: {
        type: String,
        required: true,
        default: 'Unknown'
    },
    specialInstructions: {
        type: String,
        required: true,
        default: 'None'
    }

}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order

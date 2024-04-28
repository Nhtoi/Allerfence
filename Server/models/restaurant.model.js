const mongoose = require('mongoose');
// Defining rest schema
const RestaurantSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: false
    },
    name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false 
    },
    cuisine: {
        type: String,
        required: false
    },
    restHours: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    menu: [{
        itemName: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        ingredients: [{
            type: String,
            required: false
        }],
        allergens: [{
            type: String,

        }]
    }], 
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    menu: [{
        itemName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        ingredients: [{
            type: String,
            required: true
        }],
        allergens: [{
            type: String,
            required: true
        }]
    }],
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);

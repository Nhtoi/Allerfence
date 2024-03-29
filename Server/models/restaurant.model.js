const mongoose = require('mongoose')

const RestaurantSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
            unique: false 
        },
        address: {
            type: String,
            required: false
        },
        cuisine: {
            type: String,
            required: false
        },
        menuHours: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Restaurant', RestaurantSchema);

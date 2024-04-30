const mongoose = require('mongoose')


const CustomerSchema = mongoose.Schema(
    {
        name: {
            firstName: {
                type: String,
                required: [true, "First name is required"]
            },
            lastName: {
                type: String,
                required: [true, "Last name is required"]
            }
        },
        address:{
            type: String,
            required: false,
            default: 'Unknown'
        },
        phoneNum: {
            type: String,
            required: [true, "Phone number is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        userType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserType",
            required: true
        },
        Allergies: {
            type: [String],
            required: false,
            default: []
        },
        Restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;

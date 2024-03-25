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
        }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;

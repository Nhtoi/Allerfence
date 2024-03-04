
const mongoose = require('mongoose');

const userTypeSchema = mongoose.Schema(
    {
      userType:{
        type: String,
        enum: ['Customer', 'Driver', 'Vendor'],
        required: [true, "Must Pick User-Type"]
      }
    },
    {
        timestamps: true
    }
);

const UserType = mongoose.model('UserType', userTypeSchema);

module.exports = UserType;

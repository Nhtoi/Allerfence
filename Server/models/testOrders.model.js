const mongoose = require('mongoose');

const TestorderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  restaurantLocation: {
    type: String,
    required: true
  },
  clientLocation: {
    type: String,
    required: true
  },
  menuItems: {
    type: [
      {
        itemName: String,
        quantity: Number,
        price: Number
      }
    ],
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'completed'],
    default: 'processing'
  }
});

const TestOrder = mongoose.model('TestOrder', TestorderSchema);

module.exports = TestOrder;

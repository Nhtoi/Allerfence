const mongoose = require('mongoose');

// Define a schema for messages
const messageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

// Create a model for messages
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
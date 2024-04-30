const Message = require('../models/message.model');

// Controller function to handle sending a message
const sendMessage = async (req, res) => {
  const { room, author, message, time } = req.body;

  try {
    // Create a new message document
    const newMessage = new Message({
      room,
      author,
      message,
      time
    });

    // Save the message to the database
    await newMessage.save();

    // Send the new message as a response
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};

// Controller function to get messages for a specific room
const getMessagesForRoom = async (req, res) => {
  const { room } = req.params;

  try {
    // Find all messages for the specified room
    const messages = await Message.find({ room });

    // Send the messages as a response
    res.status(200).json({ data: messages });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Failed to get messages', error: error.message });
  }
};

module.exports = { sendMessage, getMessagesForRoom };
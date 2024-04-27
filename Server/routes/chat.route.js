const express = require('express');
const router = express.Router();
const { sendMessage, getMessagesForRoom } = require('../controllers/messages.controller.js');

// Define routes
// Route to fetch messages for a room
router.get('/:room', async (req, res) => {
    try {
      const messages = await Message.find({ room: req.params.room }).sort({ createdAt: 1 });
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
router.post('/send-message', sendMessage);
router.get('/messages/:room', getMessagesForRoom);

module.exports = router;

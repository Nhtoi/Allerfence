import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatRoom({ socket, username, room }) {
  // State variables to manage current message and message list
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
  // Function to send a message
  const sendMessage = async () => {
    // Check if the current message is not empty
    if (currentMessage !== "") {
      // Construct message data
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:formattedTime,
      };

      // Emit the message data to the server
      await socket.emit("send_message", messageData);
      
      // Update the local message list with the new message
      setMessageList((list) => [...list, messageData]);
      
      // Reset the current message input field
      setCurrentMessage("");
    }
  };
  // Effect hook to fetch all messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Emit an event to request all messages for the current room
        await socket.emit("fetch_all_messages", room);

        // Listen for the response containing all messages
        socket.on("all_messages", (messages) => {
          // Update the message list with the received messages
          setMessageList(messages);
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Call the fetchMessages function when the component mounts
    fetchMessages();

    // Clean up function to remove the event listener when the component unmounts
    return () => {
      socket.off("all_messages");
    };
  }, [socket, room]);


  // Effect hook to handle incoming messages
  useEffect(() => {
    // Register event listener on the socket
    socket.on("receive_message", (data) => {
      // Update message list with the received message
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // Render chat interface
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {/* Container that automatically scrolls to bottom */}
        <ScrollToBottom className="message-container">
          {/* Map over message list and render each message */}
          {messageList.map((messageContent,index) => {
            return (
              <div 
                className="message"
                id={username === messageContent.author ? "you" : "other"}
                key={index+messageContent.time} // Add a unique key for each message
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        {/* Input field for typing messages */}
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            // Send message when Enter key is pressed
            event.key === "Enter" && sendMessage();
          }}
        />
        {/* Button to send message */}
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatRoom;

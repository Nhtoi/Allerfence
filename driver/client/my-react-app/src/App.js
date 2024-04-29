// Importing CSS file for styling
import "./App.css";
// Importing socket.io-client library for socket connection
import io from "socket.io-client";
// Importing useState hook from React for managing state
import { useState } from "react";
// Importing Chat component from Chat.js file
import Chat from "./Chat";

// Connecting to the server using socket.io-client
const socket = io.connect("http://localhost:3001");

// Main App component
function App() {
  // State variables for username, room, and whether to show the chat window
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // Function to join a room
  const joinRoom = () => {
    // Check if username and room are not empty
    if (username !== "" && room !== "") {
      // Emit a "join_room" event to the server with the room ID
      socket.emit("join_room", room);
      // Set showChat to true to display the chat window
      setShowChat(true);
    }
  };

  // Render the component
  return (
    <div className="App">
      {/* Conditional rendering based on whether to show the chat window */}
      {!showChat ? (
        // If showChat is false, display the join chat form
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          {/* Input field for entering username */}
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          {/* Input field for entering room ID */}
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          {/* Button to join the room */}
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        // If showChat is true, display the Chat component
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

// Export the App component
export default App;

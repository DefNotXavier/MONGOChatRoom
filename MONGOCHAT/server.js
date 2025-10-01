// Express framework
const express = require("express");

// Mongoose to interact with MongoDB
const mongoose = require("mongoose");

// Node.js HTTP to create a server
const http = require("http");

// Import the Socket.IO server
const { Server } = require("socket.io");

// Load environment variables from a .env file
require("dotenv").config();

// Create an instance of Express and a corresponding HTTP server
const app = express();
const server = http.createServer(app);

// Create a new Socket.IO server instance with CORS settings
const client = new Server(server, {
  cors: {
    // For development, allow all origins. For class project okay, not for production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Serve static files  from the public directory
app.use(express.static("public"));

// Function to connect to MongoDB using the URI from environment variables
async function connectToMongo() {
  try {
    console.log("Connecting to MongoDB...");
    // Connect using connection driver string
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    // Log connection error if error
    console.error("MongoDB connection failed:", err);
  }
}

// Variable to track the number of active users connected via Socket.IO
let activeUsers = 0;

// Event listener for new WebSocket connections
client.on("connection", function (socket) {
  // If new connection, +1 to active users
  activeUsers++;
  // Notify all clients of updated active user count
  client.emit("activeUsers", activeUsers);

  // Reference to the "chats" collection in MongoDB. Inside
  let chat = mongoose.connection.collection("chats");

  // Helper function to send status messages to the connected client
  const sendStatus = function (s) {
    // Emit 'status' event to this specific client
    socket.emit("status", s);
  };

  // Fetch and send the latest 100 chat messages to the newly connected client
  chat
    .find()
    .limit(100)
    // Sort messages in ascending order (oldest first)
    .sort({ _id: 1 })
    .toArray(function (err, res) {
      if (err) throw err;
      // Send chat history to client
      socket.emit("output", res);
    });

  // Handle incoming chat messages
  socket.on("input", function (data) {
    let name = data.name;
    let message = data.message;

    // Validate input
    if (name == "" || message == "") {
      sendStatus("Please enter a name and message");
    } else {
      // Save message to the database and broadcast it to all clients
      chat.insertOne({ name: name, message: message }, function () {
        client.emit("output", [data]); // Broadcast the message
        // this was for testing, but basically let you know if the message sent
        // Optionally send confirmation status (commented out)
        // sendStatus({ message: "Message sent!!", clear: true });
      });
    }
  });

  // Handle request to clear all messages
  socket.on("clear", function () {
    chat.deleteMany({}, function () {
      // Notify client that messages were cleared
      socket.emit("cleared");
    });
  });

  // Handle disconnection of a client
  socket.on("disconnect", function () {
    // Decrement active user count
    activeUsers--;
    // Notify all clients of new count
    client.emit("activeUsers", activeUsers);
  });
});

// Start the HTTP and WebSocket server after connecting to MongoDB
connectToMongo().then(() => {
  server.listen(5000, "0.0.0.0", () => {
    // I see this in terminal and I know its running
    console.log("Server listening on port 5000");
  });
});

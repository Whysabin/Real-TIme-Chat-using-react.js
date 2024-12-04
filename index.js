const express = require("express");
const app = express();
const http = require("http");

const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // React app's origin
        methods: ["GET", "POST"], // Allowed methods
    },
});

// Handle socket connections
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`); // Corrected to use backticks

    // Event listener for joining a room
    socket.on("join_room", (data) => {
        socket.join(data); // `data` is the room name
        console.log(`User with ID: ${socket.id} joined room: ${data}`); // Corrected
    });
    socket.on("send_message", (data) => {
     socket.to(data.room).emit("receive_message", data);
    });
    
    // Event listener for disconnect
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});

// Start the server
server.listen(3001, () => {
    console.log("SERVER RUNNING on port 3001");
});

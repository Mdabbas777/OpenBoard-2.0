const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

let server = app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});

let io = socket(server);

io.on("connection", (socket) => {
    socket.on("beginPath", (data) => {
        // transfer data to all connected computers
        io.sockets.emit("beginPath",data);
    });
    socket.on("drawStroke", (data) => {
        // transfer data to all connected computers
        io.sockets.emit("drawStroke", data);
    });
});
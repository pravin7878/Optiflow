const socketio = require("socket.io");

function setupSocket(server) {
    const io = socketio(server);
    io.on("connection", (socket) => {
        // Join user-specific room
        socket.on("join", (userId) => {
            socket.join(userId);
        });
    });
    return io;
}

module.exports = setupSocket;
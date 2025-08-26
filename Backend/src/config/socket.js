// const socketio = require("socket.io");

// function setupSocket(server) {
//     const io = socketio(server);
//     io.on("connection", (socket) => {
//         // Join user-specific room
//         socket.on("join", (userId) => {
//             socket.join(userId);
//         });
//     });
//     return io;
// }

// module.exports = setupSocket;


module.exports = function(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

socket.on("join", (userId) => {
  socket.join(userId);
  console.log("User joined room:", userId);
});

    // You can add more event listeners here
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};


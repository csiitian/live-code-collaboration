const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on('connection', (socket) => {
    let socketRoom;
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('join', (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socketRoom = room;
      socket.join(room);
    });
    
    socket.on('code', (data) => {
      socket.broadcast.emit('send-code', data);
    });
    
    socket.on('reconnect', (room) => {
      console.log('user reconnected');
      socket.join(socketRoom);
    });
  });
};

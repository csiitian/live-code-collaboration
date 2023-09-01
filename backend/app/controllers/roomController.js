const Room = require('../models/Room');

const validateRoom = (roomBody) => {
  const { isPrivate, password } = roomBody;
  if (isPrivate && (!password || password.length === 0)) {
    return false;
  }
  return true;
};

module.exports = {
  create: async (req, res) => {
    try {
      if (!validateRoom(req.body)) {
        return res.status(400).send('Password field cannot be null for private room.');
      }
  
      const room = new Room(req.body);
  
      // Check if RoomId already exists
      const roomId = room.room;
      const existingRoom = await Room.findOne({ room: roomId }).exec();
      if (existingRoom) {
        return res.status(400).send('RoomId already present. Please use a different RoomId.');
      }
  
      const savedRoom = await room.save();
      res.status(201).json(savedRoom);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  join: async (req, res) => {
    try {
      if (!validateRoom(req.body)) {
        return res.status(400).send('Password field cannot be null for private room.');
      }
  
      const { room, password } = req.body;
  
      // Check if the room exists
      const existingRoom = await Room.findOne({ room }).exec();
      if (!existingRoom) {
        return res.status(404).send('RoomId not found.');
      }
  
      // Check if the provided password is correct for a private room
      if (existingRoom.isPrivate && existingRoom.password !== password) {
        return res.status(401).send('Incorrect password to join the room.');
      }
  
      res.status(200).json(existingRoom);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};

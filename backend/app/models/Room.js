const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  password: String,
  isPrivate: {
    type: Boolean,
    default: false,
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

const mongoose = require('mongoose');
const Account = require("./AccountModel");
const Room = require("./RoomModel");
const messageSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true 
    }, 
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', 
        required: true 
    }, 
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true }, 
  }, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
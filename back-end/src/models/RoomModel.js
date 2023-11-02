const mongoose = require('mongoose');
const Account = require("./AccountModel");
const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    }, {
    timestamps: true
})

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
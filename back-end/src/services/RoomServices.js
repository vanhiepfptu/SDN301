const Message = require("../models/MessageModel");
const Room = require("../models/RoomModel");
const createRoom = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const room = await Room.findOne({
                name: username
            })
            if(room)
                resolve({
                    status: 'OK',
                    message: 'Find Room successfully',
                    data: room._id
                })

            const createRoom = await Room.create({
                name: username
            })
            resolve({
                status: 'OK',
                message: 'Room created successfully',
                data: createRoom._id
            })
        } catch (err) {
            reject(err)
        }
    })
}

const getRoomsSortedByLatestMessage = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const rooms = await Room.find({}).lean();

            const roomsWithLatestMessages = await Promise.all(rooms.map(async (room) => {
                const latestMessage = await Message.findOne({ room: room._id })
                    .sort({ createdAt: -1 })
                    .populate('sender', 'username')
                    .lean();

                if (latestMessage) {
                    return {
                        ...room,
                        latestMessage,
                    };
                }
                return room;
            }));
            const filteredRoom = roomsWithLatestMessages.filter(room => room.latestMessage);
            const sortedRooms = filteredRoom.sort((a, b) => b.latestMessage.createdAt - a.latestMessage.createdAt);
            resolve({
                status: 'OK',
                message: 'Room created successfully',
                data: sortedRooms
            });
        } catch (error) {
            reject(error);
        }
    })

};
module.exports = { createRoom, getRoomsSortedByLatestMessage };
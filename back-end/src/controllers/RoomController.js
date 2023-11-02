const RoomServices = require('../services/RoomServices');

const createRoom = async (data, socket, callback) => {
    try {
        const response = await RoomServices.createRoom(data);
        socket.join(response.data.toString());
        callback(response.data);
    } catch (error) {
        console.log(error);
        return;
    }
}

const getRoomsSortedByLatestMessage = async (callback) => {
    try {
        const response = await RoomServices.getRoomsSortedByLatestMessage();
        callback(response.data);
    } catch (error) {
        console.log(error);
        return;
    }
}
module.exports = {createRoom, getRoomsSortedByLatestMessage};
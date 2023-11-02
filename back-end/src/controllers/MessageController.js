const { SOCKET } = require("../const");
const MessageService = require('../services/MessageService');
const createMessage = async (data, io, socket) => {
    try {
        data = { ...data, sender: socket.user.id }
        const response = await MessageService.createMessage(data);
        io.to(data.roomId).emit(SOCKET.chatMessage, {sender: data.username, content: data.message, timestamp: response.data.createdAt});
    } catch (error) {
        console.log(error);
        return;
    }
}
const getMessageHistory = async (data, callback) => {
    try {
        const response = await MessageService.getMessageHistory(data);
        callback(response.data);
    } catch (error) {
        console.log(error);
        return;
    }
}
module.exports = { createMessage, getMessageHistory };
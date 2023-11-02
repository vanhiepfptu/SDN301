const Message = require("../models/MessageModel");
const Account = require("../models/AccountModel");
const createMessage = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {roomId, sender, message} = data;
            const createMessage = await Message.create({
                text: message,
                sender: sender,
                room: roomId
            })
            resolve({
                status: 'OK',
                message: 'Message create successfully',
                data: createMessage
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getMessageHistory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const messages = await Message.find({
                room: data
            }).populate({
                path: 'sender',
                select: 'username' 
            });
            
            const formattedMessages = messages.map((message) => ({
                content: message.text,
                timestamp: message.createdAt,
                sender: message.sender.username
            }));

            resolve({
                status: 'OK',
                message: 'get messages successfully',
                data: formattedMessages
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {createMessage, getMessageHistory};
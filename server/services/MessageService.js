// Importing Models
const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

const { getReceiverSocketId, io } = require('../socket/socket')
const messages = async (userToChatId, senderId) => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return [];

    return conversation.messages;
  } catch (error) {
    console.log("Error in messages: ", error.message);
    throw error;
  }
};

const messageSent = async (message, receiverId, senderId) => {
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    
    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    
    // SOCKET IO FUNCTIONALITY
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return newMessage;
  } catch (error) {
    console.log("Error in messageSent: ", error.message);
    throw error;
  }
};

module.exports = { messages, messageSent };

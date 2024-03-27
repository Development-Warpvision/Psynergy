import { Request, Response } from "express";
// const express = require("express")
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
import { User } from "../models/user_model";
const { chatWidgetModel } = require("../models/chatWidgetModel");
import { io } from "../config/socket.config";
import { AccessContorlModel as AccessControlModel } from "../models/access_control_model";

async function findOrCreateChat(email: any, question: any, name: any) {
  // Find or create a chat associated with the user
  let chat = await chatWidgetModel.findOne({ userEmail: email });

  if (!chat) {
    // If no chat exists, create a new chat
    chat = new chatWidgetModel({
      userEmail: email,
      name: name,
      chat: [], // Start with an empty chat array
    });
  }

  return chat;
}

async function assignAgentToChat(chat: any) {
  if (!chat.agentId) {
    let assignedAgentId = "";
    const freeAgent = await AccessControlModel.findOne({
      ticketAssigned: false,
    });

    if (freeAgent) {
      assignedAgentId = freeAgent._id;
    } else {
      const agents = await AccessControlModel.find();
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      assignedAgentId = randomAgent._id;
    }

    chat.agentId = assignedAgentId;
    await chat.save();
    console.log("agnentId:", chat.agentId);
    console.log("assingAgent:", assignedAgentId);
  }
}
async function saveChatMessage(chat: any, messageDetails: any) {
  const { userMsg, agentReply, name, email } = messageDetails;

  const chatMessage = {
    userMsg,
    agentReply,
    name,
    email,
    time: new Date(),
  };

  chat.chat.push(chatMessage);
  await chat.save();
}

exports.recivechatWidgetMsg = async (req: Request, res: Response) => {
  try {
    const { email, question, name } = req.body;

    // Middleware can handle user existence and chatKey expiry checks

    // Find or create a chat conversation
    let chat = await findOrCreateChat(email, question, name);

    // Assign an agent to the chat
    await assignAgentToChat(chat);

    // Save the chat message

    await saveChatMessage(chat, {
      userMsg: question,
      name,
      userEmail: email,
    });

    // Emit event to assigned agent
    io.emit("sendAgentNotification", req.body);

    res.status(200).json({ msg: "Message sent to agent" });
  } catch (error: any) {
    console.error("Error in receiving chat message:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.sendChatWidgetMsgToClient = async (req: Request, res: Response) => {
  try {
    const { chatid, replyMsg } = req.body;
    // console.log(chatid)
    // const Chat = await chatWidgetModel.findById(chatid);
    const Chat = await chatWidgetModel.findOne({ _id: chatid });

    // const Chat = await chatWidgetModel.findById({chatid})
    // console.log(Chat)
    if (!Chat) {
      return res.json({ msg: "no such chat with user" });
    }

    // obj of chat array which contains time and msg itself
    const chatobj = {
      agentReply: replyMsg,
      time: Date.now(),
    };
    Chat.chat.push(chatobj);
    await Chat.save();
    io.emit(`sendAgentReplyNotification${Chat.userEmail}`, req.body);
    console.log(`sendAgentReplyNotification${Chat.userEmail}`);
    // io.to(chatid).emit('sendAgentReplyNotification', replyMsg)//send event to chatid
    res.status(200).json("message sent");
  } catch (error: any) {
    return res.json({ error: error.message });
  }
};
exports.getAllChatExports = async (req: Request, res: Response) => {
  try {
    // Retrieve all chat exports from the database
    const allChats = await chatWidgetModel.find();

    // Check if there are no chats
    if (allChats.length === 0) {
      return res.json({ msg: "No chat exports available" });
    }

    // Return the list of chat exports
    res.status(200).json(allChats);
  } catch (error: any) {
    return res.json({ error: error.message });
  }
};

exports.verifyUrl = async (req: Request, res: Response) => {
  const { userApiKey } = req.query;
  console.log(userApiKey);
  try {
    const user = await User.findOne({ chatKey: userApiKey });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        user: undefined,
      });
    }
    if (userApiKey === user.chatKey) {
      return res.send("Authorized User For ChatWidget");
    } else {
      return res.status(200).json("unAuthorized key");
    }
  } catch (e: any) {
    return res.json({ error: e.message });
  }
};

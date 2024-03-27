import { Request, Response, NextFunction } from "express";
import { IMessageRequest, IUserRequest } from "../inteface";
const asyncHandler = require("express-async-handler");
var fs = require("fs");
var path = require("path");

const Chat = require("../../models/live_chat_model");
const Message = require("../../models/liveChatmessageModel");

// Create New Chat
const newChat = asyncHandler(async (req: IUserRequest, res: Response) => {
  const chatExists = await Chat.findOne({
    users: {
      $all: [req.user.email, req.body.receiverId],
    },
  });

  if (chatExists) {
    return res.status(201).json({
      success: true,
      newChat: chatExists,
    });
  }

  const newChat = await Chat.create({
    users: [req.user.email, req.body.receiverId],
  });

  res.status(200).json({
    success: true,
    newChat,
  });
});
const getRecentChats = asyncHandler(async (req: IUserRequest, res: Response) => {
  try {
    const chats = await Chat.find({
      users: {
        $all: [req.user.email, req.params.email],
      },
    })
      .sort({ updatedAt: -1 }) 
      .populate("latestMessage")
      .limit(10);

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve chats",
    });
  }
});

// Get All Chats
const getChats = asyncHandler(async (req: IUserRequest, res: Response) => {
  try {
    const chats = await Chat.find({
      users: {
        $all: [req.user.email, req.params.email],
      },
    })
      .sort({ updatedAt: -1 })
      .populate("latestMessage"); //users

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      chats: [],
    });
  }
});

const newMessage = asyncHandler(async (req: IMessageRequest, res: Response) => {
  try {
    const { chatId, content } = req.body;
    let img;
    if (req.file) {
      img = {
        data: fs.readFileSync(
          path.join(__dirname, "../" + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      };
    }
    const msgData = {
      sender: req.user._id,
      chatId,
      content,
      // img,
    };

    const newMessage = await Message.create(msgData);

    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

    res.status(200).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      chats: [],
    });
  }
});

// Get All Messages
const getMessages = asyncHandler(
  async (req: IMessageRequest, res: Response) => {
    try {
      const messages = await Message.find({
        chatId: req.params.chatId,
      });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        chats: [],
      });
    }
  }
);

export { newChat, getChats, newMessage, getMessages ,getRecentChats};

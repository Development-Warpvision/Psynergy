import { Request, Response, NextFunction } from "express";
import { IMessageRequest, IUserRequest } from "./inteface";
import { io } from "../config/socket.config";
const asyncHandler = require("express-async-handler");
const Message = require("../models/liveChatmessageModel");
import { User } from "../models/user_model";
import { AccessContorlModel as AcessUser } from "../models/access_control_model";
import { Messages as getMessage } from "../models/message_model";
import axios from "axios";
import { Conversations } from "../models/conversations_model";
import { Types } from "mongoose";
// Create New Chat
//get Message By medium
const getMEssageByMedium = async (req: Request, res: Response) => {
  const { medium } = req.query;
  const getMsg = await getMessage.find({ recievingMedium: medium });
  if (!getMsg) {
    return res.status(400).json("no message are there");
  }
  res.status(200).json(getMsg);
};
const newConversation = async (
  userId: any,
  recievingMedium: string,
  cmpId: string,
  userSpecificId: string,
  messageId?: Types.ObjectId,
) => {
  const chatExists = await Conversations.findOne({
    users: {
      $in: [userId],
    },
    recievingMedium,
    cmpId,
    userSpecificId,
  });

  if (chatExists) {
    return chatExists._id;
  }

  const newChat = await Conversations.create({
    users: [userId],
    recievingMedium,
    message: [messageId],
    cmpId,
    userSpecificId,
  });

  return newChat._id;
};

// Get All Chats
const getConversation = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const skip: number = req.query.skip ? Number(req.query.skip) : 0;

    const chats = await Conversations.find({
      users: {
        $in: [req.user._id, req.body.userId],
      },
      cmpId: req.user.cmpId,
    })
      .sort({ updatedAt: -1 })
      .populate({
        path: "message",
        populate: { path: "media contact" },
        select: `_parentid recievingMedium _msgid media contact cmpId isRead messages senderId reciverId`, // Specify the path to the media field
      })
      .skip(skip)
      .limit(10);
    console.log("Chats:", chats);

    res.status(200).json({
      success: true,
      chats,
    });
  },
);

const newMessage = asyncHandler(async (req: IMessageRequest, res: Response) => {
  const { chatId, content } = req.body;
  const msgData = {
    sender: req.user._id,
    chatId,
    content,
  };

  const newMessage = await Message.create(msgData);

  await Conversations.findByIdAndUpdate(chatId, { latestMessage: newMessage });

  res.status(200).json({
    success: true,
    newMessage,
  });
});

// Get All Messages
const getMessages = asyncHandler(
  async (req: IMessageRequest, res: Response) => {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  },
);

const conversationRead = asyncHandler(
  async (req: IMessageRequest, res: Response) => {
    const { chatId } = req.body;

    await Conversations.findByIdAndUpdate(chatId, { isRead: true });

    res.status(200).json({
      success: true,
      message: "Message Read Done",
    });
  },
);

const getRecentConversation = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const chats = await Conversations.find({
      users: {
        $in: [req.user._id, req.body.userId],
      },
      cmpId: req.user.cmpId,
    })
      .sort({ updatedAt: -1 })
      .populate("message users")
      .limit(6);
    //console.log(chats.users);

    res.status(200).json({
      success: true,
      chats,
    });
  },
);

const pinChat = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { chatid } = req.body;
  console.log(req.body);
  // const errors: Result<ValidationError> = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  if (chatid === null || chatid === undefined) {
    return res.status(401).json({ errors: [{ message: "ChatId not Exist" }] });
  }
  let user: any = await User.findById(req.user._id);
  console.log(user);
  if (user === null) {
    user = await AcessUser.findById(req.params.id);
  }

  if (!user) {
    return res.status(401).json({ errors: [{ message: "User not Exist" }] });
  }

  if (user.pinChat.length > 5) {
    return res
      .status(401)
      .json({ errors: [{ message: "Limit Exceed not Exist" }] });
  }

  // for (const key in label) {
  const isContains = user.pinChat.includes(chatid);
  if (isContains) {
    const msgIndex: number = user.pinChat.indexOf(chatid);
    //console.log(msgIndex);

    user.pinChat.splice(msgIndex, 1);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Chat Unpinned",
    });
  }

  await user.pinChat.push(chatid);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Chat Pinned",
  });
});
const conversationReadUnread = asyncHandler(
  async (req: IMessageRequest, res: Response) => {
    const { chatId } = req.body;

    // Find the conversation by chatId
    const conversation = await Conversations.findById(chatId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Mark all unread messages in the conversation as read
    await Message.updateMany(
      {
        chatId: conversation._id,
        sender: { $ne: req.user._id }, // Only update messages sent by other users
        isRead: false, // Only update unread messages
      },
      { $set: { isRead: true } },
    );

    // Update the conversation's isRead status if needed
    conversation.isRead = true;
    await conversation.save();

    res.status(200).json({
      success: true,
      message: "Unread messages marked as read",
    });
  },
);
const getMessageByCat = asyncHandler(
  async (req: IMessageRequest, res: Response) => {
    const { chatId } = req.params;
    const { label, channel, read } = req.query;

    const filters: any = {};

    // Add filters based on query parameters
    if (label) {
      filters.labels = label;
    }

    if (channel) {
      filters.channel = channel;
    }

    if (read !== undefined) {
      filters.isRead = read === "true"; // Convert 'true' string to boolean
    }

    // Find messages that match the filters
    const messages = await Message.find({
      chatId,
      ...filters,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  },
);
const searchMessages = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid search query",
    });
  }

  // Use a regular expression to perform a case-insensitive search
  const regex = new RegExp(query, "i");

  try {
    const matchingMessages = await Message.find({
      content: regex, // Replace 'content' with the actual field to search
    });

    res.status(200).json({
      success: true,
      messages: matchingMessages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

const agentActivities = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, fromDate, toDate } = req.query;

    const filters: any = { userId };

    // Use type assertions to convert fromDate and toDate to Date objects
    const fromDateParsed = fromDate ? new Date(fromDate as string) : null;
    const toDateParsed = toDate ? new Date(toDate as string) : null;

    if (fromDateParsed && toDateParsed) {
      filters.timestamp = {
        $gte: fromDateParsed,
        $lte: toDateParsed,
      };
    }

    const activities = await AcessUser.find(filters)
      .sort({ timestamp: -1 })
      .populate("userId");

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
const newConvoChat = async (
  userId: any,
  recievingMedium: string,
  cmpId: string,
  userSpecificId: string,
) => {
  const chatExists = await Conversations.findOne({
    users: {
      $in: [userId],
    },
    recievingMedium,
    cmpId,
    userSpecificId,
  });

  if (chatExists) {
    return chatExists._id;
  }

  const newChat = await Conversations.create({
    users: [userId],
    recievingMedium,
    cmpId,
    userSpecificId,
  });

  // Emit a Socket.IO event to notify clients about the new chat
  io.emit("newChat", newChat);

  return newChat._id;
};
const getUserLiveLoc = asyncHandler(async (req: Request, res: Response) => {
  try {
    const ipAddress = req.ip; // Get the user's IP address from the request
    console.log(ipAddress);
    // Make an HTTP GET request to ip-api.com to retrieve location information
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);

    // Extract relevant location data from the response
    const { city, regionName, country, lat, lon } = response.data;

    const locationInfo = {
      city,
      regionName,
      country,
      coordinates: { lat, lon },
    };

    res.status(200).json(locationInfo);
  } catch (error: any) {
    console.error("Error getting user location:", error.message);
    res.status(500).json({ error: error.message });
  }
});
export {
  newConversation,
  getConversation,
  newMessage,
  getMessages,
  getRecentConversation,
  conversationRead,
  pinChat,
  conversationReadUnread,
  getMessageByCat,
  searchMessages,
  agentActivities,
  newConvoChat,
  getUserLiveLoc,
  getMEssageByMedium,
};

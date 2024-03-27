import { Request, Response } from "express";
import { IUserRequest } from "./inteface";
const asyncHandler = require("express-async-handler");
const MessageSchema = require("../models/message_model");

const getAllChats = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { recievingMedium, parentId } = req.body;
  // const user = await User.findById(req.user._id);

  let chats = await MessageSchema.find({
    recievingMedium,
    cmpId: {
      $in: req.user.cmpId,
    },
  });
  if (parentId !== undefined) {
    //console.log(parentId);

    if (recievingMedium === "instagram" || recievingMedium === "facebook") {
      chats = chats.filter((e: any) => e._parentid === parentId);
    }
  }
  res.status(200).json({
    success: true,
    chats,
  });
});

export { getAllChats };

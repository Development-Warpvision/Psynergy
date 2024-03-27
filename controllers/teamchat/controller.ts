import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
import { io } from "../../config/socket.config";
import { AccessContorlModel } from "../../models/access_control_model";
import { TeamConvertions } from "../../models/teamConvertionModel";
import {
  TeamMessageDocument,
  TeamMessages,
} from "../../models/teamMessageModel";
import { User } from "../../models/user_model";

// find message content
// selcted chat message

function getConvertionId(from: string, to: string): string {
  // Assuming from and to are user IDs
  return [from, to].sort().join("_");
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await AccessContorlModel.find();

    const usersDetails = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        loginStatus: user.loginStatus,
        cmpID: user.cmpId,
      };
    });

    res.status(200).json(usersDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
// create new message  check company id agent
const newMessage = async (req: Request, res: Response) => {
  // role base get the data from user
  try {
    const { cmpID, from, to, message } = req.body;

    const [userFromResult, staffFromResult] = await Promise.all([
      User.findOne({ $and: [{ _id: from }, { cmpId: cmpID }] }).exec(),
      AccessContorlModel.findOne({
        $and: [{ _id: from }, { cmpId: cmpID }],
      }).exec(),
    ]);

    const [userToResult, staffToResult] = await Promise.all([
      User.findOne({ $and: [{ _id: to }, { cmpId: cmpID }] }).exec(),
      AccessContorlModel.findOne({
        $and: [{ _id: to }, { cmpId: cmpID }],
      }).exec(),
    ]);

    // Create a new message
    const convertionId = getConvertionId(from, to);
    if (
      (userFromResult || staffFromResult) &&
      (userToResult || staffToResult)
    ) {
      const newMessage = new TeamMessages({
        cmpID,
        from,
        to,
        message,
        convertionId,
      });

      const savedMessage = await newMessage.save();

      await updateContributorsForNewMessage(newMessage);

      res.status(201).json({
        savedMessage,
      });
    } else {
      res.status(404).json({ message: "user not found!" });
    }
  } catch (error) {
    console.error("Error creating new message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//grupe the messages using convertion id
async function updateContributorsForNewMessage(messages: any) {
  try {
    const { cmpID, from, to, _id, convertionId } = messages;

    const [userFromResult, staffFromResult] = await Promise.all([
      User.findOne({ $and: [{ _id: from }, { cmpId: cmpID }] }).exec(),
      AccessContorlModel.findOne({
        $and: [{ _id: from }, { cmpId: cmpID }],
      }).exec(),
    ]);

    const [userToResult, staffToResult] = await Promise.all([
      User.findOne({ $and: [{ _id: to }, { cmpId: cmpID }] }).exec(),
      AccessContorlModel.findOne({
        $and: [{ _id: to }, { cmpId: cmpID }],
      }).exec(),
    ]);

    // Find or create TeamConvertion based on from and to

    // Check if TeamConvertion already exists for the given convertionId
    const existingConvertion = await TeamConvertions.findOne({ convertionId });

    if (!existingConvertion) {
      // Create a new TeamConvertion if it doesn't exist
      const newTeamConvertion = new TeamConvertions({
        convertionId,
        cmpID: cmpID, // You need to provide the cmpID value
        messages: [_id], // You may need to handle messages appropriately
        contributors: {
          accesscontroluser: (staffFromResult ? [from] : []).concat(
            staffToResult ? [to] : [],
          ),
          user: (userFromResult ? [from] : []).concat(userToResult ? [to] : []),
        },
      });

      const savedNewTeamConvertions = await newTeamConvertion.save();
      // Populate the necessary properties
      const populatedNewTeamConvertions = await TeamConvertions.populate(
        savedNewTeamConvertions,
        {
          path: "contributors.accesscontroluser",
          select: "userId username email role loginStatus cmpID",
        },
      );

      await TeamConvertions.populate(populatedNewTeamConvertions, {
        path: "contributors.user",
        select: "userId username email role loginStatus cmpId",
      });

      io.emit(`newConverstiionsMessage`, populatedNewTeamConvertions);

      console.log(
        `New TeamConvertion created with convertionId: ${convertionId}`,
      );
    } else {
      // Update contributors in the existing TeamConvertion
      await TeamConvertions.findOneAndUpdate(
        { convertionId },
        {
          $addToSet: { messages: _id },
        },
        { new: true },
      );
      io.emit(`newTeamMessage`, messages);
      console.log(
        `Contributors updated for existing TeamConvertion with convertionId: ${convertionId}`,
      );
    }
  } catch (error) {
    console.error("Error updating contributors for TeamConvertion:");
    throw error; // You may choose to handle or log the error accordingly
  }
}

const getAllTeamChat = async (req: Request, res: Response) => {
  try {
    // Use the find method to retrieve all chat messages
    const { cmpID } = req.body;
    const teamChats = await TeamMessages.find({ cmpID: cmpID });

    res.status(200).json({ success: true, data: teamChats });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ success: false, error });
    26;
  }
};

const getAllTeamConversations = async (req: Request, res: Response) => {
  try {
    const allTeamConvertions = await TeamConvertions.find()
      .populate({
        path: "messages",
        model: "TeamMessages",
        populate: {
          path: "from to",
          model: "Access_contorl_Model",
          select: "_id username ", // name for usercontroller model
        }, // Replace with the actual model name for 'messages'
      })
      .populate({
        path: "contributors",
        model: "Access_contorl_Model", // Replace with the actual model name for 'contributors'
        select: "_id username",
      })
      .exec();

    // Send a success response with the populated data
    res.status(200).json({ success: true, data: allTeamConvertions });
  } catch (error) {
    console.error("Error getting team convertions:", error);

    // Send an error response
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getSelectedConversation = async (req: Request, res: Response) => {
  try {
    const convertionId = req.query.convertionId;

    if (!convertionId) {
      return res.status(400).json({
        success: false,
        message: "convertionId is required in the request body",
      });
    }

    const convertionData = await TeamConvertions.findOne({
      convertionId,
    }).populate("messages contributors");

    if (convertionData) {
      res.status(200).json(convertionData);
    } else {
      res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllMyConversions = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "convertionId is required in the request body",
      });
    }

    const myConversions = await TeamConvertions.find({
      $or: [
        { "contributors.accesscontroluser": { $in: [userId] } },
        { "contributors.user": { $in: [userId] } },
      ],
    })
      .populate({
        path: "contributors.accesscontroluser",
        select: "userId username email role loginStatus",
      })
      .populate({
        path: "contributors.user",
        select: "userId username email role loginStatus",
      });

    if (!myConversions || myConversions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No conversions found for the specified userId",
      });
    }

    return res.status(200).json(myConversions);
  } catch (error) {
    console.error("Error in getAllMyConvertion:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  getAllTeamChat,
  newMessage,
  getAllTeamConversations,
  getSelectedConversation,
  getAllUser,
  getAllMyConversions,
};

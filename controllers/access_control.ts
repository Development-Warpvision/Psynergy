import { Request, Response, NextFunction } from "express";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
import { ValidationError } from "express-validator/src/base";
import { createHash } from "node:crypto";
import { IUserRequest } from "./inteface";
const asyncHandler = require("express-async-handler");
const sendCookie = require("../utils/sendCookie");
import { AccessContorlModel } from "../models/access_control_model";
import { User } from "../models/user_model";

// create User
exports.IamsignupUser = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { email, username, password, role } = req.body;
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await AccessContorlModel.findOne({
      $or: [{ email }, { username }],
    });
    let loggedInUser: any = await User.findById(req.user._id);

    if (user) {
      if (user.username === username) {
        return res
          .status(401)
          .json({ errors: [{ message: "User already exist" }] });
      }
      return res
        .status(401)
        .json({ errors: [{ message: "Email already exist" }] });
    }

    const newUser = await AccessContorlModel.create({
      email,
      username,
      password,
      role,
      cmpId: req.user.cmpId,
      createdby: req.user._id,
    });

    await loggedInUser.staff.push(newUser._id);
    await loggedInUser.save();
    const parentUser: any = await User.findById(req.user._id)
      .populate("staff", "-password")
      .populate({
        path: "message",
      });

    res
      .status(200)
      .json({ success: true, message: "Staff Added", user: parentUser });
    // //console.log(req.user);
  },
);

// Login User
exports.IamloginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await AccessContorlModel.findOne({
      $or: [{ email: username }, { username: username }],
    })
      .populate({
        path: "createdby",
        select: "label staff",
        populate: {
          path: "staff",
          select: "-password",
        },
      })
      .select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ message: "User doesn't exist" }] });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ errors: [{ message: "Password doesn't match" }] });
    }

    // Set loginStatus to true
    user.loginStatus = true;

    // Save the updated user to the database
    await user.save();

    // Send the cookie and response
    sendCookie(user, 201, res);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errors: [{ message: "Internal Server Error" }] });
  }
});

// Logout User
exports.IamlogoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie(
      "token",
      null,
      process.env.NODE_ENV === "production"
        ? {
            expires: new Date(Date.now()),
            httpOnly: true,
            domain: ".convoportal.com",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (in milliseconds)
          }
        : {
            sameSite: "none", // Set to 'none' if you need cross-site access
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          },
    );

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  },
);

//get me
exports.IamgetAccountDetails = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const user = await AccessContorlModel.findById(req.user._id)
      .select("-password")
      .populate({
        path: "createdby",
        select: "label staff",
        populate: {
          path: "staff",
          select: "-password",
        },
      });
    if (!user) {
      return res.status(400).json({
        success: false,
        user: undefined,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  },
);

exports.IamdeleteProfile = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { email } = req.body;

    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await AccessContorlModel.findOneAndDelete({ email });
    if (user) {
      await user.remove();
    }
    const parentUser: any = await User.findById(req.user._id)
      .populate("staff", "-password")
      .populate({
        path: "message",
      });
    res.status(200).json({
      success: true,
      message: "User Deleted",
      user: parentUser,
    });
  },
);

//update paswd from admin panel only by admin
exports.IamupdatePassword = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { newPassword, email } = req.body;

    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await AccessContorlModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    if (user.passwordRequest === false) {
      return res
        .status(404)
        .json({ errors: [{ message: "Not Authrize to Access" }] });
    }
    user.password = newPassword;

    user.passwordRequest = false;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Changed",
    });
  },
);

exports.IamresetRequest = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { email } = req.body;

    const user = await AccessContorlModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }

    user.passwordRequest = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Request Done",
    });
  },
);
//get all users
exports.IamgetAllUsers = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const users = await AccessContorlModel.find();

    res.status(200).json({
      success: true,
      users,
    });
  },
);

//search users
exports.IamsearchUsers = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    if (req.query.keyword) {
      const users = await AccessContorlModel.find({
        $or: [
          {
            username: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      });

      res.status(200).json({
        success: true,
        users,
      });
    }
  },
);

exports.IamgetUserDetailsById = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const user = await AccessContorlModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  },
);
exports.onLineAgent = async (req: Request, res: Response) => {
  try {
    // Retrieve IDs and login statuses of all agents with loginStatus === true
    const onlineAgents = await AccessContorlModel.find({ loginStatus: true });

    return res.status(200).json({ agents: onlineAgents });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
exports.offLineAgent = async (req: Request, res: Response) => {
  try {
    const { agentId, loginStatus } = req.body;
    console.log("agentId", agentId);
    const agent = await AccessContorlModel.findById(agentId);

    if (!agent) {
      return res.status(404).json({ msg: "Agent not found" });
    }

    // Update the loginStatus of the agent
    agent.loginStatus = loginStatus;
    await agent.save();

    // Retrieve offline agents based on loginStatus
    const offlineAgents = await AccessContorlModel.find({ loginStatus: false });

    return res.status(200).json({ agents: offlineAgents });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

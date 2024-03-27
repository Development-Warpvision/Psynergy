import { createHash } from "node:crypto";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
import { io, getUser } from "../config/socket.config";
import { IUserRequest } from "./inteface";
const sendEmail = require("../utils/sendEmail");
const Conversation = require("../models/conversations_model");
import { User, UserDocument } from "../models/user_model";
import {
  AccessContorlModel,
  AccessControlDocument,
  AccessContorlModel as AcessUser,
} from "../models/access_control_model";
const userMessage = require("../models/message_model");
const asyncHandler = require("express-async-handler");
const sendCookie = require("../utils/sendCookie");

// Signup User
exports.signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password, cmpId } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
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
  // Function to generate a random key (e.g., a 10-character string)
  function generateRandomKey(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomKey = "";
    for (let i = 0; i < length; i++) {
      randomKey += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return randomKey;
  }

  // Generate a random key and store its expiration time (in milliseconds) for 10 days
  const randomKey = generateRandomKey(10);
  const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const newUser = await User.create({
    email,
    username,
    password,
    cmpId,
    chatKey: randomKey,
    chatKeyExpiry: expirationTime,
  });
  sendCookie(newUser, 201, res);
});

// Login User
exports.loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, otp } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({
    $or: [{ email: username }, { username: username }],
  })
    .select("+password")
    .populate("staff", "-password");

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

  const generateOtp = await user.getOtp();
  //console.log(generateOtp);

  await user.save();

  try {
    await sendEmail({
      email: user.email,
      id: "otp",
      data: {
        otp: generateOtp,
      },
    });

    await sendCookie(user, 201, res);

    // res.status(200).json({
    //   success: true,
    //   message: `Email sent to ${user.email}`,
    // });
  } catch (error) {
    user.otpToken = undefined;
    user.otpExpiry = undefined;

    await user.save({ validateBeforeSave: false });
  }
  res.status(200).send("Login First step done");
});

// Logout User
exports.logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      domain: ".convoportal.com",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (in milliseconds)
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  },
);

//get me
exports.getAccountDetails = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    console.log(req.user._id);

    const user = await User.findById(req.user._id)
      .populate({
        path: "message",
      })
      .populate("staff", "-password")
      .populate({
        path: "pinChat",
        populate: [
          {
            path: "message",
          },
          {
            path: "users",
          },
        ],
      })
      .select("-password");

    // //console.log(
    //   await User.find({
    //     assignto: mongoose.Types.ObjectId("63ee19dbd1f47704a2ac136b"),
    //   }) .populate("assignto")
    // );
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

exports.getStaff = asyncHandler(async (req: IUserRequest, res: Response) => {
  let user: UserDocument | AccessControlDocument | null = await User.findById(
    req.user._id,
  )
    .populate("staff", "-password")
    .select("-password -message pinChat");

  if (user === null) {
    user = await AcessUser.findById(req.params.id)
      .populate("staff", "-password")
      .select("-password -message pinChat");
  }
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
});
exports.isLogin = asyncHandler(async (req: IUserRequest, res: Response) => {
  const user = await User.findById(req.user._id).select("available online");
  const accessUser = await AccessContorlModel.findById(req.user._id).select(
    "available online",
  );

  if (!user && !accessUser) {
    return res.status(400).json({
      success: false,
      user: undefined,
    });
  }
  /// login user tnen online status
  res.status(200).json({
    success: true,
    online: user?.online || accessUser?.loginStatus,
    available: user?.available || accessUser?.loginStatus,
  });
});

//update paswd by own
exports.updatePassword = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        user: undefined,
      });
    }
    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ errors: [{ message: "Old password not match" }] });
    }

    user.password = newPassword;
    await user.save();
    sendCookie(user, 201, res);
  },
);

//forgot passwd by link
exports.forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!user) {
    return res.status(404).json({ errors: [{ message: "User not found" }] });
  }

  const resetPasswordToken = await user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `https://${req.get(
    "host",
  )}/password/reset/${resetPasswordToken}`;

  try {
    await sendEmail({
      email: user.email,
      id: "forgotPass",
      data: {
        name: user.username,
        reset_url: resetPasswordUrl,
      },
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ errors: [{ message: error }] });
  }
});

//reset passwd
exports.resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const resetPasswordToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({ errors: [{ message: "User not found" }] });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();
  sendCookie(user, 200, res);
});

exports.deleteProfile = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const message = await userMessage.deleteMany({ _id: req.user._id });
    const acessUser = await AcessUser.deleteMany({ _id: req.user._id });
    const conversation = await Conversation.deleteMany({ _id: req.user._id });
    const user = await User.findOneAndDelete(req.user._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        user: undefined,
      });
    }
    await user.remove();

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  },
);

exports.verifyOtp = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { otp, username } = req.body;

  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({
    $or: [{ email: username }, { username: username }],
  })
    .select("-password")
    .populate("staff", "-password");

  if (!user) {
    return res.status(400).json({
      success: false,
      user: undefined,
    });
  }
  const isOtpMatched = await user.compareOtp(otp);
  if (!isOtpMatched) {
    return res.status(401).json({ errors: [{ message: "Otp doesn't match" }] });
  }

  sendCookie(user, 201, res);
});

exports.taskAssign = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { msgId } = req.body;
  let tasktoAssign: any = await User.findById(req.params.id);
  let loggedInUser: any = await User.findById(req.user._id);

  if (tasktoAssign === null) {
    tasktoAssign = await AcessUser.findById(req.params.id);
  }

  if (loggedInUser === null) {
    loggedInUser = await AcessUser.findById(req.user._id);
  }

  if (!tasktoAssign) {
    return res.status(401).json({ errors: [{ message: "error" }] });
  }

  if (tasktoAssign.messageAssign.includes(msgId)) {
    const assigntoIndex: number = loggedInUser.assignto.indexOf(
      tasktoAssign._id,
    );
    const assignerIndex: number = tasktoAssign.assigner.indexOf(
      loggedInUser._id,
    );
    const conversation = await Conversation.findById(msgId);

    const msgIndex: number = tasktoAssign.messageAssign.indexOf(msgId);
    const convIndex: number = conversation.users.indexOf(tasktoAssign._id);

    tasktoAssign.assigner.splice(assignerIndex, 1);
    tasktoAssign.messageAssign.splice(msgIndex, 1);
    loggedInUser.assignto.splice(assigntoIndex, 1);

    conversation.users.splice(convIndex, 1);

    await conversation.save();
    await tasktoAssign.save();

    if (req.params.id === req.user._id.toString()) {
      return res.status(200).json({
        success: true,
        message: "Task unAssign",
      });
    }

    await loggedInUser.save();

    return res.status(200).json({
      success: true,
      message: "Task unAssign",
    });
  } else {
    await loggedInUser.assignto.push(tasktoAssign._id);
    await tasktoAssign.assigner.push(loggedInUser._id);

    await tasktoAssign.messageAssign.push(msgId);

    const conversation = await Conversation.findById(msgId);

    await conversation.users.push(tasktoAssign._id);

    await loggedInUser.save();
    await tasktoAssign.save();
    await conversation.save();
    res.status(200).json({
      success: true,
      message: "Task Assign",
    });
  }
});

exports.roleAssign = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { role_name } = req.body;

  let roletoAssign: any = await AcessUser.findById(req.params.id);
  if (roletoAssign === null) {
    //   roletoAssign = await User.findById(req.params.id);
    // } else {
    roletoAssign = await User.findById(req.user._id);
  }

  if (!roletoAssign) {
    return res.status(401).json({ errors: [{ message: "error" }] });
  }

  if (roletoAssign.role.includes(role_name)) {
    const removeIndex = roletoAssign.assignto.indexOf(role_name);
    roletoAssign.role.splice(removeIndex, 1);

    await roletoAssign.save();

    const user = await User.findOne({
      email: req.user.email,
    }).populate("staff", "-password");

    return res.status(200).json({
      success: true,
      message: "Role unAssign ",
      user: user,
    });
  } else {
    await roletoAssign.role.push(role_name);

    await roletoAssign.save();

    const user = await User.findOne({
      email: req.user.email,
    }).populate("staff", "-password");

    res.status(200).json({
      success: true,
      message: "Role Assign ",
      user: user,
    });
  }
});

exports.labelAdd = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { label } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findOne({
    email: req.user.email,
  });

  if (!user) {
    return res.status(401).json({ errors: [{ message: "User not Exist" }] });
  }
  // for (const key in label) {
  const containsLable = user.label.includes(label);
  if (containsLable) {
    return res
      .status(401)
      .json({ errors: [{ message: "Label Already Exist" }] });
  }
  await user.label.push(label);
  // }

  await user.save();

  res.status(200).json({
    success: true,
    label: user.label,
  });
});

exports.labelDelete = asyncHandler(async (req: IUserRequest, res: Response) => {
  const { label } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return res.status(401).json({ errors: [{ message: "Record Not Found" }] });
  }
  const containsLable = user.label.includes(label);
  if (!containsLable) {
    return res.status(401).json({ errors: [{ message: "Label Not Exist" }] });
  }
  const msgIndex: number = user.label.indexOf(label);
  //console.log(msgIndex);

  user.label.splice(msgIndex, 1);
  await user.save();
  res.status(200).json({
    success: true,
    label: user.label,
  });
});

exports.labelAssigntoConverstaion = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { label, id } = req.body;
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const conv = await Conversation.findByIdAndUpdate(id, { labels: label });

    // //console.log(conv);

    // for (const i in conv.users) {
    //console.log(conv.userSpecificId);

    const user = getUser(conv.userSpecificId);
    //   const add = getUser(conv.users[i]);
    //   //console.log(conv.users[i]);
    //   //console.log(add);

    io.to(user?.socketId).emit("labelsocket", label);
    // }

    conv.save();
    res.status(200).json({
      success: true,
      // label: co,
    });
  },
);
//setting user
exports.updateUser = async (req: Request, res: Response) => {
  try {
    let update = req.body;
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        user: undefined,
      });
    }
    await user.save();
    return res.status(200).json({ success: true, UpdatedUser: user });
  } catch (error) {
    return res.json(error);
  }
};

exports.deleteUser = async (req: Request, res: Response) => {
  try {
    const { userid } = req.body;

    let user = await User.findByIdAndDelete(userid);

    res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully " });
  } catch (error) {
    return res.json(error);
  }
};
//setting for email notification enable disable

//  enable email notifications
exports.enableNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.emailNotificationsEnabled = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email notifications enabled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//disable email notifications
exports.disableNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.emailNotificationsEnabled = false;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email notifications disabled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//users who are online
exports.activeUsersCount = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    const onlineCount = users.filter(
      (user: any) => user.online === true,
    ).length;
    return res.json({ msg: `active users this time are ${onlineCount}` });
  } catch (error) {
    return res.json(error);
  }
};

//fetch customer location
exports.customerLocation = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        // Send latitude and longitude to the server

        // return res.json({ msg:`customer location data is : Latitude: ${latitude}, Longitude: ${longitude}`})
      });
    } else {
      console.log("Geolocation is not available.");
    }
  } catch (error) {
    return res.json(error);
  }
};

import express from "express";
const router = express();
import { User } from "../models/user_model";
import { AccessContorlModel as AccessControlModel } from "../models/access_control_model";
import {
  newChat,
  getChats,
  newMessage,
  getMessages,
} from "../controllers/livechat/live_chat_controller";
import grantList from "../models/grant_list";
const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");

router.route("/newChat").post(
  isAuthenticated(User),
  // hasPermissionRole([grantList.liveCreate.role, grantList.admin.role], User),
  newChat,
);

router.route("/chats/:email").get(
  isAuthenticated(User),
  // hasPermissionRole([grantList.liveRead.role], User),
  getChats,
);

router.route("/newMessage").post(
  isAuthenticated(User),
  // hasPermissionRole([grantList.liveCreate.role, grantList.admin.role], User),
  newMessage,
);
router.route("/messages/:chatId").get(
  isAuthenticated(User),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  getMessages,
);

module.exports = router;

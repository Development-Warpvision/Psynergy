import {
  getConversation,
  conversationRead,
  getRecentConversation,
  pinChat,
  conversationReadUnread,
  getMessageByCat,
  searchMessages,
  agentActivities,
  newConvoChat,
  getUserLiveLoc,
  getMEssageByMedium,
} from "../controllers/conversations_controller";
const express = require("express");
import { User } from "../models/user_model";
import { AccessContorlModel as AceessModel } from "../models/access_control_model";
const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");
const router = express();

router.route("/conversation").post(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  getConversation,
);
router.route("/conversation/read").post(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  conversationReadUnread,
);

router.route("/read").put(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  conversationRead,
);

router.route("/conversation/recent").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  getRecentConversation,
);
router.route("/messages/:chatId").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  getMessageByCat,
);
router.route("/messages/search").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  searchMessages,
);
router.route("/agentActivities").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  agentActivities,
);
router.route("/newMessage").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  newConvoChat,
);
router.route("/liveLocation").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  getUserLiveLoc,
);
router.route("/conversation/pin").put(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  pinChat,
);
router.route("/getMessage").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.liveRead.role, grantList.admin.role], User),
  // pinChat
  getMEssageByMedium,
);
module.exports = router;

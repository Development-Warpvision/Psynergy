const express = require("express");
import {
  getMsg,
  sendMsg,
  getWebhook,
  postWebhook,
} from "../controllers/meta/controller";
import grantList from "../models/grant_list";
import { User } from "../models/user_model";
import { AccessContorlModel as AceessModel } from "../models/access_control_model";

const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");
const { uploadPost } = require("../utils/fileHandle");
const router = express();
import {
  getConversation,
  conversationRead,
} from "../controllers/conversations_controller";

router.route("/getmsg").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role, ], User),
  // hasPermissionRole([grantList.rootRead.role, "userCreate"], AceessModel),
  getMsg,
);

router.route("/sendmsg").post(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role], AceessModel),
  uploadPost.single("post"),
  sendMsg,
);

router.get("/webhook", getWebhook);
router.post("/webhook", postWebhook);

module.exports = router;

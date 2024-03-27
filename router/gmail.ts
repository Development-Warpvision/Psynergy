const express = require("express");
import {
  getMails,
  sendMail,
  logoutGmail,
} from "../controllers/gmail/controller";
import grantList from "../models/grant_list";
import { User } from "../models/user_model";
import { AccessContorlModel as AceessModel } from "../models/access_control_model";

const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");
const { upload } = require("../utils/fileHandle");
import { gettoken } from "../controllers/gmail/token_auth";

const router = express();

router
  .route("/gettoken")
  .get(isAuthenticated(User), isAuthenticated(AceessModel), gettoken);

router.route("/getmail").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role], AceessModel),
  getMails,
);
// router.route("/getMailbyID").get(getMailbyId);
router.route("/sendmail").post(
  // isAuthenticated(User),
  // isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role], AceessModel),
  upload.single("image"),
  sendMail,
);
router.route("/logout").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role], AceessModel),
  logoutGmail,
);

module.exports = router;

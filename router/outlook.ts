const express = require("express");
import {
  getMail,
  sendMail,
  sendReplyMail,
} from "../controllers/outlook/controller";
import grantList from "../models/grant_list";
import { User } from "../models/user_model";
import { AccessContorlModel as AceessModel } from "../models/access_control_model";
const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");
const { upload } = require("../utils/fileHandle");

const router = express();

router.route("/getmail").get(
  isAuthenticated(User),
  isAuthenticated(AceessModel),
  // hasPermissionRole([grantList.admin.role], User),
  // hasPermissionRole([grantList.rootRead.role], AceessModel),
  getMail,
);
// router.route("/getMailbyId").get(getMailbyId);
router.route("/sendmail").post(upload.single("image"), sendMail);
router.route("/sendreplymail").post(upload.single("image"), sendReplyMail);
// router.route("/searchMail").get(searchMail);

module.exports = router;

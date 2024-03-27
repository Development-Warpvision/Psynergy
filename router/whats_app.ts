const express = require("express");
import {
  webhook,
  getWMessages,
  sendWMessages,
  sendWDoc,
  sendWLocation,
} from "../controllers/whatsapp/controller";
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
import { User } from "../models/user_model";
const { isAuthenticated, hasPermissionRole } = require("../middleware/auth");

const router = express();

router.route("/webhook").get(webhook);
router.route("/webhook").post(isAuthenticated(User), getWMessages);
router.route("/sendMsg").post(sendWMessages);
router.route("/sendDoc").post(upload.array("file"), sendWDoc);
router.route("/sendLoc").post(sendWLocation);
// router.route("/downloadmedia").post(downloadMedia);

module.exports = router;

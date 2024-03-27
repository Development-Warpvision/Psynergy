import express from "express";
const router = express();
import {
  getAllTeamChat,
  newMessage,
  getAllTeamConversations,
  getSelectedConversation,
  getAllUser,
  getAllMyConversions,
} from "../controllers/teamchat/controller";

router.post("/newMessage", newMessage);
router.get("/getAllTeamChat", getAllTeamChat);
router.get("/getAllTeamConversations", getAllTeamConversations);
router.get("/getSelectedConversation", getSelectedConversation);
router.get("/getAllUser", getAllUser);
router.get("/getAllMyConversions", getAllMyConversions);

module.exports = router;

import express from "express";
const router = express();
const {recivechatWidgetMsg,sendChatWidgetMsgToClient,verifyUrl,getAllChatExports}= require("../controllers/chatWidgetController"
)

router.post("/recivechatWidgetMsg",recivechatWidgetMsg)
router.post("/sendChatWidgetMsgToClient",sendChatWidgetMsgToClient)
router.get("/verifyUrl",verifyUrl)
router.get("/getAllChatExports",getAllChatExports)



module.exports= router

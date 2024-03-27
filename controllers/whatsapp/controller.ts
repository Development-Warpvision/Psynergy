import axios from "axios";
import { Request, Response } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
import { uploadedImage } from "../../services/s3";
import { newConversation } from "../conversations_controller";
import { IUserRequest } from "../inteface";
const asyncHandler = require("express-async-handler");
var FormData = require("form-data");
var fs = require("fs");
const MessageSchema = require("../../models/message_model");
const User = require("../../models/user_model");
const AccessControlModel = require("../../models/access_control_model");
const Conversations = require("../../models/conversations_model");

const token =
  "EAAHoZAiRg5BgBABGoz4xijcsBajuOdWUzZA6qZC88UbkYcKQh5bhP5Q58MQ6GCqOZBpZA1nRZCdyWZC2KchSZCjETgIIXPECEE0KLjb9XojI5Qfi3c47ZC7F4Wn7gZBwq28PDvyMQ8zSaUiRqUjJbJT6cBKHZA5n4iEHyHL1WX55JLOP5ts5YSwUaZAo7Tg5BUU1KUdZBos3S9zVHSZCrymfMxzt6t";
const mytoken = "hello";
const phoneId = "109004838717307";

const getWMessages = asyncHandler(async (req: IUserRequest, res: Response) => {
  //    let body_param=req.body;
  let resBody, msg_body;
  let imageUrl: String = "",
    videoUrl: String = "",
    documentUrl: String = "",
    msg_txt: any;

  // let data = req.body.entry[0].changes[0].value.messages[0].text.body;
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let name = req.body.entry[0].changes[0].value.contacts[0].profile.name;
      let from = req.body.entry[0].changes[0].value.messages[0].from;

      //console.log(req.body.entry[0].changes[0].value.messages[0].type);
      if (req.body.entry[0].changes[0].value.messages[0].type == "document") {
        let msg_id = req.body.entry[0].changes[0].value.messages[0].document.id;
        documentUrl = await getMediaUrlbyId(msg_id);
      } else if (
        req.body.entry[0].changes[0].value.messages[0].type == "image"
      ) {
        let msg_id = req.body.entry[0].changes[0].value.messages[0].image.id;
        imageUrl = await getMediaUrlbyId(msg_id);
      } else if (
        req.body.entry[0].changes[0].value.messages[0].type == "video"
      ) {
        let msg_id = req.body.entry[0].changes[0].value.messages[0].video.id;
        videoUrl = await getMediaUrlbyId(msg_id);
      } else {
        msg_txt = req.body.entry[0].changes[0].value.messages[0].text.body;
      }
      let tofindID: String = req.body.entry[0].id;

      const postID = await MessageSchema.findById(tofindID);

      const conversationId = await newConversation(
        req.user._id,
        "whatsapp",
        req.user.cmpId,
        req.body.entry[0].id
      );

      if (!postID) {
        const resBody = {
          _parentid: req.body.entry[0].id,
          recievingMedium: "whatsapp",
          media: {
            message: msg_txt,
            msgId: req.body.entry[0].changes[0].value.messages[0].id,
            image: imageUrl,
            video: videoUrl,
            document: documentUrl,
          },
          contact: {
            name: name,
            from: from,
            to: req.body.entry[0].changes[0].value.messages[0].to,
          },
          isRead: false,
          receiveTime: req.body.entry[0].changes[0].value.messages[0].timestamp,
          messageBy: req.user._id,
          cmpId: req.user.cmpId,
          conversationsId: conversationId,
        };
        console.log(resBody)
        const post = await MessageSchema.create(resBody);
        // const user = await User.findById(req.user._id);

        // await user.message.push(post._id);
        // await user.save();
        let user;
        user = await User.findById(req.user._id);
        if (user === null) {
          user = await AccessControlModel.findById(req.user._id);
        }

        await user.message.push(post._id);
        await user.save();

        const conv = await Conversations.findById(conversationId);
        await conv.message.push(post);
        await conv.save();
      }
    }
  }

  function getMediaUrlbyId(msgId: String): String {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/v15.0/${msgId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        return response.data.url;
      })
      .catch(function (error) {
        //console.log(error);
        return "";
      });
    return "";
  }
  return res.status(200).json({ success: true, resdfv: resBody });
});

const sendWMessages = asyncHandler(async (req: Request, res: Response) => {
  const { to, messageBody, isUrl, msgType } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  var data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    msgType,
    text: {
      preview_url: isUrl ? true : false,
      body: messageBody,
    },
  });

  var config = {
    method: "post",
    url: `https://graph.facebook.com/v15.0/${phoneId}/messages`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
    data: data,
  };
  

  axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      res.status(200).json({ success: true });
    })
    .catch(function (error) {
      //console.log(error);
      res.status(400).json({ success: false });
    });
});

const sendWDoc = asyncHandler(async (req: any, res: Response) => {
  const { to, msgType } = req.body;
  const errors: Result<ValidationError> = validationResult(req);
  // let docId = await getMediaId(req.file.location);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  req.files.map(async (e: any) => {
    //console.log(e);
    const decodedData = Buffer.from(e.buffer, "base64");
    const mediaType: String = e.mimetype.match(/[^/]*/);

    let mediaUrl = await uploadedImage({
      decodedData: decodedData,
      Key: "public/" + "whatsapp/" + e.originalname,
    });
    var data = JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: mediaType[0],
      [mediaType[0]]: mediaUrl,
    });

    var config = {
      method: "post",
      url: `https://graph.facebook.com/v15.0/${phoneId}/messages`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        res.status(200).json({ success: true });
      })
      .catch(function (error) {
        // //console.log(error);
        res.status(400).json({ success: false });
      });
  });
});

const sendWLocation = asyncHandler(
  async (req: Request, res: Response, doc: any) => {
    const { to, latitude, longitude } = req.body;
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var data = JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "location",
      location: {
        latitude,
        longitude,
      },
    });

    var config = {
      method: "post",
      url: `https://graph.facebook.com/v15.0/${phoneId}/messages`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        res.status(200).json({ success: true, data: response.data });
      })
      .catch(function (error) {
        res.status(400).json({ success: false });
      });
  }
);

const webhook = asyncHandler(async (req: Request, res: Response) => {
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      return res.status(200).send(challange);
    } else {
      return res.status(403);
    }
  }
});

export { getWMessages, sendWMessages, sendWDoc, sendWLocation, webhook };

import { Request, Response, response } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";
import axios from "axios";
import { newConversation } from "../conversations_controller";
import { IUserRequest } from "../inteface";
const asyncHandler = require("express-async-handler");
import { Messages as MessageSchema } from "../../models/message_model";
import { User } from "../../models/user_model";
import { AccessContorlModel as AccessControlModel } from "../../models/access_control_model";
import { Conversations as Conversations } from "../../models/conversations_model";

// let msgPlatform: String = "instagram";
let apiVersion: String = "v15.0";

// let recipientId: String = "5757916874329391";

const getMsg: String = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const { msgPlatform }: any = req.query;
    console.log(msgPlatform);
    console.log(req.cookies.facebook);
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const apiVersion = "v19.0"; // Update with the latest API version

    // const url = `https://graph.facebook.com/${apiVersion}/${req.cookies.facebookid}/conversations?platform=${msgPlatform}&fields=id%2Cmessages%7Bmessage%2Cid%2Ccreated_time%2Cattachments%2Cfrom%2Cto%7D&access_token=${req.cookies.facebook}`;

    const url2 = `https://graph.facebook.com/${apiVersion}/${req.cookies.facebookid}/conversations?platform=${msgPlatform}&fields=participants,messages{id,message}&access_token=${req.cookies.facebook}`;
    try {
      const response = await axios.get(url2, {
        headers: { "Content-Type": "application/json" },
      });

      for (const element of response.data.data) {
        for (const msg of element.messages.data) {
          const tofindID = msg.id;

          const postID = await MessageSchema.findOne({ _msgid: tofindID });

          if (!postID) {
            const conversationId = await newConversation(
              req.user._id,
              msgPlatform,
              req.user.cmpId,
              element.id,
            );

            // Your existing logic for creating and saving messages
            let resBody = {
              _parentid: element.id,
              _msgid: msg.id,
              recievingMedium: msgPlatform,
              media: {
                message: msg.message,
                msgId: msg.id,
                image:
                  msg.attachments !== undefined
                    ? msg.attachments.data[0].image_data !== undefined
                      ? msg.attachments.data[0].image_data.url
                      : null
                    : null,
                video:
                  msg.attachments !== undefined
                    ? msg.attachments.data[0].video_data !== undefined
                      ? msg.attachments.data[0].video_data.url
                      : null
                    : null,
              },
              contact: {
                // name: element.participants.data[0].name,
                from: element.participants.data[0].name,
                to: [element.participants.data[1].name],
              },
              senderId: element.participants.data[0].id,
              reciverId: element.participants.data[1].id,
              isRead: false,
              receiveTime: msg.created_time,
              messageBy: req.user._id,
              cmpId: req.user.cmpId,
              conversationsId: conversationId,
            };
            // console.log("msg", msg.to.data);
            const post = await MessageSchema.create(resBody);

            let user;
            user = await User.findById(req.user._id);
            if (user === null) {
              user = await AccessControlModel.findById(req.user._id);
            }
            // @ts-ignore
            user?.message.push(post._id);
            await user?.save();

            const conv = await Conversations.findById(conversationId);
            conv?.message.push(post.id);
            await conv?.save();
          }
        }
      }

      res.status(200).send({ status: true });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ success: false, error: error });
    }
  },
);

// const getMsgbyID = asyncHandler(async (req: Request, res: Response) => {
//   const errors: Result<ValidationError> = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   var config = {
//     method: "get",
//     url: `https://graph.facebook.com/${apiVersion}/${req.body.msgID}?fields=messages%7Bid%2Ccreated_time%2Cfrom%2Cto%2Cmessage%7D&access_token=${req.cookies.facebook}`,
//     headers: {},
//   };

//   axios(config)
//     .then(function (response) {
//       res.status(200).json({ success: true, data: response.data });
//     })
//     .catch(function (error) {
//       res.status(400).json({ success: false });
//     });
// });

const sendMsg = asyncHandler(async (req: any, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  const { messageInp, recipientId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let mediaUrl, mediaType;
  if (messageInp === undefined) {
    (mediaUrl = req.file.location), (mediaType = "image");
  }

  var config = {
    method: "post",
    url:
      messageInp !== undefined
        ? `https://graph.facebook.com/${apiVersion}/${req.cookies.facebookid}/messages?recipient=%7Bid%3A%20%22${recipientId}%22%7D%20%20%20&message=%7Btext%3A%20%22${messageInp}%22%7D&access_token=${req.cookies.facebook}`
        : `https://graph.facebook.com/${apiVersion}/${req.cookies.facebookid}/messages?recipient=%7Bid%3A%20%22${recipientId}%22%7D%20%20%20%20&message=%7B%20%20%20%20%20%20%20'attachment'%3A%20%20%20%20%20%20%20%20%20%20%7B%20%20%20%20%20%20%20%20%20%20%20'type'%3A'${mediaType}'%2C%20%20%20%20%20%20%20%20%20%20%20%20'payload'%3A%7B'url'%3A'${mediaUrl}'%7D%20%20%20%20%20%20%7D%20%20%20%20%20%20%20%7D&access_token=${req.cookies.facebook}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // ("https://graph.facebook.com/v15.0/112931618341263/messages?recipient=%7Bid%3A%20%225757916874329391%22%7D%20%20%20&message=%7Btext%3A%20%22vv%22%7D&access_token=EABbhcM9exYABAL936ZAbR0z52vYayBEpT6PzB83HfuAkpz0If1V1JiUAVOx3gOK1l5uMQ4EAFaOVrcMXPjE9ZAUZALpkryTqf3JTMvF13zj5oQISV09HyYEwsNi1SkNgh6ZAgZAsayxIemTFEWqxh6wyCthyqYJ4mSnMZARYrqtg7yctKJw7ibBfap2Ju8ayZCvizr8Oz9OXAyHpqwtdiOc");
  axios(config)
    .then(function (response) {
      return res.status(200).json({ success: true });
    })
    .catch(function (error) {
      // console.log(error);

      return res.status(400).json({ success: false });
    });
});

//WEBHOOK MESSENGER WORK BELOW

const request = require("request");

// Replace with your Facebook Page Access Token and Verify Token
const PAGE_ACCESS_TOKEN = process.env.page_access_token;
const MY_VERIFY_TOKEN = process.env.my_verify_token;

function callSendAPI(messageData: any, facebook: any): void {
  request(
    {
      uri: "https://graph.facebook.com/v12.0/me/messages",
      qs: { access_token: facebook },
      method: "POST",
      json: messageData,
    },
    (error: any, response: any, body: any) => {
      if (!error && response.statusCode === 200) {
        console.log("Message sent successfully:", body);
      } else {
        console.error(
          "Failed to send message:",
          response.statusCode,
          response.statusMessage,
          body.error,
        );
      }
    },
  );
}

async function sendTextMessage(
  recipientId: any,
  messageText: any,
  facebook: any,
) {
  return new Promise((resolve, reject) => {
    const messageData = {
      recipient: { id: recipientId },
      message: { text: messageText },
    };

    request(
      {
        uri: "https://graph.facebook.com/v19.0/112931618341263/messages",
        qs: {
          recipient: JSON.stringify({ id: recipientId }),
          message: JSON.stringify({ text: messageText }),
          messaging_type: "MESSAGE_TAG",
          access_token: facebook,
          tag: "CONFIRMED_EVENT_UPDATE",
        },
        method: "POST",
        json: true,
      },
      async (error: any, response: any, body: any) => {
        if (error) {
          console.error("Error sending message:", error);
          reject(error);
          return;
        }

        if (response.statusCode !== 200) {
          console.error(
            "Failed to send message:",
            response.statusCode,
            response.statusMessage,
            body && body.error,
          );
          reject(body && body.error);
          return;
        }

        console.log("Message sent successfully:", body);

        // Find the existing conversation using the recipientId
        try {
          const message = await MessageSchema.findOne({
            senderId: body.recipient_id,
          }).sort({ receiveTime: -1 });

          if (!message) {
            console.error("No conversation found to update");
            reject("No conversation found");
            return;
          }

          console.log("waiting here");

          // Append the new message details to the conversation
          const newMessage = {
            _msgid: body.message_id,
            _parentid: message._parentid,
            recievingMedium: "MESSENGER",
            senderId: body.recipient_id,
            reciverId: message.reciverId,
            media: {
              message: messageText,
              msgId: body.message_id,
              // other media details...
            },
            contact: {
              from: message.contact?.from,
              to: [message.contact?.to],
              // contact details...
            },
            isRead: false,
            receiveTime: new Date(),
            cmpId: message?.cmpId, // Assuming you can retrieve this from the conversation
            conversationsId: message.conversationsId,
          };

          // Push the new message to the conversation's message array
          const post = await MessageSchema.create(newMessage);

          const conv = await Conversations.findOne({
            userSpecificId: post._parentid,
          });
          if (conv) {
            conv.message.push(post._id);
            await conv.save();
          } else {
            console.error("Conversation not found");
            reject("Conversation not found");
            return;
          }

          resolve(post);
        } catch (err) {
          console.error("Error handling message:", err);
          reject(err);
        }
      },
    );
  });
}

function sendAudioMessage(recipientId: any, audioURL: any) {
  const messageData = {
    recipient: { id: recipientId },
    message: {
      attachment: {
        type: "audio",
        payload: {
          url: audioURL,
        },
      },
    },
  };

  // callSendAPI(messageData);
}

function sendFileMessage(recipientId: any, fileURL: any) {
  const messageData = {
    recipient: { id: recipientId },
    message: {
      attachment: {
        type: "file",
        payload: {
          url: fileURL,
        },
      },
    },
  };

  // callSendAPI(messageData,facebook);
}

async function handleMessage(event: any, facebooky: any) {
  const senderId = event.sender.id;
  const message = event.message;

  if (message.text) {
    // Handle text messages
    const messageText = message.text.input;
    console.log(`Received text message from user ${senderId}: ${messageText}`);
    const sendMesssage = await sendTextMessage(
      senderId,
      messageText,
      facebooky,
    );

    return sendMesssage;
  } else if (message.attachments) {
    for (const attachment of message.attachments) {
      if (attachment.type === "audio") {
        // Handle voice message attachment
        const audioURL = attachment.payload.url;
        console.log(
          `Received audio attachment from user ${senderId}: ${audioURL}`,
        );
        // Respond with an audio message
        sendAudioMessage(senderId, audioURL);
      } else if (attachment.type === "file") {
        // Handle file attachment
        const fileURL = attachment.payload.url;
        console.log(
          `Received file attachment from user ${senderId}: ${fileURL}`,
        );
        // Respond with a file message
        sendFileMessage(senderId, fileURL);
      }
      // You can add more attachment types as needed and create corresponding functions
    }
  } else {
    // Handle other message types as needed
  }
}

// Webhook Verification
const getWebhook = async (req: Request, res: Response) => {
  console.log(JSON.stringify(req.body));
  try {
    let VERIFY_TOKEN = MY_VERIFY_TOKEN;
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified");
    }
    res.status(200).send(challenge);
  } catch (e) {
    return res.status(403).json("not allowed");

    console.log(e);
  }
  // if (mode === 'subscribe' && token === VERIFY_TOKEN) {
  //   console.log('Webhook verified');
  //   res.status(200).send(challenge);
  // } else {
  //   console.error('Verification failed');
  //   res.sendStatus(403);
  // }
};

// Message Handling
const postWebhook = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(req.cookies);
  // let result;

  if (data.object === "page") {
    const messages: any = [];
    data.entry.forEach((entry: { messaging: any[] }) => {
      entry.messaging.forEach(async (event) => {
        if (event.message) {
          const result = await handleMessage(event, req.cookies.facebook);
          console.log("finale result  ", result);
          messages.push(result);
          console.log("New", messages);
          res.status(200).send(messages);
        }
      });
    });

    // Send response outside the loop
  } else {
    res.sendStatus(404);
  }
};

export { getMsg, sendMsg, getWebhook, postWebhook };

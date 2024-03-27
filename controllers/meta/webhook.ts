
import { Request, Response } from "express";

const request = require('request');


// Replace with your Facebook Page Access Token and Verify Token
const PAGE_ACCESS_TOKEN = process.env.page_access_token
const MY_VERIFY_TOKEN = process.env.my_verify_token

function callSendAPI(messageData:any) {
  request({
    uri: 'https://graph.facebook.com/v12.0/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData,
  }, (error:Error, response:any, body:any) => {
    if (!error && response.statusCode === 200) {
      console.log('Message sent successfully');
    } else {
      console.error('Failed to send message');
    }
  });
}

function sendTextMessage(recipientId:any, messageText:any) {
  const messageData = {
    recipient: { id: recipientId },
    message: { text: messageText },
  };

  callSendAPI(messageData);
}
function handleMessage(event:any) {
    const senderId = event.sender.id;
    const messageText = event.message.text;
  
    // Add your message handling logic here
    console.log(`Received message from user ${senderId}: ${messageText}`);
  
    // Example: Send a response
    sendTextMessage(senderId, 'Hello! You said: ' + messageText);
  }
  
  

// Webhook Verification
const getWebhook= (req:Request, res:Response) => {
    let VERIFY_TOKEN=MY_VERIFY_TOKEN
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    console.error('Verification failed');
    res.sendStatus(403);
  }
}

// Message Handling
const postWebhook= (req:Request, res:Response) => {
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach((entry: { messaging: any[]; }) => {
      entry.messaging.forEach(event => {
        if (event.message) {
          handleMessage(event);
        }
      });
    });

    res.sendStatus(200);
  }
}


export{getWebhook,postWebhook}

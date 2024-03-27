import React, { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import styles from "./Custom.module.css";
import chatSlice from "../../features/get_messagesSlice";
import Messenger from "../../services/interface/Messenger";
const ChatWidget: React.FC<{
  data?: any;
  reply?: any;
  groupName?: any;
  messanger?: Messenger.GroupedConversation | null;
}> = ({ data, reply, groupName, messanger }) => {
  interface ChatMessage {
    agentReply?: string;
    userMsg?: string;
    replyMsg?: string;
    time: number;
  }

  console.log("data", data);
  console.log("reply", reply);

  const [chatArray, setChatArray] = useState<ChatMessage[]>([]);
  const [messangerArray, setMessangerArray] = useState<
    Messenger.AllExsistingMesseges[] | null
  >(messanger ? Object.values(messanger).flat() : null);

  useEffect(() => {
    if (!data) {
      return; // exit early if data is undefined
    }
    // Check if data is an array
    const newChatArray = Array.isArray(data)
      ? data.map((item) => {
          // console.log('item.chat', item.chat); // Log each item here

          // Assuming item.chat is an array, map through each element
          const messages = item.chat.map((chatItem: any) => ({
            message: chatItem.userMsg ? chatItem.userMsg : chatItem.agentReply,
            time: chatItem.time,
            userType: chatItem.userMsg ? "user" : "agent", // Add userType property
          }));

          return messages;
        })
      : data.questions;

    // console.log('newchatarray', newChatArray);
    setChatArray(newChatArray.flat()); // Use flat() to flatten the array of arrays into a single array
  }, [data]);

  useEffect(() => {
    setMessangerArray(messanger ? Object.values(messanger).flat() : null);
  }, [messanger]);

  // console.log("ChatArray", chatArray);

  const addAgentReply = (replies: any[]) => {
    if (replies.length > 0) {
      const lastReply = replies[replies.length - 1];
      const newMessage = {
        message: lastReply,
        time: Date.now(),
        userType: "agent",
      };

      console.log("newMessage", newMessage);
      setChatArray([...chatArray, newMessage]);
    }
  };

  useEffect(() => {
    // console.log(",,,,,", reply);
    if (reply !== undefined) {
      addAgentReply(reply);
    }
  }, [reply]);

  return (
    <Box sx={{ paddingX: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <>
          <>
            <Typography
              sx={{
                p: "10px",
                borderRadius: "0.5rem",
                backgroundColor: "#007ef2",
                color: "white",
                maxWidth: "100%",
                width: "100%",
              }}>
              {data && data.name ? (
                <>
                  <Divider />
                  <Typography>{data.name}</Typography>
                </>
              ) : groupName ? (
                <>
                  <Divider />
                  <Typography>{groupName}</Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    Subject: convo Portal Queries
                  </Typography>
                </>
              )}
            </Typography>
          </>
          <>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {/* Body:{data.name} */}
            </Typography>
          </>
          <>
            <Typography></Typography>
          </>
        </>
        <Box
          sx={{
            minWidth: "25vw",
            minHeight: "25vh",
            maxHeight: "25vh",
            maxWidth: "50vw",
          }}>
          {Object.values(chatArray).map(
            (conversation: any, conversationIndex: any) => {
              // console.log('conversation:', conversation);
              return (
                <div key={conversationIndex}>
                  <Box
                    sx={{
                      padding: 2,
                      border: "1px solid #ccc",
                      marginBottom: 2,
                      width: "100%",
                      textAlign:
                        conversation.userType === "user" ? "right" : "left",
                      color:
                        conversation.userType === "user" ? "black" : "blue",
                    }}>
                    <Box>
                      {conversation.userType === "user" &&
                        `User Message: ${conversation.message}`}
                      {conversation.userType === "agent" &&
                        `Agent Reply: ${conversation.message}`}
                    </Box>
                  </Box>
                </div>
              );
            },
          )}

          {messangerArray &&
            messangerArray.map((conversation: any, conversationIndex: any) => (
              <div key={conversationIndex}>
                <Box
                  sx={{
                    padding: 2,
                    border: "1px solid #ccc",
                    marginBottom: 2,
                    width: "100%",
                    textAlign:
                      conversation.contact.name === "Convo Portal"
                        ? "right"
                        : "left",
                    color: "blue",
                  }}>
                  <Box>{conversation.media.message}</Box>
                </Box>
              </div>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWidget;

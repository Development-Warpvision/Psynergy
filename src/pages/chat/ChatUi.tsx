import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import ConversationsList from "../../componets/chat/ConversationsList";
import {
  getConverstaions,
  gmailChat,
  outlookChat,
} from "../../features/get_messagesSlice";
import ChatWidget from "./chatWidget/ChatWidget";
import ChatSearch from "../../componets/chat/ChatSearch";
import InternetError from "../../componets/InternetError";
import { socket } from "../../App";
import ChatLoader from "../../componets/chat/ChatLoader";
import { Box, Button, Typography } from "@mui/material";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { metaChat } from "../../features/get_messagesSlice";
import Messenger from "../../services/interface/Messenger";
import { getConversations } from "../../services/backOfficeApi/BackOfficeApi";
// @ts-ignore
import { groupBy } from "lodash";
import IComStaff from "../../services/interface/Staff";

// import { groupBy } from "lodash";
const Chatui = () => {
  useEffect(() => {
    // console.log(metaChat('messenger'))
  }, []);

  interface Email {
    data: {
      threadId: string; // Assuming 'id' is a unique identifier for each email
      id: string;
      // other properties...
    };

    // Add other properties of the email as needed
  }
  const displayedMessageIds = new Set();
  const [newMsg, setNewMsg] = useState<any>([]);
  const [reply, setReplay] = useState<any>([]);
  const [chk, setChk] = useState<any>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [chatExports, setChatExports] = useState([]);
  const [allStaff, setAllStaff] = useState<IComStaff.IStaff[]>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") ?? "");
    const staff: IComStaff.IStaff[] | null =
      userData.user.staff ?? userData.user.createdby.staff;

    setAllStaff(staff ?? []);
  }, []);

  let find: any;
  const userToken = localStorage.getItem("user");
  if (userToken) {
    const user = JSON.parse(userToken);
    // console.log(user.user.email);
    find = user.user.email;
    // console.log(`sendAgentReplyNotification${find}`);
  }
  // console.log("chatExports", chatExports);
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
    socketRef.current = socket;
    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });
    socketRef.current.on("disconnect", () => {
      console.log("Socket connected");
    });
    socketRef.current.on("newEmail", (data) => {
      const email = data.email;
      const messageId = email._msgid;
      setEmails((prevEmails) => [data, ...prevEmails]);
      // console.log("email", email);
      // // Check if the messageId is already present in the emails state or displayedMessageIds set
      // if (messageId && !displayedMessageIds.has(email._id)) {
      //   // If messageId is not present, add the new email to the state and update displayedMessageIds
      //   setEmails((prevEmails) => {
      //     // Check again within the state updater function to prevent race conditions
      //     if (!prevEmails.some((e: any) => e._msgid === messageId)) {
      //       displayedMessageIds.add(email._id); // Add to displayed IDs to track it
      //       return [email, ...prevEmails];
      //     }
      //     return prevEmails; // If duplicate is found, return the previous state
      //   });
      // } else {
      //   // If messageId is present, it's a duplicate, log the information
      //   console.log("Duplicate Email: MessageId already exists");
      // }

      // }
    });

    socketRef.current.on("newOutlookMail", (data) => {
      console.log("newOutlookMail", data);
      // const messageId = data._msgid;
      // if (messageId && !displayedMessageIds.has(data._id)) {
      //   // If messageId is not present, add the new email to the state and update displayedMessageIds
      //   setEmails((prevEmails) => {
      //     // Check again within the state updater function to prevent race conditions
      //     if (!prevEmails.some((e: any) => e._msgid === messageId)) {
      //       displayedMessageIds.add(data._id); // Fix here: Use data._id instead of email._id
      //       return [data, ...prevEmails]; // Fix here: Use data instead of email
      //     }
      //     return prevEmails; // If duplicate is found, return the previous state
      //   });
      // } else {
      //   // If messageId is present, it's a duplicate, log the information
      //   console.log("Duplicate Email: MessageId already exists");
      // }
      setEmails((prevEmails) => [data, ...prevEmails]);
    });

    console.log(emails);

    socketRef.current.on("sendAgentNotification", (data) => {
      setChk((prevMessages: any) => {
        // Check if the email id already exists in the newMsg array
        const existingMessage = prevMessages.find(
          (message: any) => message.email === data.email,
        );

        if (existingMessage) {
          // Email id already exists, update the existing message
          return prevMessages.map((message: any) =>
            message.email === existingMessage.email
              ? {
                  name: data.name, // Update the name
                  email: data.email,
                  questions: [...message.questions, data.question],
                  time: data.time,
                  type: data.type,
                  // Add the new question
                }
              : message,
          );
        } else {
          // Email id doesn't exist, add the new message to the array
          return [
            ...prevMessages,
            {
              name: data.name,
              email: data.email,
              questions: [data.question],
              time: data.time,
              data: data.type,
            },
          ];
        }
      });
    });
    if (find !== undefined) {
      console.log("yes");

      socketRef.current.on(`sendAgentReplyNotification${find}`, (data) => {
        console.log(data.replyMsg);
        // If it's an object, convert it to an array
        setReplay((prevMessages: any) => [
          ...prevMessages,
          data.replyMsg,
          // data.type,
        ]);
      });
    }

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // console.log("email", emails);
  }, [emails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/getAllChatExports`,
        );
        const data = response.data;
        setChatExports(data);
      } catch (error) {
        console.error("Error fetching chat exports:", error);
      }
    };
    fetchData();
  }, [chk]);

  const [userApiKey, setUserApiKey] = useState("");
  const [response, setResponse] = useState("");
  // socketRef.current.emit('sendAgentReplyNotification',{message:"kia sawal hai"})
  const handleVerify = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/verifyUrl`,
        {
          params: {
            apiKey: "AVsJYZJxZC", // Or use userApiKey state if you have it
          },
        },
      );

      if (response.status === 200) {
        setResponse(response.data);
      } else {
        setResponse("Unauthorized key");
      }
    } catch (error) {
      console.error(error);
      setResponse("An error occurred");
    }
  };
  // Use optional chaining to access socketRef.current
  // console.log(socketRef.current?.connected);

  const { user } = useSelector((state: any) => state.auth);
  const { isLoading } = useSelector((state: any) => state.chat);
  const dispatch = useDispatch<any>();
  const [conversations, setConversations] = useState<any>();
  const [newConversations, setNewConversations] = useState<any>();

  // console.log("conversation in chatUi", conversations);

  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [recvingSocketMeiumn, setRecvingSocketMeiumn] =
    useState<String>("undefined");
  useEffect(() => {
    getConversation(skip);

    // dispatch(metaChat({ msgPlatform: "messenger" }));
  }, [skip]);
  useEffect(() => {
    const getData = async (skip: number) => {
      try {
        const onResolved = await dispatch(getConverstaions({ skip }));
        console.log("mmm", onResolved.payload);

        if (onResolved.payload !== "error") {
          if (onResolved.payload?.length === 0) {
            setIsEnd(true);
            return;
          }
          if (newConversations !== undefined) {
            setNewConversations(onResolved.payload);
          } else {
            setNewConversations(onResolved.payload);
          }
        }
      } catch (error) {
        // Handle error, if necessary
      }
    };

    getData(0);
  }, [emails]);

  useEffect(() => {}, []);

  // console.log("conversations", conversations);
  console.log("new convertions ", newConversations);

  const getConversation = async (skip: number) => {
    await dispatch(getConverstaions({ skip })).then((onResolved: any) => {
      if (onResolved.payload !== "error") {
        if (onResolved.payload?.length === 0) {
          setIsEnd(true);
          // console.log("payload0", onResolved.payload);
          return;
        }
        if (conversations !== undefined) {
          setConversations([...conversations, ...onResolved.payload]);
          console.log("payload1", onResolved.payload);
        } else {
          setConversations(onResolved.payload);
          console.log("payload2", onResolved.payload);
        }
      }
    });
  };

  const getMessage = async (recievingMedium: String) => {
    switch (recievingMedium) {
      case "datanm mnmnm":
        dispatch(gmailChat({})).then((onResolved: any) => {
          console.log(",,,,,", onResolved.payload);

          if (onResolved.payload !== "error") {
            getConversation(0);
          }
        });
        break;
      case "outlook":
        dispatch(outlookChat({})).then((onResolved: any) => {
          console.log("...", onResolved.payload);
          if (onResolved.payload !== "error") {
            console.log(onResolved.payload);
            getConversation(0);
          }
        });
        break;
    }
  };
  // useEffect(() => {
  //   getConversation();
  // }, [user !== null && user._id]);
  socket.on("ConvListWebhook", (notificationData: any) => {
    console.log(notificationData);
    // setConversations([...conversations, notificationData]);
    // setTimeout(() => {
    // }, 5000);

    setRecvingSocketMeiumn(notificationData.toString());
  });

  useEffect(() => {
    getMessage(recvingSocketMeiumn ?? "outlook");
    setRecvingSocketMeiumn("undefined");
  }, [recvingSocketMeiumn !== "undefined"]);

  const sendSkipBack = (message: number) => {
    setSkip(message);
  };

  // #region Messenger Area
  // Messenger Implimentations
  const [messengerConversations, setMessengerConversations] =
    useState<Messenger.GroupedConversation | null>(null);

  const [selectedChat, setSelectedChat] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getConversations({ medium: "messenger" });

        // Group conversations by "conversationsId"
        const groupedConversation = groupBy(data.reverse(), "conversationsId");

        setMessengerConversations(groupedConversation);
        // console.log("groupedConversation");
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // console.log("messengerConversations", messengerConversations);
  // console.log("selectedChat", selectedChat);

  // #endregion
  return (
    <Box sx={{ bgcolor: "#000000", width: "100%", maxHeight: "100vh" }}>
      {/* <Box sx={{ height: "50vh", display: "flex" }}>
        <Box sx={{ width: "100%" }}>
          <Box>
            {messengerConversations &&
              Object.keys(messengerConversations).map((conversationId) => {
                const conversation = messengerConversations[conversationId][0];
                return (
                  <Typography
                    key={conversationId}
                    sx={{ color: "#fff", width: "fit-content" }}>
                    <Button
                      onClick={() =>
                        setSelectedChat(conversation.conversationsId)
                      }
                      style={{ width: "100%" }}>
                      {conversation.contact.name}
                    </Button>
                  </Typography>
                );
              })}
          </Box>
        </Box>

        <Box sx={{ width: "50%" }}>
          <Typography sx={{ color: "#fff" }}>Selected Chat</Typography>

          <Box>
            {messengerConversations &&
            selectedChat &&
            messengerConversations[selectedChat] ? (
              messengerConversations[selectedChat].map((message, index) => {
                const isReplay = message.contact.name === "Convo Portal";
                return (
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: isReplay ? "bold" : "normal",
                    }}
                    key={index}>
                    {isReplay ? "Reply: " : "Received: "}
                    {message.media.message}
                  </Typography>
                );
              })
            ) : (
              <Typography sx={{ color: "white" }}>No messages</Typography>
            )}
          </Box>
        </Box>
      </Box> */}
      <button onClick={handleVerify}>Verify</button>
      <ConversationsList
        data={emails}
        sendSkipBack={sendSkipBack}
        isEnd={isEnd}
        myMessage={chk}
        reply={reply}
        chatExports={chatExports}
        conversations={conversations}
        messengerConversations={messengerConversations}
        allStaff={allStaff}
        newConverstions={newConversations}
      />
    </Box>
  );
};

export default Chatui;

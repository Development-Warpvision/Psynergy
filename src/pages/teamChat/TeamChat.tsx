import { Box, Typography, Paper, TextField, Button, List } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ITeamChat from "../../services/interface/TeamChat";
import {
  fetchAllAccessUsers,
  fetchMyAllConvertionsuser,
  selectedConvertions,
  sendNewMessage,
} from "../../services/backOfficeApi/TeamChatApi";
import ILogedUser from "../../services/interface/userData";
import { io, Socket } from "socket.io-client";
import TeamChatList from "./TeamChatComponents/TeamChatList";
import logo1 from "../../assets/Images/logo.png";

// only 10 msg load every time .... futers impliment

const TeamChat = () => {
  const [messages, setMessages] = useState<ITeamChat.ISelectMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<String>("");
  const [myConverstions, setMyConverstions] = useState<
    ITeamChat.IMyConvertionUser[]
  >([]);

  const [toUser, setToUser] = useState<string>("");
  const [mySearchFilter, setMySearchFilter] = useState<ITeamChat.IUserData[]>(
    [],
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<ITeamChat.IUserData[]>([]);

  // console.log("mySearchFilter", filteredUsers);

  const loggedUser = useMemo(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString) as ILogedUser.ILogedUserData;
      return userData;
    } else {
      return null;
    }
  }, []);

  // console.log("logedUser", loggedUser);

  // teamchat soccket connection
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
    socketRef.current = socket;
    // if (!loggedUser) return;
    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });
    socketRef.current.on("disconnect", () => {
      console.log("Socket connected");
    });
    // TODO: plz include secure comId and convertion ID future implimentations must....
    socketRef.current.on(
      `newTeamMessage`, //${loggedUser.user._id}
      async (data: ITeamChat.Message) => {
        console.log("newTeam Chat", data);

        if (
          data.from === loggedUser?.user._id ||
          data.to[0] === loggedUser?.user._id
        ) {
          setMyConverstions((prevConversations) => {
            const existingConversationIndex = prevConversations.findIndex(
              (conversation) => conversation.convertionId === data.convertionId,
            );

            if (existingConversationIndex !== -1) {
              console.log("hello");
              const updatedConversations = [...prevConversations];
              updatedConversations[existingConversationIndex].messages.push(
                data._id,
              );
              return updatedConversations;
            }
            console.log("Updating conversations:", prevConversations);
            return prevConversations;
          });
          // console.log("toUser:", toUser);
          console.log("data.from:", data.from);
          if (loggedUser.user._id !== data.from) {
            console.log("ewrrwr", messages.length);

            setMessages((prevMessages) =>
              prevMessages.length !== 0 &&
              ((prevMessages[0].from && prevMessages[0].from === data.from) ||
                (prevMessages[0].to && prevMessages[0].to[0] === data.from))
                ? [...prevMessages, data]
                : prevMessages,
            );
          }
        } else {
          console.log("not my convertions");
        }
      },
    );

    socketRef.current.on(
      "newConverstiionsMessage",
      (data: ITeamChat.IMyConvertionUser) => {
        if (
          data.contributors.accesscontroluser.find(
            (e) => e?._id === loggedUser?.user._id,
          ) ||
          data.contributors.user.find((e) => e?._id === loggedUser?.user._id)
        ) {
          setMyConverstions((prevConversations) => [
            ...prevConversations,
            data,
          ]);
        }
      },
    );

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [myConverstions, loggedUser]);

  // console.log("myConverstions", myConverstions);
  // console.log("messages", messages);

  //get my converstions
  useEffect(() => {
    const fetchMyAllConvertionUser = async () => {
      try {
        const response = await fetchMyAllConvertionsuser({
          userId: loggedUser?.user._id,
        });
        setMyConverstions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyAllConvertionUser();

    // get all accessuser
    const fetchUsers = async () => {
      try {
        const response = await fetchAllAccessUsers();
        setMySearchFilter(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  //   {
  //     id: 1,
  //     name: "Chat 1",
  //     lastMessage: "Hello",
  //     online: true,
  //     notificationCount: 3,
  //   },
  //   {
  //     id: 2,
  //     name: "Chat 2",
  //     lastMessage: "How are you?",
  //     online: false,
  //     notificationCount: 0,
  //   },
  //   {
  //     id: 3,
  //     name: "Chat 3",
  //     lastMessage: "Good to see you",
  //     online: true,
  //     notificationCount: 1,
  //   },
  // ];

  // send Message
  const handleSendMessage = async () => {
    if (
      newMessage.trim() !== "" &&
      loggedUser?.user.cmpId &&
      loggedUser?.user._id &&
      toUser
    ) {
      const messageData = {
        cmpID: loggedUser?.user.cmpId,
        from: loggedUser?.user._id,
        to: [toUser],
        message: newMessage,
      };

      setMessages([...messages, messageData]);
      try {
        const response = await sendNewMessage(messageData);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setNewMessage("");
    }
  };

  // console.log("myConverstions", myConverstions);

  const handleChatSelect = (
    id: string,
    messages: ITeamChat.ISelectMessage[],
    username: string,
  ) => {
    // Use the selected chat details as needed in the parent component
    setSelectedChat(username);
    setToUser((prevToUser) => {
      return id;
    });
    setMessages(messages);
  };

  // console.log("toUser", toUser);
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Side - Chat List */}
      <Box
        sx={{
          flex: 1,
          marginRight: "1rem",
          overflowY: "auto",
          bgcolor: "white",
          borderRadius: "0.5rem",
        }}>
        <Paper elevation={3} sx={{ padding: "1rem", marginBottom: "1rem" }}>
          <Typography variant="h5">Chats</Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="Search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setFilteredUsers(
                mySearchFilter.filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }}
            style={{ marginTop: "2rem" }}
          />
        </Paper>
        <List>
          {searchInput !== ""
            ? filteredUsers.map((user) => (
                <TeamChatList
                  key={user._id}
                  userData={user}
                  loggedUser={loggedUser}
                  onChatSelect={handleChatSelect}
                />
              ))
            : myConverstions.map((user) => (
                <TeamChatList
                  key={user._id}
                  userData={user}
                  loggedUser={loggedUser}
                  onChatSelect={handleChatSelect}
                />
              ))}
        </List>
      </Box>

      {/* Right Side - Chat Screen */}
      <Box
        sx={{
          flex: 2,
          bgcolor: "white",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "0.5rem",
        }}>
        <Paper elevation={3} sx={{ padding: "1rem", marginBottom: "1rem" }}>
          <Typography variant="h5">
            {selectedChat ? `${selectedChat}` : ""}
          </Typography>
        </Paper>
        <Box sx={{ height: "80%", overflowY: "auto" }}>
          {selectedChat ? (
            messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.from === loggedUser?.user._id
                      ? "flex-end"
                      : "flex-start",
                  margin: "0.5rem",
                }}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "0.5rem",
                    maxWidth: "1000px",
                    bgcolor:
                      message.from === loggedUser?.user._id ? "gray" : "white",
                  }}>
                  {message.message}
                </Paper>
              </Box>
            ))
          ) : (
            <img
              src={logo1}
              alt="Logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </Box>
        {selectedChat && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderTop: "1px solid #ccc",
              //   background: "red",
            }}>
            <TextField
              variant="outlined"
              fullWidth
              label="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <Button variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TeamChat;

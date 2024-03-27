import React, { useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllConverstaionsforStaff } from "../features/get_messagesSlice";
import TaskCard from "../componets/TaskCard";
import InternetError from "../componets/InternetError";
import ChatLoader from "../componets/chat/ChatLoader";
import { socket } from "../App";
import TaskBox from "../componets/Task-Assign/TaskBox";
import TaskCards from "../componets/Task-Assign/TaskCards";

const TaskAssign = () => {
  socket.on("getWebhook", (notificationData) => {
    // console.log(`Received notification: ${JSON.stringify(notificationData)}`);
  });

  const [conversations, setConversations] = useState([]);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((state: any) => state.chat);

  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const isMediumScreen = useMediaQuery("(min-width: 960px)");

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user") ?? "").user.createdby !==
      undefined
        ? JSON.parse(localStorage.getItem("user") ?? "").user.createdby._id
        : "";

    getConversation(user);
  }, []);

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user") ?? "").user.createdby !==
      undefined
        ? JSON.parse(localStorage.getItem("user") ?? "").user.createdby._id
        : "";

    getConversation(user);
  }, [user._id]);

  const getConversation = async (userId: string) => {
    await dispatch(getAllConverstaionsforStaff({ userId })).then(
      (onResolved: any) => {
        if (onResolved.payload !== "error") {
          console.log(onResolved.payload);

          setConversations(onResolved.payload);
        }
      }
    );
  };

  const result = conversations.filter((word: any) => {
    return word.users.length < 2;
  });
  console.log(result.length);

  return (
    <>
      {/* // Prev Code start*/}
      {isLoading ? (
        <ChatLoader />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isLargeScreen
              ? "repeat(3, 1fr)"
              : isMediumScreen
              ? "repeat(2, 1fr)"
              : "repeat(1, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {conversations.length !== undefined ? (
            result.map((e: any, index: number) => {
              return (
                <>
                  {e.message[0] !== undefined && (
                    <TaskCards key={e._id} e={e} />
                  )}
                </>
              );
            })
          ) : (
            <InternetError />
          )}
        </Box>
      )}
      {/* <TaskCard key={index} e={e} /> */}
      {/* // Prev Code end*/}
      {/* <Box
        height={"90vh"}
        py={"20px"}
        display={"grid"}
        gridTemplateColumns={"1fr 1fr 1fr"}
        gap={"20px"}
      
      >
        <TaskBox />
        <TaskBox />
        <TaskBox />
      </Box> */}
    </>
  );
};

export default TaskAssign;

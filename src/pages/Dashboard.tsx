import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { PinnedChats, getRecentChats } from "../features/get_messagesSlice";
import { useEffect, useState } from "react";
import Inquire from "../componets/Dashboard/Inquire";
import axios from "axios";
// import Cookies from 'js-cookie';

const Dashboard = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [pinnedChats, setPinnedChats] = useState([]);

  const dispatch = useDispatch<any>();

  const [agentsData, setAgentsData] = useState<
    Array<{ _id: string; email: string; loginStatus: boolean }>
  >([]);

  // get online agent
  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/getOnlineAgents`;

    // Make a POST request to the API with the requestBody
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data);
        localStorage.setItem("apiResponse", JSON.stringify(response.data));
        const newAgentsData = response.data.agents;
        setAgentsData((prevAgentsData) => [
          ...prevAgentsData,
          ...newAgentsData,
        ]);
        console.log("agents", agentsData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  //offline agent
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const loginStatus = localStorage.getItem("loginStatus");

    const agentData = {
      agentId: "658d2af9d6af6eda580964fb",
      loginStatus: false,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/offLineAgent`,
        agentData,
      )
      .then((response) => {
        console.log("Agent login status updated successfully:", response.data);
        const newAgentsData = response.data.agents;
        setAgentsData((prevAgentsData) => [
          ...prevAgentsData,
          ...newAgentsData,
        ]);
      })
      .catch((error) => {
        console.error("Error updating agent login status:", error);
      });
  }, []);

  // async function loginUser(username: any, password: any) {

  //   try {
  //     console.log("test...")
  //     const response = await axios.post('https://stg.api.convoportal.com/api/v1/iam/login', { username, password });

  //     if (response.status === 200) {
  //       console.log("test...")
  //       const userDataString: any = localStorage.getItem('user');
  //       const userData: any = JSON.parse(userDataString);

  //       const userId: string = userData.user._id;
  //       const loginStatus = localStorage.getItem('loginStatus');

  //       Cookies.set('userId', userId, { expires: 30 }); // Expires in 30 days

  //       console.log('user id:', userId);
  //       console.log('login Status :', loginStatus);
  //     } else {
  //       console.error(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function chatPin(chatId: any) {

  //   const token = Cookies.get('token')

  //   try {
  //     const response = await axios.put(`https://stg.api.convoportal.com/api/v1/conversations/conversation/pin`, {
  //       chatId: chatId
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     console.log(response.data);
  //   } catch (error) {

  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const chatId = "6513d200bba9ee047bb66250";

    getRecentChat();
    getPinChat();
    // loginUser("amit", "abc123")
    // chatPin(chatId)
  }, []);

  const getRecentChat = async () => {
    await dispatch(getRecentChats({})).then((onResolved: any) => {
      if (onResolved.payload !== "error") {
        setRecentChats(onResolved.payload);
        // console.log(recentChats);
      }
    });
  };
  const getPinChat = async () => {
    await dispatch(PinnedChats({})).then((onResolved: any) => {
      if (onResolved.payload !== "error") {
        setPinnedChats(onResolved.payload);
        console.log("hello", onResolved.payload);
      }
    });
  };

  return (
    <>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}> */}{" "}
      <br />
      <Typography variant="h6" component="h6" color="textPrimary">
        Dashboard
      </Typography>
      {/* <Box>
          </Box> */}
      <Box
        display={"flex"}
        // alignItems={"center"}
        justifyContent={"flex-start"}
        gap={"20px"}
        py={"20px"}>
        <Inquire agentData={agentsData} />
      </Box>
    </>
  );
};

export default Dashboard;

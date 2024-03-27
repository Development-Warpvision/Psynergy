import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
  Menu,
  Checkbox,
  Collapse,
  Paper,
  InputBase,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useEffect, useState } from "react";
import ChatScreen from "./ChatScreen";
import "../../App.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChatLabel from "./ChatLabel";
import MenuItem from "@mui/material/MenuItem";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import ChatSearch from "./ChatSearch";
import logo from "../../assets/Images/logo4.svg";
import { socket } from "../../App";
import { useDispatch } from "react-redux";
import { readChat } from "../../features/get_messagesSlice";
import ChatListBody from "./ChatListBody";
import SearchIcon from "@mui/icons-material/Search";
import { CircularLoading } from "../utils/CircularBar";
import ChatBotUi from "./ChatBotUi";
import ProfileUi from "./ProfileUi";
import TypeCard from "./TypeCard";
import axios from "axios";
import { getgroups } from "process";
import Messenger from "../../services/interface/Messenger";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "@mui/material/Modal";
import ILiveChat from "../../services/interface/LiveChat";
import IComStaff from "../../services/interface/Staff";
import INewConvertions from "../../services/interface/NewConverstions";

const ConversationsList: React.FC<{
  data?: any;
  sendSkipBack?: any;
  isEnd?: any;
  myMessage?: any;
  reply?: any;
  chatExports?: any;
  conversations?: any;
  messengerConversations: Messenger.GroupedConversation | null;
  allStaff?: IComStaff.IStaff[] | null;
  newConverstions?: INewConvertions.Converstion;
}> = ({
  data,
  sendSkipBack,
  isEnd,
  myMessage,
  reply,
  chatExports,
  conversations,
  messengerConversations,
  allStaff,
  newConverstions,
}) => {
  // console.log("messengerConversations updated:", messengerConversations);
  console.log("conversations", newConverstions);
  // console.log(" allStaff", allStaff);

  type dataType = Messenger.AllExsistingMesseges | any | null;

  const [chatCount, setChatCount] = useState(-1);
  const [selectedLiveChatID, setSelectedLiveChatID] = useState<string | null>(
    null,
  );

  const [selectedLiveChatIndex, setSelectedLiveChatIndex] =
    useState<number>(-1);
  const [messangerCount, setMessangerCount] = useState(-1);
  const [outlookCount, setOutlookCount] = useState(-1);
  const [gmailcount, setGmailCount] = useState(-1);
  const [chatData, setChatData] = useState<dataType>(data);
  const [tagCollapse, settagCollapse] = useState(false);
  const [mediumCollapse, setmediumCollapse] = useState(false);
  const [activated, setActivated] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();
  const [platform, setPlatform] = useState<String>("");
  const [allChatWidgetData, setAllChatWidgetData] = useState([chatExports]);
  const [allEmails, setAllEmails] = useState(
    newConverstions?.recievingMedium === "gmail" && newConverstions,
  );
  const [messanger, setMessanger] =
    useState<Messenger.GroupedConversation | null>(messengerConversations);
  // const [isRead, setIsRead] = useState(false);
  // console.log("chatData", chatData);

  // conversations.forEach((item: any, index: any) => {
  //   const emailMsg = item.message[0].media.emailMsg;
  //   console.log(`Email message for object at index ${index}:`, emailMsg);
  // });

  //  const [showSecondGrid, setShowSecondGrid] = useState(false);
  const [showSecondGrid, setShowSecondGrid] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isBetweenSmallAndMedium = useMediaQuery(
    theme.breakpoints.between("sm", "md"),
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSecondGridClick = () => {
    setIsOpen(true);
    setShowSecondGrid(!showSecondGrid);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setChatData(data);
    // console.log('chatData', chatData);
  }, [data]);

  useEffect(() => {
    setAllChatWidgetData(chatExports);
  }, [chatExports]);

  const FilterMenu = () => {
    const lables = JSON.parse(localStorage.getItem("label") ?? "");

    const HandleFilterMedium: any = (medium: string) => {
      const filterChat = chatData.filter(
        (e: any) => e.recievingMedium === medium,
      );

      setChatData(filterChat);
    };

    const HandleFilterLabel: any = (label: string) => {
      const filterChat = chatData.filter((e: any) => e.labels === label);

      setChatData(filterChat);
    };

    useEffect(() => {
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/getOnlineAgents`;

      axios
        .get(apiUrl)
        .then((response) => {
          // console.log('API Response:', response.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }, []);

    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Divider /> */}
        <MenuItem onClick={() => settagCollapse(!tagCollapse)}>
          <ListItemText>Tags</ListItemText>
          <Collapse in={tagCollapse} timeout="auto" unmountOnExit>
            {lables.map((e: string) => (
              <MenuItem key={e}>
                <Checkbox
                  onChange={() => {
                    HandleFilterLabel(e);
                  }}
                />
                <ListItemText>{e}</ListItemText>
              </MenuItem>
            ))}
          </Collapse>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setmediumCollapse(!mediumCollapse)}>
          <ListItemText>Medium</ListItemText>
        </MenuItem>
        <Collapse in={mediumCollapse} timeout="auto" unmountOnExit>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("facebook");
              }}
            />
            <ListItemText>Facebook</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("gmail");
              }}
            />
            <ListItemText>Gmail</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("Iinstagram");
              }}
            />
            <ListItemText>Instagram</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("outlook");
              }}
            />
            <ListItemText>Outlook</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("whatsapp");
              }}
            />
            <ListItemText>WhatsApp</ListItemText>
          </MenuItem>
        </Collapse>
        <MenuItem
          onClick={() => {
            setChatData(data);
          }}>
          <RestorePageIcon /> Clear
        </MenuItem>
      </Menu>
    );
  };

  const handleScroll = (e: any) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop >= scrollHeight * 0.9) {
      sendSkipBack(chatData?.length);
    }
  };

  const handleRead: any = (chatId: String, isRead: any) => {
    console.log("read");
    if (!isRead) {
      dispatch(
        readChat({
          chatId,
        }),
      ).then((onResolved: any) => {
        if (onResolved.payload === "true") {
        }
      });
    }
  };

  const handleImageClick = (platform: string) => {
    if (platform === "Gmail") {
      console.log("Clicked on Gmail");
      setPlatform("Gmail");
    } else if (platform === "WhatsApp") {
      console.log("Clicked on Whatsapp");
      setPlatform("WhatsApp");
    } else if (platform === "Outlook") {
      console.log("Clicked on Outlook");
      setPlatform("Outlook");
    } else if (platform === "Facebook") {
      console.log("Clicked on Facebook");
      setPlatform("Facebook");
    } else if (platform === "Instagram") {
      console.log("Clicked on Instagram");
      setPlatform("Instagram");
    } else if (platform === "Facebook") {
      console.log("Clicked on Facebook");
      setPlatform("Facebook");
    } else {
      console.log("else");
    }
  };

  const gmailData = chatData ? chatData : [];
  // const chatWidgetData = Array.isArray(myMessage) ? myMessage : [];
  const preChatWidgetData = Array.isArray(allChatWidgetData)
    ? allChatWidgetData
    : [];

  // useEffect(() => {
  //   setGmailConversations((prevConversations:any) => [...prevConversations, ...chatData]);
  // }, [chatData]);

  //  console.log('allEmails', allEmails)

  const groupedChatData: ILiveChat.GroupChatRoot = preChatWidgetData.reduce(
    (acc, chat) => {
      // console.log('allEmails', chat.userEmail)
      if (!acc[chat.userEmail]) {
        acc[chat.userEmail] = { groupName: chat.userEmail, chats: [] };
      }
      acc[chat.userEmail].chats.push(chat);

      // console.log('acc', acc)
      return acc;
    },
    {},
  );

  // console.log("groupedChatData", groupedChatData);
  // console.log('grp', groupedChatData)

  const [myMessageChatData, setMyMessageChatData] = useState([]);
  // const allWhatsAppChats = [...Object.values(groupedChatData), ...myMessageChatData];

  useEffect(() => {
    if (myMessage) {
      const groupedChatArray = Object.values(groupedChatData);
      const isMessageInGroup = myMessage.some((message: any) =>
        groupedChatArray.some(
          (group: any) => group.groupName === message.email,
        ),
      );
      if (isMessageInGroup) {
        console.log(`Message with name is in the group.`);
      } else {
        setMyMessageChatData(myMessage);
        //  console.log(`hello`);
      }
    }
  }, [myMessage, groupedChatData]);

  const content = (
    <Paper
      sx={{
        position: "fixed",
        top: "50%",
        right: 0, // Align to the right side
        transform: "translateY(-50%)",
        width: "50%", // Set the width to 50% of the screen
        maxHeight: "100%", // Adjust the height as needed
        p: 2,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 8,
      }}>
      <Box>
        <Box>
          <Box>
            <Typography
              gutterBottom
              fontSize={"20px"}
              fontWeight={"bolder"}
              color={"#ffffff"}>
              Shared files
            </Typography>
            <Divider sx={{ bgcolor: "#ffffff" }} />
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <ProfileUi isOnline={true} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Box
              sx={{
                bgcolor: "#00A489",
                width: "100px",
                height: "70px",
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-around",
                p: 0.5,
              }}>
              <Box>
                <InsertDriveFileIcon
                  style={{ fontSize: "40px", color: "#000000" }}
                />
              </Box>
              <Box>
                <Typography sx={{ color: "#ffffff" }}>All</Typography>
                <Typography sx={{ color: "#ffffff" }}>231</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: "#00A489",
                width: "100px",
                height: "70px",
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-around",
                p: 0.5,
              }}>
              <Box>
                <AttachFileIcon
                  style={{ fontSize: "40px", color: "#D9D9D9" }}
                />
              </Box>
              <Box>
                <Typography sx={{ color: "#000000" }}>All</Typography>
                <Typography sx={{ color: "#000000" }}>231</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: 0.5,
            }}>
            <Box>
              <Typography sx={{ color: "#ffffff" }}>File type</Typography>
            </Box>
            <Box>
              <MoreVertIcon style={{ color: "#D9D9D9" }} />
            </Box>
          </Box>
          <Box>
            <TypeCard />
            <TypeCard color="#C1B07A" icon={<InsertPhotoIcon />} />
            <TypeCard color="#7ED3DA" icon={<SmartDisplayIcon />} />
            <TypeCard color="#BC6E5E" icon={<MoreTimeIcon />} />
          </Box>
        </Box>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Paper>
  );

  return (
    <>
      <Grid
        container
        // spacing={2}
        // // gap={"10px"}
        // columnSpacing={2}
        sx={{
          width: "100%",
          maxHeight: "100vh",
          height: "100vh",
          zIndex: 1,
          // boxShadow: 3,
          overflowX: "clip",
          // background: "#000000",
        }}>
        {/* ////////////////// */}
        <ChatBotUi />
        {/* ////////////////// */}
        <Grid
          item
          xs={showSecondGrid ? 2.5 : 3}
          md={showSecondGrid ? 2.5 : 3}
          sm={4}
          sx={{
            height: { sm: "90vh", md: "100vh" },
            // height: "100%" ,
            position: "relative",
            backgroundColor: "#000000",
            borderRadius: "20px 0 0 20px",
            p: 2,
            overflowY: "scroll",
            // display: "flex",
            "&::-webkit-scrollbar": {
              width: "0px",
              visibility: "hidden",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
            // borderRight: "8px solid #000000",
            overflowX: "clip",
          }}
          onScroll={handleScroll}>
          <Box sx={{ bgcolor: "#000000", color: "#ffffff" }}>
            <Box>
              <Typography
                gutterBottom
                fontSize={"20px"}
                fontWeight={"bolder"}
                color={"#ffffff"}>
                CHAT
              </Typography>
              <Divider sx={{ bgcolor: "#ffffff" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                height: "60px",
                p: 1,
                bgcolor: "#000000",
              }}>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                <FilterListIcon sx={{ color: "#ffffff" }} />
              </IconButton>

              <FilterMenu />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <ProfileUi isOnline={false} />
            </Box>
          </Box>

          {/* <ChatSearch chatData={chatData} />  */}

          <Box p={" 0px 20px 0px 8px"}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                bgcolor: "#323232",
                borderRadius: 20,
                mt: 2,
              }}>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "#ffffff" }}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: 0.5,
            }}>
            <Box onClick={() => handleImageClick("WhatsApp")}>
              <img src="whatsapp-logo.png" width="30px" alt="WhatsApp" />
            </Box>
            <Box onClick={() => handleImageClick("Instagram")}>
              <img src="instagram-logo.png" width="30px" alt="Instagram" />
            </Box>
            <Box onClick={() => handleImageClick("Gmail")}>
              <img src="gmail-logo.png" width="30px" alt="Gmail" />
            </Box>
            <Box onClick={() => handleImageClick("Outlook")}>
              <img src="outlook.png" width="30px" alt="Outlook" />
            </Box>
            <Box onClick={() => handleImageClick("Facebook")}>
              <img src="facebook-logo.png" width="30px" alt="Facebook" />
            </Box>
          </Box>

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#000000",
              color: "#ffffff",
              mt: 3,
            }}>
            {platform === "Gmail" &&
              newConverstions &&
              Object.values(newConverstions).map((e: any, i: number) => (
                <div key={i}>
                  <Box
                    onClick={() => {
                      setGmailCount(i);
                      setActivated(true);
                      console.log("chat count live", gmailcount);
                      if (e._id) {
                        handleRead(e._id, e.isRead);
                      }
                    }}>
                    <ChatListBody e={e} />
                  </Box>
                </div>
              ))}
            {platform === "WhatsApp" &&
              Object.keys(groupedChatData).map((e, i) => {
                return (
                  <div key={i}>
                    <Box
                      onClick={() => {
                        setSelectedLiveChatID(groupedChatData[e].groupName);
                        setActivated(true);
                        console.log("chat count live", selectedLiveChatID);
                      }}>
                      <ChatListBody e={e} />
                    </Box>
                  </div>
                );
              })}

            {platform === "WhatsApp" &&
              myMessageChatData.map((e, i: number) => (
                <div key={i}>
                  <Box
                    onClick={() => {
                      setSelectedLiveChatID(e);
                      setActivated(true);
                      console.log("chat count live", selectedLiveChatID);

                      // if (e._id) {
                      //   handleRead(e._id, e.isRead);
                      // }
                    }}>
                    <ChatListBody e={e} />
                  </Box>
                </div>
              ))}
            {platform === "Facebook" &&
              (messengerConversations
                ? Object.values(messengerConversations).map(
                    (e: dataType, i: number) => (
                      <div key={i}>
                        <Box
                          onClick={() => {
                            setMessangerCount(i);
                            setActivated(true);
                            // console.log("chat count live", messangerCount);

                            // if (e._msgid) {
                            //   handleRead(e._msgid, e.isRead);
                            // }
                          }}>
                          <ChatListBody e={e} />
                        </Box>
                      </div>
                    ),
                  )
                : null)}
            {platform === "Outlook" &&
              newConverstions &&
              (newConverstions.recievingMedium === "outlook"
                ? Object.values(newConverstions).map((e: any, i: number) => (
                    <div key={i}>
                      <Box
                        onClick={() => {
                          setOutlookCount(i);
                          setActivated(true);
                          console.log("chat count live", outlookCount);
                          if (e._id) {
                            handleRead(e._id, e.isRead);
                          }
                        }}>
                        <ChatListBody e={e} />
                      </Box>
                    </div>
                  ))
                : null)}
          </List>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularLoading />
          </Box>
        </Grid>
        <Grid
          item
          xs={showSecondGrid ? 7 : 9}
          md={showSecondGrid ? 7 : 9}
          sm={8}
          sx={{
            maxHeight: { sm: "90vh", md: "100vh" },
            backgroundColor: "#585858",
            borderRadius: !showSecondGrid ? "0 20px 20px 0" : "0",
            // borderLeft: "8px solid #585858 ",
          }}>
          {platform === "Gmail" && gmailcount !== -1 ? (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { md: 10, sm: 5 },
                  right: 30,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  bgcolor: "#24a0ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Button onClick={handleSecondGridClick}>
                  <ArrowBackIcon />
                </Button>
              </Box>
              <Box sx={{ p: 2, pt: { md: 8, sm: 5 } }}>
                <ChatScreen
                  Chatdata={
                    newConverstions
                      ? newConverstions[
                          Object.keys(newConverstions)[gmailcount]
                        ]
                      : null
                  }
                  reply={reply}
                  chatNumber={gmailcount}
                  currentUserID={chatData?.[gmailcount]?.userSpecificId}
                />
              </Box>
            </Box>
          ) : platform === "WhatsApp" &&
            Object.keys(groupedChatData).length > 0 ? (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { md: 10, sm: 5 },
                  right: 30,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  bgcolor: "#24a0ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Button onClick={handleSecondGridClick}>
                  <ArrowBackIcon />
                </Button>
              </Box>
              <Box sx={{ p: 2, pt: { md: 8, sm: 5 } }}>
                <ChatScreen
                  groupedChatData={groupedChatData[selectedLiveChatID!]}
                  reply={reply}
                  selectedLiveChatID={selectedLiveChatID}
                />
              </Box>
            </Box>
          ) : platform === "Facebook" &&
            messangerCount !== -1 &&
            messengerConversations &&
            Object.keys(messengerConversations).length > 0 ? (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { md: 10, sm: 5 },
                  right: 30,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  bgcolor: "#24a0ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Button onClick={handleSecondGridClick}>
                  <ArrowBackIcon />
                </Button>
              </Box>
              <Box sx={{ p: 2, pt: { md: 8, sm: 5 } }}>
                <ChatScreen
                  Chatdata={
                    messengerConversations[
                      Object.keys(messengerConversations)[messangerCount]
                    ]
                  }
                  reply={reply}
                />
              </Box>
            </Box>
          ) : platform === "Outlook" && outlookCount > -1 ? (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { md: 10, sm: 5 },
                  right: 30,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  bgcolor: "#24a0ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Button onClick={handleSecondGridClick}>
                  <ArrowBackIcon />
                </Button>
              </Box>
              <Box sx={{ p: 2, pt: { md: 8, sm: 5 } }}>
                <ChatScreen
                  Chatdata={
                    newConverstions
                      ? newConverstions[
                          Object.keys(newConverstions)[outlookCount]
                        ]
                      : null
                  }
                  reply={reply}
                  chatNumber={outlookCount}
                  currentUserID={chatData?.[outlookCount]?.userSpecificId}
                />
              </Box>
            </Box>
          ) : !platform ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: "auto",
                height: { sm: "90vh", md: "100vh" },
                overflow: "hidden",
                borderRadius: !showSecondGrid ? "0 20px 20px 0" : "0",
              }}>
              <img
                src={logo}
                alt="Convo Portal"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          ) : null}
        </Grid>

        {!isBetweenSmallAndMedium ? (
          showSecondGrid && (
            <Grid
              item
              xs={2.5}
              md={2.5}
              sx={{
                maxHeight: "100vh",
                backgroundColor: "#000000",
                p: 2,
                borderBottomRightRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: "0px",
                borderTopLeftRadius: "0px",
              }}>
              <Box>
                <Box>
                  <Typography
                    gutterBottom
                    fontSize={"20px"}
                    fontWeight={"bolder"}
                    color={"#ffffff"}>
                    Shared files
                  </Typography>
                  <Divider sx={{ bgcolor: "#ffffff" }} />
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <ProfileUi isOnline={false} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}>
                  <Box
                    sx={{
                      bgcolor: "#00A489",
                      width: "100px",
                      height: "70px",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "space-around",
                      p: 0.5,
                    }}>
                    <Box>
                      <InsertDriveFileIcon
                        style={{ fontSize: "40px", color: "#000000" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#ffffff" }}>All</Typography>
                      <Typography sx={{ color: "#ffffff" }}>231</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#00A489",
                      width: "100px",
                      height: "70px",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "space-around",
                      p: 0.5,
                    }}>
                    <Box>
                      <AttachFileIcon
                        style={{ fontSize: "40px", color: "#D9D9D9" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#000000" }}>All</Typography>
                      <Typography sx={{ color: "#000000" }}>231</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    p: 0.5,
                  }}>
                  <Box>
                    <Typography sx={{ color: "#ffffff" }}>File type</Typography>
                  </Box>
                  <Box>
                    <MoreVertIcon style={{ color: "#D9D9D9" }} />
                  </Box>
                </Box>
                <Box>
                  <TypeCard />
                  <TypeCard color="#C1B07A" icon={<InsertPhotoIcon />} />
                  <TypeCard color="#7ED3DA" icon={<SmartDisplayIcon />} />
                  <TypeCard color="#BC6E5E" icon={<MoreTimeIcon />} />
                </Box>
              </Box>
            </Grid>
          )
        ) : (
          <Modal open={isOpen} onClose={onClose}>
            <Box>{content}</Box>
          </Modal>
        )}
      </Grid>
    </>
  );
};

export default ConversationsList;

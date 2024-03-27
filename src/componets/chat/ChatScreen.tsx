import {
  Avatar,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  easing,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import Message from "./ChatMessage";
import {
  sendgmail,
  sendMeta,
  sendOutlook,
} from "../../features/send_messageSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmailMessge from "./EmailMessge";

import { socket } from "../../App";
import {
  PinnedChats,
  getConverstaions,
  gmailChat,
  metaChat,
  outlookChat,
} from "../../features/get_messagesSlice";
import getCookieValue from "../utils/getCookie";
import MoreModel from "./MoreModel";
import { TbPinnedFilled } from "react-icons/tb";
import notification from "../../Toast";
import ChatWidget from "./ChatWidget";
import ILiveChat from "../../services/interface/LiveChat";
import ILogedUser from "../../services/interface/userData";

const ChatScreen: React.FC<{
  Chatdata?: any;
  chatNumber?: any;
  currentUserID?: any;
  msgData?: any;
  reply?: any;
  selectedLiveChatID?: string | null;
  groupedChatData?: ILiveChat.GroupChat;
  gmailConversations?: any;
}> = ({
  Chatdata,
  chatNumber,
  currentUserID,
  msgData,
  reply,
  selectedLiveChatID,
  groupedChatData,
  gmailConversations,
}) => {
  msgData = [msgData];

  const [data, setData] = useState(Chatdata);
  console.log("data, bbbb", data);
  console.log(data.message[0].contact.to[0].toString());

  const [msgData1, setMsgData1] = useState<any>();
  const [media, setMedia] = useState<any | null>(null);
  const [input, setInput] = useState("");

  // const [messangerMessage, setMessangerMessage] = useState(messanger);

  useEffect(() => {
    setData(Chatdata);
  }, [Chatdata]);

  const loggedUser = useMemo(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString) as ILogedUser.ILogedUserData;
      return userData;
    } else {
      return null;
    }
  }, []);

  // useEffect(() => {
  //   const outlookNameCookie = Cookies.get("outlookname");

  //   if (outlookNameCookie) {
  //     console.log("Outlook Name:", outlookNameCookie);
  //   } else {
  //     console.log("Outlook cookie not found");
  //   }
  // }, []);

  console.log("data ", Chatdata);
  console.log("loggedUser ", loggedUser);
  // 6581455233ee1d2a8ef8795b
  //
  const sendReply = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/sendChatWidgetMsgToClient`,
      { chatid: groupedChatData?.chats[0]._id, type: "reply", replyMsg: input },
    );
    setInput("");
  };

  const sendMessengerMessage = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/meta/webhook`,
        {
          object: "page",
          entry: [
            {
              id: "112931618341263",
              messaging: [
                {
                  sender: {
                    id: "6842893689091754",
                  },
                  recipient: {
                    id: "112931618341263",
                  },
                  message: {
                    text: { input },
                  },
                },
              ],
            },
          ],
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Cookie:
        //       "facebook=EAAJFNt1lb24BOZBJN7C64XcWLAc1CxlquZAUvQ9PS562fOyZA5TYFucp4LGYcbKnjMHJBeiKVAYXNZB62FJ61xGyW8qN8HQnmz72tv9pVkaTvaO5O7PFxVMPucPLF7GjnMPceH5LQC8BDULSAFmsEeLgl9NZC5pNZAiCB5JgZASQMjU7VwEnum2Dq9WeGScZCDvsKb3TNtEBb3rkYjy9v2kitSs1D22cKIryXrZAZCKNMZD",
        //   },
        // },
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error sending messenger message:", error);
    }
  };
  const [showBottomSheet, setshowBottomSheet] = useState(false);
  const [pinnedChats, setPinnedChats] = useState("");
  // let ischage: number = 0;
  const dispatch = useDispatch<any>();
  let recievingMediumCheck: string;

  useEffect(() => {
    setData(Chatdata);
    PinChat();
  }, [chatNumber]);
  useEffect(() => {
    setMsgData1([msgData]);
  }, [chatNumber]);

  const handleClickPinned = async () => {
    await dispatch(PinnedChats({ chatid: Chatdata._id })).then(
      (onResolved: any) => {
        if (onResolved.payload !== "error") {
          if (onResolved.payload.errors) {
            notification("error", onResolved.payload.errors[0].message);
          } else {
            setPinnedChats(onResolved.payload);
          }
        }
      },
    );
  };

  // useEffect(() => {
  //   console.log(data);
  //   setData(data);
  //   ischage--;
  // }, [ischage === 1, data]);
  async function PinChat() {
    // await dispatch(PinnedChats(currentUserID)).then(
    //   (onResolved: any) => {
    //     // console.log(Chatdata._id)
    //     if (onResolved && onResolved.payload !== "error") {
    //       if (onResolved.payload.errors) {
    //         notification("error", onResolved.payload.errors[0].message);
    //       } else {
    //         setPinnedChats(onResolved.payload);
    //       }
    //     }
    //   }
    // );
  }

  // socket.on("getWebhook", async (notificationData: any) => {
  //   console.log("...........................getWebhook", notificationData);
  //    if (currentUserID.toString() === notificationData.convid.toString()) {
  //   const updatedData = {
  //     ...data,
  //     message: [
  //       ...data.message,
  //       {
  //         media: {
  //           emailMsg: {
  //             body: notificationData.media.emailMsg.body,
  //             subject: "",
  //           },
  //         },
  //         contact: { from: "" },
  //         receiveTime: notificationData.contact.receiveTime,
  //       },
  //     ],
  //   };

  //   setData(updatedData);
  //    }
  // });

  recievingMediumCheck =
    Chatdata !== undefined ? Chatdata.recievingMedium : null;

  const handleSubmit = (recievingMedium: string) => async (e: any) => {
    e.preventDefault();
    console.log("rM", data);
    await data.message.push({
      cmpId: loggedUser?.user.cmpId,
      contact: {
        name: "shadhir",
        from:
          data !== undefined && data.recievingMedium === "outlook"
            ? data.message[0].contact.to[0].emailAddress.address.toString()
            : data.message[0].contact.to[0].toString(),
        to: data !== undefined && data.message[0].contact.from.toString(),
        cc: data !== undefined && data.message[0].contact.cc[0],
      },
      _parentid: data !== undefined && data.message[0]._parentid,
      _msgid: data !== undefined && data.message[0]._msgid,
      isRead: false,
      messages: [data !== undefined && data.message[0].messages[0]],
      media: {
        document: [],
        image: null,
        emailMsg: {
          subject: data !== undefined && data.message[0].media.emailMsg.subject,
          body: input,
        },
        video: null,
      },
      receiveTime: new Date(Date.now()).toString(),
      recievingMedium: recievingMedium,
    });
    try {
      switch (recievingMedium) {
        case "gmail":
          const to = data !== undefined && data.message[0].contact.from;
          // .match(
          //   /<(.*?)>/,
          // );
          console.log("to", to);
          console.log(
            "data.message[0]",
            (data?.message[0].contact.from).match(/<(.*?)>/),
          );

          await dispatch(
            sendgmail({
              to: to,
              subject:
                data !== undefined && data.message[0].media.emailMsg.subject,
              body: input,
              replyTo: to,
              mediaPath: media,
              threadId: data !== undefined && data.message[0]._parentid,
              MessageID: data !== undefined && data.message[0].messages[0],
            }),
          ).then(async (onResolved: any) => {
            if (onResolved.payload === 200) {
            }
            setData(data);
          });
          break;
        case "messenger":
          console.log("welcom.....");
          const sameRecipient: any = () => {
            let index: number = 0;

            if (
              data.message[index].contact.from === getCookieValue("facebookid")
            ) {
              index++;
              sameRecipient(data.message[index].contact.from);
            }
            return data.message[index].contact.from;
          };
          const recipientId: string =
            data !== undefined && sameRecipient(data.message[0].contact.from);

          await dispatch(sendMeta({ messageInp: input, recipientId })).then(
            (onResolved: any) => {
              setData(data);
            },
            (onRejected: any) => {
              // console.log(onRejected);
            },
          );
          break;
        case "outlook":
          await dispatch(
            sendOutlook({
              to: data !== undefined && data.message[0].contact.from.toString(),
              from:
                data !== undefined &&
                data.message[0].contact.to[0].emailAddress.address.toString(),
              cc: data !== undefined && data.message[0].contact.cc[0],
              subject:
                data !== undefined && data.message[0].media.emailMsg.subject,
              body: input,
              replyTo:
                data !== undefined && data.message[0].contact.from.toString(),
              mediaPath: media,
              _parentid: data !== undefined && data.message[0]._parentid,
              _msgid: data !== undefined && data.message[0]._msgid,
              cmpId: loggedUser?.user.cmpId,
              messageBy: "123",
            }),
          ).then((onResolved: any) => {
            if (onResolved.payload === 200) {
              setData(data);
            }
            // setData([...data]);
          });
          break;
      }

      setInput("");
    } catch (err) {
      console.log(err);
    }

    // await setData(Chatdata);
  };

  const handleRefesh = () => {
    switch (recievingMediumCheck) {
      case "gmail":
        dispatch(gmailChat({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            dispatch(getConverstaions({})).then((onResolved: any) => {
              if (onResolved.payload !== "error") {
                setData(onResolved.payload[chatNumber]);
              }
            });
          }
        });
        break;
      case "messenger":
        dispatch(metaChat({ msgPlatform: "messenger" })).then(
          (onResolved: any) => {
            if (onResolved.payload !== "error") {
              dispatch(getConverstaions({})).then((onResolved: any) => {
                if (onResolved.payload !== "error") {
                  setData(onResolved.payload[chatNumber]);
                }
              });
            }
          },
        );
        break;
      case "outlook":
        dispatch(outlookChat({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            dispatch(getConverstaions({})).then((onResolved: any) => {
              if (onResolved.payload !== "error") {
                setData(onResolved.payload[chatNumber]);
              }
            });
          }
        });
        break;
    }
  };

  //   const specificDate = DateTime.fromISO(data?.message[0]?.receiveTime);
  //   const now = DateTime.now();
  // const diff = now.diff(specificDate, ['days', 'hours', 'minutes', 'seconds', "years"]).toObject();
  // const daysSince = Math.floor(diff.days);
  // const hoursSince = Math.floor(diff.hours);
  // const minutesSince = Math.floor(diff.minutes);
  // // const secondsSince = Math.floor(diff.seconds);
  // const receivedDate = DateTime.fromISO(data?.message[0]?.receiveTime);
  // const now = DateTime.now().toUTC();
  // const diff = now.diff(receivedDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

  // // Format the difference as a human-readable string
  // let timeAgo = '';
  // if (diff.years) {
  //   timeAgo = `${diff.years} year${diff.years > 1 ? 's' : ''}`;
  // } else if (diff.months) {
  //   timeAgo = `${diff.months} month${diff.months > 1 ? 's' : ''}`;
  // } else if (diff.days) {
  //   timeAgo = `${diff.days} day${diff.days > 1 ? 's' : ''}`;
  // } else if (diff.hours) {
  //   timeAgo = `${diff.hours} hour${diff.hours > 1 ? 's' : ''}`;
  // } else if (diff.minutes) {
  //   timeAgo = `${diff.minutes} minute${diff.minutes > 1 ? 's' : ''}`;
  // } else {
  //   timeAgo = `${diff.seconds} second${diff.seconds > 1 ? 's' : ''}`;
  // }

  return (
    <Box
      key={data ? data._id : ""}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        backgroundColor: "#585858",
      }}
      //border={"10px solid black"}
    >
      <Box
        sx={{
          flexGrow: 0.3,
          minHeight: "100%",
          maxHeight: "100%",
          backgroundColor: "background.paper",
          marginBottom: 1,
        }}
        // borderBottom={"1px solid gray"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Box
          sx={{
            display: "flex",
            p: 1,
            borderRadius: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          width={"100%"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}>
            <ListItem alignItems="flex-start">
              {/* profile pic */}

              <ListItemAvatar sx={{ height: "26px" }}>
                <Avatar alt="Remy Sharp" src="" />
              </ListItemAvatar>

              {/* contactFrom */}

              <ListItemText
                sx={{ fontWeight: "500" }}
                primary={
                  //   data !== undefined && data.message[0] !== undefined
                  //     ? data.message[0].contact.name ??
                  //     data.message[0].contact.from
                  //     : "Loading"

                  <Typography> jhone@gmail.com</Typography>
                }
                // email time set

                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.gray"
                      fontSize={"13px"}>
                      {/* {timeAgo} ago */}
                      9.40AM
                    </Typography>
                  </>
                }
              />
            </ListItem>

            {/* <Typography variant="h5" gutterBottom mb={3} color="text.primary">
            {data !== undefined && data.message[0] !== undefined
              ? data.message[0].contact.name ?? data.message[0].contact.from
              : "Loading"}
          </Typography> */}
          </Box>
          <hr />
          {/* secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="#000000"
                    fontSize={"13px"}
                  >
                   Pls Approve this design its tou...
                  </Typography>
                </React.Fragment>
              } */}

          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          {/* ////////////////////////////////////////////////////////////////////////////////// */}
          {pinnedChats === "Chat Pinned" ? (
            <IconButton sx={{ mt: 2 }} onClick={handleClickPinned}>
              <TbPinnedFilled />
            </IconButton>
          ) : (
            ""
          )}

          <IconButton
            aria-label="refresh"
            sx={{ mt: 2 }}
            onClick={handleRefesh}>
            <RefreshIcon />
          </IconButton>
          {/* ///////////////////////// */}
          {/* <IconButton aria-label="menu" sx={{ mt: 2 }}>
            <MoreVertIcon />
          </IconButton> */}
          <MoreModel />
          {/* ///////////////////////// */}
        </Box>
      </Box>
      {/* Email Body  */}
      <Box
        sx={{
          borderTop: "1px solid gray",
          paddingTop: "10px",
          flexGrow: 8,
          backgroundColor: "background.paper",
          minHeight: showBottomSheet ? "55vh" : "60vh",
          maxHeight: showBottomSheet ? "55vh" : "60vh",
          overflowY: "auto",
        }}>
        {data
          ? data.message !== undefined
            ? data.message.map((e: any, index: number) => {
                console.log("data", e.recievingMedium);
                // console.log('data?', e)
                // console.log('data.....', data.message);
                const isOwn: boolean =
                  e.recievingMedium === "whatsapp"
                    ? false
                    : e.recievingMedium === "messenger"
                    ? getCookieValue("facebookname") ===
                      data.message[index].contact.name
                    : e.recievingMedium === "instagram"
                    ? false
                    : e.recievingMedium === "gmail"
                    ? getCookieValue("gmailname") ===
                      (Array.isArray(
                        data.message[index].contact.from
                          .toString()
                          .match(/<(.*?)>/),
                      )
                        ? data.message[index].contact.from
                            .toString()
                            .match(/<(.*?)>/)[1]
                            .toString()
                        : data.message[index].contact.from.toString())
                    : getCookieValue("outlookname") ===
                      data.message[index].contact.from;

                if (
                  e.recievingMedium === "whatsapp" ||
                  e.recievingMedium === "messenger"
                ) {
                  console.log("e", e);
                  return (
                    <Message
                      key={index}
                      message={e.media.message ?? null}
                      own={isOwn}
                      image={e.media.image}
                      video={e.media.video}
                      document={e.media.document}
                    />
                  );
                } else if (e.recievingMedium === "outlook") {
                  console.log("e2", e);
                  return (
                    <EmailMessge
                      key={index}
                      message={
                        e.media.emailMsg ? e.media.emailMsg : e.media.message
                      }
                      own={isOwn}
                      image={null}
                      video={null}
                      document={null}
                    />
                  );
                } else if (e.recievingMedium === "gmail") {
                  return (
                    <EmailMessge
                      key={index}
                      message={
                        e.media.emailMsg ? e.media.emailMsg : e.media.message
                      }
                      own={isOwn}
                      image={null}
                      video={null}
                      document={null}
                    />
                  );
                } else {
                  console.log("e3", e);
                  return (
                    <EmailMessge
                      key={index}
                      message={e.media.emailMsg}
                      own={isOwn}
                      image={null}
                      video={null}
                      document={null}
                    />
                  );
                }
              })
            : msgData.recievingMedium === "gmail"
            ? getCookieValue("gmailname") ===
              (Array.isArray(data.contact.from.toString().match(/<(.*?)>/))
                ? data.contact.from
                    .toString()
                    .match(/<(.*?)>/)[1]
                    .toString()
                : data.contact.from.toString())
            : null
          : ""}
        {msgData
          ? msgData.map((innerArray: any, index: any) => (
              <div key={index}>
                {innerArray &&
                  innerArray.map((e: any, innerIndex: any) => (
                    <ChatWidget key={innerIndex} data={e} reply={reply} />
                  ))}
              </div>
            ))
          : null}
        :
        {Chatdata
          ? Chatdata.data
            ? (() => {
                const emailData = Chatdata.data;

                const emailId = emailData.id;
                const emailFrom = emailData.payload.headers.find(
                  (header: { name: string }) => header.name === "From",
                ).value;
                const emailTo = emailData.payload.headers.find(
                  (header: { name: string }) => header.name === "To",
                ).value;
                const emailDate = emailData.payload.headers.find(
                  (header: { name: string }) => header.name === "Date",
                ).value;
                const body = emailData.snippet;
                const subject = emailData.payload.headers.find(
                  (header: { name: string }) => header.name === "Subject",
                ).value;

                const message = {
                  emailFrom,
                  emailTo,
                  emailDate,
                  subject,
                  body,
                };
                // console.log("message", emailData);
                // console.log("emailFrom", emailFrom);
                // console.log("emailTo", emailTo);
                // console.log("emailDate", emailDate);
                // console.log("Subject", subject);
                // console.log("body", body);

                return (
                  <EmailMessge
                    key={emailId}
                    message={message}
                    own={null}
                    image={null}
                    video={null}
                    document={null}
                  />
                );
              })()
            : null
          : null}
        :
        {gmailConversations
          ? (() => {
              const emailData = gmailConversations;

              const emailId = emailData._id;
              const emailFrom = emailData.message[0].contact.from;
              const emailTo = emailData.message[0].contact.to;
              const emailDate = emailData.message[0].receiveTime;

              const body = emailData.message[0].media.emailMsg.body;
              const subject = emailData.message[0].media.emailMsg.subject;

              const message = {
                emailFrom,
                emailTo,
                emailDate,
                subject,
                body,
              };
              // console.log('message', emailData)
              // console.log('emailFrom', emailFrom);
              // console.log('emailTo', emailTo);
              // console.log('emailDate', emailDate);
              // console.log('Subject', subject);
              //  console.log('body', body);

              return (
                <EmailMessge
                  key={emailId}
                  message={message}
                  own={null}
                  image={null}
                  video={null}
                  document={null}
                />
              );
            })()
          : null}
        :
        <div>
          {groupedChatData && (
            <ChatWidget
              data={groupedChatData.chats}
              reply={reply}
              groupName={groupedChatData.groupName}
            />
          )}
        </div>
        {/* : */}
        {/* {Chatdata && (
          // <ChatWidget
            messanger={Chatdata.map((item: any) => ({
              media: item.media,
              contact: item.contact,
              medium: item.recievingMedium,
            }))}
          />
        )} */}
      </Box>

      {/* <Box
        sx={{
          // flexGrow: 0.3,
          minHeight: 40,
          maxHeight: 40,
          backgroundColor: "background.paper",
          display: showBottomSheet ? "flex" : "none",
          // marginBottom: 1,
        }}
      >
        <Typography variant="subtitle2" gutterBottom color="text.primary">
          to:{" "}
          {data !== undefined && data.recievingMedium === "gmail"
            ? Array.isArray(
                data.message[0].contact.from.toString().match(/<(.*?)>/)
              )
              ? data.message[0].contact.from.toString().match(/<(.*?)>/)[1]
              : data.message[0].contact.from.toString().match(/<(.*?)>/)
            : data.message[0].contact.from.toString()}{" "}
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="text.primary">
          subject:{" "}
          {data !== undefined && data.message[0].media.emailMsg.subject}
        </Typography>
      </Box> */}

      <Box mt={2}>
        {Chatdata ? (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              // mt: 2,
              display: "flex",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#F4F5F7",
              // border : "1px solid black",
              // marginRight : "20px"
            }}>
            <InputLabel
              htmlFor="file-input"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <AttachFileIcon sx={{ cursor: "pointer", color: "#90A0B7" }} />
            </InputLabel>
            <Input
              id="file-input"
              type="file"
              sx={{ display: "none" }}
              inputProps={{ multiple: true }}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const file: File = (target.files as FileList)[0];
                // console.log(file);

                setMedia(file);
              }}
            />

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Message Messanger"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
            />
            <IconButton
              type="submit"
              sx={{
                p: "10px",
                color: "#007EF2",
                position: "relative",
                zIndex: 1,
              }}
              aria-label="search"
              onClick={(e) => {
                e.preventDefault();
                console.log("Sending message");
                // handleSubmit("messenger")(e);
                if (Chatdata.recievingMedium === "outlook") {
                  handleSubmit("outlook")(e);
                } else if (Chatdata.recievingMedium === "gmail") {
                  handleSubmit("gmail")(e);
                } else {
                  sendMessengerMessage();
                }
              }}>
              <SendIcon />
            </IconButton>
            {/* <IconButton
            size="small"
            onClick={() => {
              setshowBottomSheet(!showBottomSheet);
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton> */}
          </Paper>
        ) : msgData && msgData.length > 0 ? (
          <Paper
            sx={{
              p: "2px 4px",
              // mt: 2,
              display: "flex",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#F4F5F7",
            }}>
            <InputLabel
              htmlFor="file-input"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <AttachFileIcon sx={{ cursor: "pointer", color: "#90A0B7" }} />
            </InputLabel>
            <Input
              id="file-input"
              type="file"
              sx={{ display: "none" }}
              // inputProps={{ multiple: true }}
              // onChange={(e) => {
              //   const target = e.target as HTMLInputElement;
              //   const file: File = (target.files as FileList)[0];
              //   // console.log(file);

              //   setMedia(file);
              // }}
            />

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="konsa"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
            />
            <IconButton
              type="submit"
              sx={{
                p: "10px",
                color: "#007EF2",
                position: "relative",
                zIndex: 1,
              }}
              aria-label="search"
              // onClick={handleSubmit(recievingMediumCheck)}
            >
              <div
                onClick={() => {
                  console.log("Sending  message");
                  sendReply();
                }}>
                <SendIcon />
              </div>
            </IconButton>
            {/* <IconButton
                size="small"
                onClick={() => {
                  setshowBottomSheet(!showBottomSheet);
                }}
              >
                <KeyboardArrowDownIcon />
              </IconButton> */}
          </Paper>
        ) : (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              // mt: 2,
              display: "flex",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#F4F5F7",
              // border : "1px solid black",
              // marginRight : "20px"
            }}>
            <InputLabel
              htmlFor="file-input"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <AttachFileIcon sx={{ cursor: "pointer", color: "#90A0B7" }} />
            </InputLabel>
            <Input
              id="file-input"
              type="file"
              sx={{ display: "none" }}
              inputProps={{ multiple: true }}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const file: File = (target.files as FileList)[0];
                // console.log(file);

                setMedia(file);
              }}
            />

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Message"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
            />
            <IconButton
              type="submit"
              sx={{
                p: "10px",
                color: "#007EF2",
                position: "relative",
                zIndex: 1,
              }}
              aria-label="search"
              onClick={handleSubmit(recievingMediumCheck)}>
              <SendIcon />
            </IconButton>
            {/* <IconButton
          size="small"
          onClick={() => {
            setshowBottomSheet(!showBottomSheet);
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton> */}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ChatScreen;

import {
  Avatar,
  Badge,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import ChatLabel from "./ChatLabel";
import FacebookIcon from "../../assets/Images/facebook.svg";
import GmailIcon from "../../assets/Images/gmail.svg";
import InstagramIcon from "../../assets/Images/instagram.svg";
import OutlookIcon from "../../assets/Images/outlook.svg";
import WhatsappIcon from "../../assets/Images/whatsapp.svg";

const ChatListBody = ({ e }: any) => {
  console.log("e", e._id);

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const ChatSourceColorIcon = {
    whatsapp: { color: "#25D366" },
    instagram: { color: "#C13584" },
    outlook: { color: "#007EF2" },
    gmail: { color: "#EA4335" },
    facebook: { color: "#4267B2" },
    chatWidet: { color: "4267v5" },
  };
  return (
    <>
      <ListItem
        key={e.id}
        alignItems="center"
        sx={{
          backgroundColor: e.isRead ? "" : "background.default",
          position: "relative",
          minHeight: "75px",
          // '&::before' : {
          //   content : '"20"',
          //   position : "absolute",
          //   minWidth : "15px",
          //   minHeight : "15px",
          //   padding : "5px",
          //   borderRadius : "9px",
          //   bottom : "6px",
          //   right : "20px",
          //   fontSize : "10px",
          //   backgroundColor : "#90EE90"
          // },
        }}>
        <ListItemAvatar>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <SmallAvatar
                alt="Chat Source Icon"
                src={
                  e.recievingMedium === "whatsapp"
                    ? WhatsappIcon
                    : e.recievingMedium === "gmail"
                    ? GmailIcon
                    : e.recievingMedium === "outlook"
                    ? OutlookIcon
                    : e.recievingMedium === "messenger"
                    ? FacebookIcon
                    : InstagramIcon
                }
              />
            }>
            <Avatar
              alt="Avatar"
              sx={{
                bgcolor: "background.default",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor:
                  e.recievingMedium === "whatsapp"
                    ? ChatSourceColorIcon.whatsapp
                    : e.recievingMedium === "gmail"
                    ? ChatSourceColorIcon.gmail
                    : e.recievingMedium === "outlook"
                    ? ChatSourceColorIcon.outlook
                    : e.recievingMedium === "messenger"
                    ? ChatSourceColorIcon.facebook
                    : ChatSourceColorIcon.instagram,
              }}>
              {/* {e.message[0] !== undefined
    ? e.message[0].contact.name === undefined
      ? e.message[0].contact.from && e.message[0].contact.from.charAt(0).toUpperCase()
      : e.message[0].contact.name && e.message[0].contact.name.charAt(0).toUpperCase()
    : ""} */}
            </Avatar>
          </Badge>
        </ListItemAvatar>

        <ListItemText
          // primary={
          //   // (e.question[0] !== undefined &&
          //   //   e.question[e.question.length - 1].media.message) ??
          //   // e.message[e.message.length - 1].media.emailMsg.subject.length > 20
          //   //   ? `${
          //   //       e.message[e.message.length - 1].media.emailMsg.subject
          //   //     }`.substring(0, 20) + "...."
          //   //   : e.message[e.message.length - 1].media.emailMsg.subject
          // }
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="#5A5A5A"
                marginTop={13}>
                {/* {(e.message[0] !== undefined && e.message[0].contact.name) ??
                e.message[0].contact.from.length > 23
                  ? `${e.message[0].contact.from}`.substring(0, 23) + "...."
                  : e.message[0].contact.from}
                .substring(0, 23)+"...." */}

                {e[0] && e[0].recievingMedium === "messenger"
                  ? e[0].contact.from === "112931618341263"
                    ? e[0].contact.to[0].name
                    : e[0].contact.name
                  : e.email
                  ? e.email
                  : e.recievingMedium === "outlook"
                  ? e.message[0].contact.from
                  : e.recievingMedium === "gmail"
                  ? e.message[0].contact.from
                  : e}
              </Typography>
              {/* {e.message[e.message.length - 1].media.message ??
                          "media"} */}
            </>
          }
        />
        {/* {e.name ? (
          <>
            
            <ChatLabel
              convId={e.name}
              convLabel={e.email}
              userSpecificId={e.question}
            />
          </>
        ) : 
        e.recievingMedium === "gmail" ? (
          (() => {
            // const contactFrom = e.message[0].contact.from;
            // console.log('contactFrom',contactFrom)
            return <ChatLabel convLabel={"email"} />;
          })()
        ) : e[0].recievingMedium === "messenger" ? (
          <ChatLabel
            convLabel={
              e[0].contact.from === "112931618341263"
                ? e[0].contact.to[0].name
                : e[0].contact.name
            }
          />
        ) : (
          <ChatLabel convLabel={e} />
        )} */}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ChatListBody;

import {
  Avatar,
  Badge,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { taskAssign } from "../features/userTaskSlice";
import { me } from "../features/meDetailsSlice";
import RefreshIcon from "@mui/icons-material/Refresh";

const TaskCard = ({ e }: any) => {
  const [selfTask, setselfTask] = useState(false);
  const [isTaskAssign, setisTaskAssign] = useState(false);
  const [showList, setshowList] = useState(false);
  const { user } = useSelector((state: any) => state.me);
  // const user = JSON.parse(localStorage.getItem("user") ?? "");
  const dispatch = useDispatch<any>();

  const ChatSourceColorIcon = {
    whatsapp: { color: "#25D366" },
    instagram: { color: "#C13584" },
    outlook: { color: "#007EF2" },
    gmail: { color: "#BB001B" },
  };

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const handleRoleRefresh = () => {
    dispatch(me({}));
  };

  const handleTaskAssign = (userId: any) => async (event: any) => {
    event.preventDefault();

    const msgId = e.message[0].conversationsId;

    dispatch(taskAssign({ msgId, userId })).then(
      (onResolved: any) => {
        setisTaskAssign(true);
        console.log(onResolved);
      },
      (onRejected: any) => {
        // console.log("reje");
      }
    );
    dispatch(me({})).then(
      (onResolved: any) => {
        setisTaskAssign(true);
        // console.log("done");
      },
      (onRejected: any) => {
        // console.log("reje");
      }
    );
  };

  const staffList: [] =
    // user !== undefined
    //   ? user.staff ?? user.createdby.staff
    //   :
    JSON.parse(localStorage.getItem("user") ?? "").user.staff ??
    JSON.parse(localStorage.getItem("user") ?? "").user.createdby.staff;

  return (
    <>
      <Card
        key={e._id}
        sx={{
          maxWidth: 400,
          marginBottom: 2,
          borderLeftStyle: "solid",
          marginRight: 2,
          display: isTaskAssign ? "none" : "block",
          borderLeftWidth: "5px",
          borderLeftColor:
            e.recievingMedium === "whatsapp"
              ? ChatSourceColorIcon.whatsapp
              : e.recievingMedium === "gmail"
              ? ChatSourceColorIcon.gmail
              : e.recievingMedium === "outlook"
              ? ChatSourceColorIcon.outlook
              : ChatSourceColorIcon.instagram,
        }}
      >
        <CardHeader
          avatar={
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<SmallAvatar alt="Chat Source Icon" src="" />}
            >
              <Avatar
                alt="Avatar"
                sx={{
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor:
                    e.recievingMedium === "whatsapp"
                      ? ChatSourceColorIcon.whatsapp
                      : e.recievingMedium === "gmail"
                      ? ChatSourceColorIcon.gmail
                      : e.recievingMedium === "outlook"
                      ? ChatSourceColorIcon.outlook
                      : ChatSourceColorIcon.instagram,
                }}
              >
                {e.message[0].contact.name === undefined
                  ? e.message[0].contact.from.charAt(0).toUpperCase()
                  : e.message[0].contact.name.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                setshowList(!showList);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          // title={e.message[0].contact.name ?? e.message[0].contact.from}
          subheader={e.message[0].receiveTime}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {e.message[0].media?.emailMsg?.subject}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleTaskAssign(JSON.parse(user).user._id)}
          >
            <FavoriteIcon sx={{ color: selfTask ? "red" : "grey" }} />
          </IconButton>

          <Chip
            label={e.users[0].username}
            sx={{
              color:
                e.recievingMedium === "whatsapp"
                  ? ChatSourceColorIcon.whatsapp
                  : e.recievingMedium === "gmail"
                  ? ChatSourceColorIcon.gmail
                  : e.recievingMedium === "outlook"
                  ? ChatSourceColorIcon.outlook
                  : ChatSourceColorIcon.instagram,
            }}
          />

          {/* <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton> */}
        </CardActions>
        <List
          key={e._id}
          sx={{
            width: "100%",
            // maxWidth: 360,
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
            display: showList ? "block" : "none",
          }}
          subheader={<li />}
        >
          <ListSubheader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {`Assign task to`}
            <IconButton
              aria-label="add to shopping cart"
              onClick={handleRoleRefresh}
            >
              <RefreshIcon />
            </IconButton>
          </ListSubheader>

          {staffList.map((sectionId: any, index: number) => (
            <li key={index}>
              <ul>
                <ListItem
                  key={sectionId.username}
                  sx={{
                    cursor: "pointer",
                    border: "2px solid ",
                    bgcolor: "primary.main",
                    borderColor: "text.primary",
                    borderRadius: 1,
                    marginBottom: 1,
                  }}
                  onClick={handleTaskAssign(sectionId._id)}
                >
                  <ListItemText primary={sectionId.username} />
                </ListItem>
              </ul>
            </li>
          ))}
        </List>
      </Card>
    </>
  );
};

export default TaskCard;

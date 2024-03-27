import {
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  NativeSelect,
} from "@mui/material";
import React, { useState } from "react";
import TaskModel from "./TaskModel";
import { me } from "../../features/meDetailsSlice";
import { taskAssign } from "../../features/userTaskSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import notification from "../../Toast";

export default function TaskCards({ e }: any) {
  const dispatch = useDispatch<any>();
  const [isTaskAssign, setisTaskAssign] = useState<boolean>(false);
  // const { user } = useSelector((state: any) => state.me);
  let date: string | Date = new Date(e.message[0].receiveTime);
  date = `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`;

  const ChatSourceColorIcon = {
    whatsapp: { color: "#25D366" },
    instagram: { color: "#C13584" },
    outlook: { color: "#007EF2" },
    gmail: { color: "#BB001B" },
  };

  const staffList: [] =
    JSON.parse(localStorage.getItem("user") ?? "").user.staff ??
    JSON.parse(localStorage.getItem("user") ?? "").user.createdby.staff;

  ///////////////////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTaskAssign = (userId: any) => async (event: any) => {
    event.preventDefault();
    const msgId = e.message[0].conversationsId;

    dispatch(taskAssign({ msgId, userId })).then(
      (onResolved: any) => {
        setisTaskAssign(true);
        if (onResolved.payload.success) {
          notification("success", onResolved.payload.message);
        }
        handleClose();
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

  //////////////////////////////////////////

  return (
    <>
      <Box
        minHeight={"200px"}
        mb={"20px"}
        bgcolor={"white"}
        p={"15px 20px"}
        borderRadius={"4px"}
        sx={{
          position: "relative",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          "&::before": {
            content: '""',

            position: "absolute",
            top: 0,
            left: 0,
            width: "5px",
            height: "100%",
            background:
              e.recievingMedium === "whatsapp"
                ? ChatSourceColorIcon.whatsapp.color
                : e.recievingMedium === "gmail"
                ? ChatSourceColorIcon.gmail.color
                : e.recievingMedium === "outlook"
                ? ChatSourceColorIcon.outlook.color
                : ChatSourceColorIcon.instagram.color,
          },
        }}
      >
        {/* // Image and Name */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"15px"}
          mb={"15px"}
        >
          <Avatar alt="Remy Sharp" src="" />
          <Typography color={"#3E4D60"} fontSize={"15px"} fontWeight={"600"}>
            {e.message[0].contact.name ?? e.message[0].contact.from}
          </Typography>
        </Box>
        {/* // Image and Name */}
        <Box mb={"15px"}>
          <Typography color={"#3E4D60"} fontWeight={"600"}>
            {e.recievingMedium}
          </Typography>
        </Box>
        {/* // Para Start */}
        <Box mb={"15px"} minHeight={"120px"}>
          <Typography color={"#3E4D60"} fontSize={"14px"}>
            {(e.message[0] !== undefined &&
              e.message[e.message.length - 1].media.message) ??
              e.message[e.message.length - 1].media.emailMsg.subject
              }
          </Typography>
        </Box>
        {/* // Para End */}
        {/* <Box mb={"5px"}>
          <Typography
            color={"#000000"}
            fontWeight={"600"}
            component={"span"}
            fontSize={"11px"}
          >
            Assigned to
          </Typography>
        </Box> */}
        {/* // assign user start */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={"8px"}
          >
            <Avatar alt="Remy Sharp" src="" sx={{ width: 26, height: 26 }} />
            <Box>
              <Typography color={"#3E4D60"} fontSize={"13px"}>
                Assigned Staff
              </Typography>
              {/* <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10} selected>{e.users[0].username}</option>
              </NativeSelect> */}
            </Box>
            {/* <Typography color={"#3E4D60"} fontSize={"13px"}>
              Anil Chaugule
            </Typography> */}
            <IconButton aria-label="menu" onClick={handleClick}>
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              {staffList?.map((ele: any) => {
                return (
                  <MenuItem onClick={handleTaskAssign(ele._id)}>
                    {ele.username}
                  </MenuItem>
                );
              })}
            </Menu>
            {/* ///////////////// */}
          </Box>
          <Box>
            <Typography color={"#3E4D60"} fontSize={"12px"} fontWeight={"500"}>
              {date}
            </Typography>
          </Box>
        </Box>
        {/* // assign user end */}
      </Box>
    </>
  );
}

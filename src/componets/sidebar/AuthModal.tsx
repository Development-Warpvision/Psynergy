import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect,useRef } from "react";
import { io, Socket } from 'socket.io-client';

export default function AuthModal() {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = ()=>{
    localStorage.removeItem("user")
    window.location.reload()
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="menu"
        sx={{
          width: "14px",
          fontSize: "5px",
          height: "14px",
          // backgroundColor: "#1976D2",
          color: "white",
        }}
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      {/* <Box aria-label="menu" sx={{ border: "1px solid red" }} onClick={handleClick}>
        <MoreVertIcon />
      </Box> */}
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
        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{
              width: "14px",
              fontSize: "5px",
              height: "14px",
              backgroundColor: "white",
              color: "#1976D2",
            }}
            onClick={handleClick}
          >
            <PersonIcon />
          </IconButton>
          <Typography fontWeight={"600"}>My Profile</Typography>
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{
              width: "14px",
              fontSize: "5px",
              height: "14px",
              backgroundColor: "white",
              color: "#1976D2",
            }}
            onClick={handleClick}
          >
            <MessageIcon />
          </IconButton>
          <Typography fontWeight={"600"}>Messages</Typography>
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{
              width: "14px",
              fontSize: "5px",
              height: "14px",
              backgroundColor: "white",
              color: "#1976D2",
            }}
            onClick={handleClick}
          >
            <CalendarTodayIcon />
          </IconButton>
          <Typography fontWeight={"600"}>Activity</Typography>
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{
              width: "14px",
              fontSize: "5px",
              height: "14px",
              backgroundColor: "white",
              color: "#1976D2",
            }}
            onClick={handleClick}
          >
            <HelpIcon />
          </IconButton>
          <Typography fontWeight={"600"}>FAQ</Typography>
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <IconButton
            aria-label="menu"
            sx={{
              width: "14px",
              fontSize: "5px",
              height: "14px",
              backgroundColor: "white",
              color: "#1976D2",
            }}
            onClick={handleClick1}
          >
            <LogoutIcon />
          </IconButton>
          <Typography fontWeight={"600"}  onClick={handleClick1}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function MoreModel() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const staffList: [] =
    // user !== undefined
    //   ? user.staff ?? user.createdby.staff
    //   :
    JSON.parse(localStorage.getItem("user") ?? "").user.staff ??
    JSON.parse(localStorage.getItem("user") ?? "").user.createdby.staff;
  return (
    <>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <IconButton aria-label="menu" sx={{ mt: 2 }} onClick={handleClick}>
        <MoreVertIcon />
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
        <MenuItem onClick={handleClose}>Resolved</MenuItem>
        <MenuItem onClick={handleClose}>Add on agent</MenuItem>
        <MenuItem onClick={handleClose}>E-mail Transcript</MenuItem>
        <MenuItem onClick={handleClose}>Leave Convo</MenuItem>
        <MenuItem onClick={handleClose}>Pinned Chats</MenuItem>

      </Menu>
    </>
  );
}

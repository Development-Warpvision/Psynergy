import * as React from "react";
import { useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailIcon from "@mui/icons-material/Mail";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LabelIcon from "@mui/icons-material/Label";
import HubIcon from "@mui/icons-material/Hub";
import Chatui from "./chat/ChatUi";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationPage from "./NotificationPage";
import MediumLogin from "../componets/auth/MediumLogin";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import TaskAssign from "./TaskAssign";
import SettingsIcon from "@mui/icons-material/Settings";
import StaffManage from "./StaffManage";
import LabelsManage from "./LablesManage";
import { socket } from "../App";
import { checkUser, me } from "../features/meDetailsSlice";
import { useDispatch } from "react-redux";
import InputBase from "@mui/material/InputBase";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Switch } from "@mui/material";
import AuthModal from "../componets/sidebar/AuthModal";
import Diversity3Icon from "@mui/icons-material/Diversity3";
const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "20px",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  // const { user } = useSelector((state: any) => state.me);
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState("Chat");
  const [useronline, setUserOnline] = React.useState(false);
  const [useravailable, setUserAvailable] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    checkUserLogin();
  }, []);

  const username =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") ?? "").user.username;

  // const useronline =   localStorage.getItem("user") &&
  // JSON.parse(localStorage.getItem("user") ?? "").user?.online;

  // const useravailable =   localStorage.getItem("user") &&
  // JSON.parse(localStorage.getItem("user") ?? "").user?.available || false;

  // console.log(useravailable, useronline)

  React.useEffect(() => {
    const userID =
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user") ?? "").user.email;

    socket.emit("addUser", "bhosaleamol@kbtcoe.org");
  }, [dispatch, username]);

  const checkUserLogin = () => {
    dispatch(checkUser({})).then((onResolved: any) => {
      console.log("hjjd", onResolved.payload);

      if (onResolved.payload === "error") {
        navigate("/login");
      }

      setUserOnline(onResolved?.payload?.online);
      setUserAvailable(onResolved?.payload?.available);
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
        sx={{
          background: "rgba(50, 49, 49, 0.50)",
          maxHeight: 100,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Box sx={{ height: "60px", maxWidth: "300px" }}>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "#fff",
                marginRight: 5,
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {/* <Box sx={{ maxHeight: 60 }}>
              <img height={60} width={100} src={logo} alt="ConvoPortal logo" />
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              color="text.primary"
            >
              Welcome {username ? username.toUpperCase() : ""}
            </Typography> */}
          </Toolbar>
        </Box>
        <Box
          mr={"80px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={"10px"}>
          <Box sx={{ maxHeight: 60 }}>
            <img height={20} width={40} src="flag.png" alt="ConvoPortal logo" />
          </Box>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </MenuItem>
          <Avatar
            alt="Remy Sharp"
            src="Ellipse.png"
            sx={{ width: 32, height: 32 }}
          />
          <Typography sx={{ fontSize: "22px" }} color="#ffffff">
            {username ? username.toUpperCase() : ""}
            {/* {username} */}
          </Typography>
          <AuthModal />
        </Box>
      </AppBar>

      <Drawer
        // elevation={0}
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            background:
              "linear-gradient(180deg, rgba(62, 62, 62, 0.81) -17.4%, #2C2C2C 49.19%, #434343 131.69%)",
            border: "none",
            width: "190px",
          },
        }}>
        <DrawerHeader>
          <Box
            sx={{
              display: "flex",
              width: "190px",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}>
            <Box sx={{ maxHeight: 60 }}>
              <img src="logo.png" alt="ConvoPortal logo" />
            </Box>
            <Typography
              variant="h6"
              component="h6"
              textAlign={"center"}
              color={"#fff"}
              fontSize={"15px"}>
              CONVO PORTAL
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <Box className="link-decoration">
            <NavLink to="/dashboard">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  color: "#fff",
                  //   backgroundColor: menu === "Dashboard" ? "#007ef2" : "",
                  //   color: menu === "Dashboard" ? "white" : "",
                  //   borderTopRightRadius: menu === "Dashboard" ? 8 : 0,
                  //   borderBottomRightRadius: menu === "Dashboard" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("Dashboard");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>
          <Box className="link-decoration">
            <NavLink to="/chat">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  //   backgroundColor: menu === "Chat" ? "#007ef2" : "",
                  //   color: menu === "Chat" ? "white" : "",
                  //   borderTopRightRadius: menu === "Chat" ? 8 : 0,
                  //   borderBottomRightRadius: menu === "Chat" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("Chat");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Chats"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>

          <Box className="link-decoration">
            <NavLink to="/notification">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  //   backgroundColor: menu === "Notification" ? "#007ef2" : "",
                  //   color: menu === "Notification" ? "white" : "",
                  //   borderTopRightRadius: menu === "Notification" ? 8 : 0,
                  //   borderBottomRightRadius: menu === "Notification" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("Notification");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <NotificationsNoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Notification"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>

          <Divider />

          <Box className="link-decoration">
            <NavLink to="/auth">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  color: "#fff",
                  //   backgroundColor: menu === "Auth" ? "#007ef2" : "",
                  //   color: menu === "Auth" ? "white" : "",
                  //   borderTopRightRadius: menu === "Auth" ? 8 : 0,
                  //   borderBottomRightRadius: menu === "Auth" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("Auth");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <HubIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Auth"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>

          <Box className="link-decoration">
            <NavLink to="/taskAssign">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  color: "#fff",
                  //   backgroundColor: menu === "TaskAssign" ? "#007ef2" : "",
                  //   color: menu === "TaskAssign" ? "white" : "",
                  //   borderTopRightRadius: menu === "TaskAssign" ? 8 : 0,
                  //   borderBottomRightRadius: menu === "TaskAssign" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("TaskAssign");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Task Assign"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>
          <Box className="link-decoration">
            <NavLink to="/setting">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  color: "#fff",
                  //   backgroundColor: menu === "TaskAssign" ? "#007ef2" : "",
                  //   color: menu === "TaskAssign" ? "white" : "",
                  //   borderTopRightRadius: menu === "TaskAssign" ? 8 : 0,
                  //   borderBottomRightRadius: menu === "TaskAssign" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("Setting");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Setting"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>
          <Box className="link-decoration">
            <NavLink to="/userAuthentication">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  color: "#fff",
                  //   backgroundColor: menu === "UserAuthentication" ? "#007ef2" : "",
                  //   color: menu === "UserAuthentication" ? "white" : "",
                  //   borderTopRightRadius: menu === "UserAuthentication" ? 8 : 0,
                  //   borderBottomRightRadius: menu === "UserAuthentication" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("UserAuthentication");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"User Authentication"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>

          <Box className="link-decoration">
            <NavLink to="/labelManage">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  color: "#fff",
                  // backgroundColor: menu === "LabelManage" ? "#007ef2" : "",
                  // color: menu === "LabelManage" ? "white" : "",
                  // borderTopRightRadius: menu === "LabelManage" ? 8 : 0,
                  // borderBottomRightRadius: menu === "LabelManage" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("LabelManage");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Label Manage"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>

          <Box className="link-decoration">
            <NavLink to="/teamChat">
              <ListItem
                disablePadding
                className="active-link"
                sx={{
                  display: "block",
                  color: "#fff",
                  // backgroundColor: menu === "LabelManage" ? "#007ef2" : "",
                  // color: menu === "LabelManage" ? "white" : "",
                  // borderTopRightRadius: menu === "LabelManage" ? 8 : 0,
                  // borderBottomRightRadius: menu === "LabelManage" ? 8 : 0,
                }}
                onClick={() => {
                  setMenu("TeamChat");
                }}>
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}>
                  <ListItemIcon
                    className="icon-link"
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}>
                    <Diversity3Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Team Chat"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </Box>

          {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0px 25px", marginTop: "20px" }}>
            <ListItem
              disablePadding
              className="active-link" */}
          {/* sx={{ 
              //   display: "block",
              //   // backgroundColor: menu === "LabelManage" ? "#007ef2" : "",
              //   // color: menu === "LabelManage" ? "white" : "",
              //   // borderTopRightRadius: menu === "LabelManage" ? 8 : 0,
              //   // borderBottomRightRadius: menu === "LabelManage" ? 8 : 0,
              
            //   sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
            //   onClick={() => {
            //     setMenu("LabelManage");
            //   }}
            // >
              {/* <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                > */}
          {/* {
                useronline ? <Box width={"15px"} height={"15px"} borderRadius={"50%"} sx={{ backgroundColor: "green" }}></Box> : <Box width={"15px"} height={"15px"} borderRadius={"50%"} sx={{ backgroundColor: "gray" }}></Box>
              } */}

          {/* </ListItemButton> */}
          {/* {open ? <Switch checked={useravailable ? true : false} /> : null}
            </ListItem> */}
          {/* <ListItemText
                    primary={"Label Manage"}
                    sx={{ opacity: open ? 1 : 0 }}
                  /> */}
          {/* </Box> */}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          pl: 4,
          pr: 4,
          pb: 7,
          background: "#222",
          // backgroundColor:
          //   menu === "Chat" ? "background.default" : "background.paper",
          minHeight: "100vh",
        }}>
        <Outlet />
        {/* {menu === "Dashboard" && <Dashboard />}
        {menu === "Chat" && <Chatui />}
        {menu === "Notification" && <NotificationPage />}
        {menu === "Auth" && <MediumLogin />}
        {menu === "TaskAssign" && <TaskAssign />}
        {menu === "UserAuthentication" && <StaffManage />}
        {menu === "LabelManage" && <LabelsManage />} */}
      </Box>
    </Box>
  );
}

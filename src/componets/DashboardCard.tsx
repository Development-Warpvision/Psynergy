import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const DashboardCard = ({ mainTitle, chatData, mainIcon }: any) => {
  return (
    <>
    {/* // <div style={{ minWidth: "290px", maxWidth: "320px", height: "280px" }}> */}
      {/* {/* <Box
        sx={{
          width: "100%",
          height: 280,
          // backgroundColor: "primary.light",
          borderRadius: "0.4rem",
          boxShadow: 1,
          py: 0.5,
          ":hover": {
            border: "2px solid",
            borderColor: "primary.light",
          },
          overflowY: "scroll",
        }}
        maxHeight={280}
        overflow={"clip"}
      > */}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Box sx={{ color: "#007EF2" }}>{mainIcon}</Box>{" "}
          <Typography
            variant="h5"
            fontSize={16}
            fontWeight={500}
            px={3}
            lineHeight={1.5}
            fontStyle={"medium"}
            alignItems={"center"}
            component="h2"
          >
            {mainTitle}
          </Typography>
        </Box>

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "200px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0px",
              visibility: "hidden",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }} */}
                 {/* <ListItem alignItems="flex-start" >
            <ListItemAvatar sx={{ height: "26px" }}>
              <Avatar alt="Remy Sharp" src="" />
            </ListItemAvatar>
            <ListItemText
              sx={{fontWeight : "500"}}
              primary="Brunch this weekend?"
              secondary={
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
              }
            />
            <Typography component={"span"} mt={"5px"}>12:48</Typography>
          </ListItem> */}
          {/* //////////////////////////////////////////////// */}
          {/* {chatData?.map((ele: any) => {
            return <RecentChatUsers key={ele._id} {...ele} />;
          })} */}

          {/* <ListItem alignItems="flex-start">
            <ListItemAvatar sx={{ height: "26px" }}>
              <Avatar alt="Remy Sharp" src="" />
            </ListItemAvatar>
            <ListItemText
              sx={{fontWeight : "500"}}
              primary="Brunch this weekend?"
              secondary={
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
              }
            />
            <Typography component={"span"} mt={"5px"}>12:48</Typography>
          </ListItem> */}

          {/* <Divider variant="inset" component="li" /> */}
          {/* <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem> */}
        {/* </List>
      </Box>
    </div> */}
    </>
  );
};

export default DashboardCard;

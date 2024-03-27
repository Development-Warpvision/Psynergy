import React, { useState } from "react";
import { Button, Box, Avatar, Typography, Input } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

export default function ChatBotUi() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 100 }}
      >
        <Button
          variant="contained"
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            fontSize: "30px",
            fontWeight: "bolder",
            color: "white",
            paddingBlock: "30px",
          }}
          onClick={() => setOpen(!open)}
        >
          <AiOutlinePlus />
        </Button>

        {open ? (
          <Box
            id="chatbotui"
            position={"fixed"}
            width={"400px"}
            height={"570px"}
            sx={{
              bottom: "50px",
              right: "100px",
              backgroundColor: "#007EF2",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <Box
              height={"100px"}
              p={"10px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"15px"}
            >
              <Box width={"90px"} height={"80px"} position={"relative"}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ position: "absolute", top: "0px", right: "25px" }}
                />
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ position: "absolute", bottom: "0px", right: "0px" }}
                />
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ position: "absolute", bottom: "0px", left: "0px" }}
                />
              </Box>
              <Box width={"200px"} height={"80px"}>
                <Typography
                  sx={{ color: "white", fontSize: "18px", marginBottom: "5px" }}
                >
                  Sales Team
                </Typography>
                <Typography sx={{ color: "white", fontSize: "13px" }}>
                  We usually reply within minutes
                </Typography>
              </Box>
              <Box height={"80px"} sx={{ cursor: "pointer" }}>
                <Box>
                  <BiDotsHorizontalRounded color="white" fontSize={"28px"} />
                </Box>
              </Box>
            </Box>
            {/* //////////////// Message Box Start */}
            <Box
              height={"400px"}
              p={"15px 10px"}
              sx={{ backgroundColor: "white", borderRadius: "8px 8px 0px 0px" }}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              gap={"10px"}
            >
              <Box
                border={"1px solid #007EF2"}
                sx={{ cursor: "pointer" }}
                borderRadius={"4px"}
                width={"100%"}
                p={"10px 30px"}
              >
                <Typography
                  sx={{
                    color: "#007EF2",
                    fontSize: "13px",
                    fontWeight: "bolder",
                  }}
                >
                  Ask a Question
                </Typography>
              </Box>
              <Box
                border={"1px solid #007EF2"}
                sx={{ cursor: "pointer" }}
                borderRadius={"4px"}
                width={"100%"}
                p={"10px 30px"}
              >
                <Typography
                  sx={{
                    color: "#007EF2",
                    fontSize: "13px",
                    fontWeight: "bolder",
                  }}
                >
                  Ask a Question
                </Typography>
              </Box>
              <Box
                border={"1px solid #007EF2"}
                sx={{ cursor: "pointer" }}
                borderRadius={"4px"}
                width={"100%"}
                p={"10px 30px"}
              >
                <Typography
                  sx={{
                    color: "#007EF2",
                    fontSize: "13px",
                    fontWeight: "bolder",
                  }}
                >
                  Ask a Question
                </Typography>
              </Box>
              <Box
                border={"1px solid #007EF2"}
                sx={{ cursor: "pointer" }}
                borderRadius={"4px"}
                width={"100%"}
                p={"10px 30px"}
              >
                <Typography
                  sx={{
                    color: "#007EF2",
                    fontSize: "13px",
                    fontWeight: "bolder",
                  }}
                >
                  Ask a Question
                </Typography>
              </Box>
            </Box>
            {/* //////////////// Message Box End */}
            <Box
              sx={{ backgroundColor: "white" }}
              height={"70px"}
              p={"0px 10px"}
          
            >
              
              <TextField
                label="Message"
                variant="outlined"
                 sx={{border : '#007EF2'}}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <SendIcon
                      style={{ cursor: "pointer", color : "#007EF2" }}
                      onClick={() => {
                        // Handle the send button click here
                        console.log("Send button clicked!");
                      }}
                    />
                  ),
                }}
              />
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

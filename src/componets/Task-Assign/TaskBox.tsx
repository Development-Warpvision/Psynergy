import React from "react";
import { Box, Typography } from "@mui/material";
import TaskCards from "./TaskCards";
export default function TaskBox() {
  return (
    <>
      <Box
        
        sx={{ backgroundColor: "#EEF0F7", p: 1.5, borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
      >
        {/* // Heading Container start */}
        <Box mb={"20px"}>
          <Typography
            variant="h6"
            component="h6"
            textAlign={"left"}
            color={"#838488"}
          >
            IN PROGRESS
          </Typography>
        </Box>
        {/* // Heading Container end */}
        {/* // Box Body start */}
        <Box
          maxHeight={"460px"}
          sx={{
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0px",
              visibility: "hidden",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }}
        >
          <TaskCards event={0}/>
          <TaskCards event={1}/>
          <TaskCards event={2}/>
          <TaskCards event={3}/>
        </Box>
        {/* // Box Body end */}
      </Box>
    </>
  );
}

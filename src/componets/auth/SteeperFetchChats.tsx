import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import {
  gmailChat,
  metaChat,
  outlookChat,
} from "../../features/get_messagesSlice";
import { Button } from "@mui/material";
import SteeperAllDone from "./SteeperAllDone";
import { useNavigate } from "react-router-dom";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const SteeperFetchChats = ({ successFetchCheckArr }: any) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [progress, setProgress] = React.useState(
    successFetchCheckArr.length !== 0 ? 0 : 100
  );

  if (successFetchCheckArr.length !== 0) {
    for (const key in successFetchCheckArr) {
      if (Object.prototype.hasOwnProperty.call(successFetchCheckArr, key)) {
        const element = successFetchCheckArr[key];
        switch (element) {
          case "gmail":
            dispatch(gmailChat({})).then((onResolved: any) => {
              if (onResolved.payload !== "error") {
                setProgress((prevProgress) =>
                  prevProgress >= 100
                    ? 0
                    : successFetchCheckArr.length !== 0
                    ? (successFetchCheckArr.length + 1 * 100) /
                      (successFetchCheckArr.length + 1)
                    : 100
                );
              }
            });
            break;
          case "messenger":
            dispatch(metaChat({ msgPlatform: "messenger" })).then(
              (onResolved: any) => {
                console.log(onResolved)
                if (onResolved.payload !== "error") {
                  setProgress((prevProgress) =>
                    prevProgress >= 100
                      ? 0
                      : successFetchCheckArr.length !== 0
                      ? (successFetchCheckArr.length + 1 * 100) /
                        (successFetchCheckArr.length + 1)
                      : 100
                  );
                }
              }
            );
            break;
          case "outlook":
            dispatch(outlookChat({})).then((onResolved: any) => {
              if (onResolved.payload !== "error") {
                setProgress((prevProgress) =>
                  prevProgress >= 100
                    ? 0
                    : successFetchCheckArr.length !== 0
                    ? (successFetchCheckArr.length + 1 * 100) /
                      (successFetchCheckArr.length + 1)
                    : 100
                );
              }
            });
            break;
        }
      }
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
      <Box
        sx={{
          backgroundColor: progress === 100 ? "" : "#ccccb3",
          cursor: progress === 100 ? "" : "not-allowed",
        }}
      >
        <Typography
          sx={{ mt: 2, mb: 1, display: "flex", justifyContent: "center" }}
          variant="h4"
        >
          All steps completed - you&apos;re finished
        </Typography>
        <Box sx={{ mt: 2, mb: 10, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            disableElevation
            sx={{ cursor: progress === 100 ? "pointer" : "not-allowed", mb: 3 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Go TO Home
          </Button>
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <SteeperAllDone />
        </Box>
      </Box>
    </Box>
  );
};

export default SteeperFetchChats;

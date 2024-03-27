import React, { useState } from "react";
import { MicrosoftLoginButton } from "react-social-login-buttons";
import { useDispatch } from "react-redux";
import { outlookAuthSlice } from "../../features/mediaAuthSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  SvgIcon,
  SvgIconProps,
  TextField,
  Tooltip,
  Typography,
  createSvgIcon,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MediumLogout from "./MediumLogout";
import getCookieValue from "../utils/getCookie";
import {
  getConverstaions,
  outlookChat,
} from "../../features/get_messagesSlice";
import { FaMicrosoft } from "react-icons/fa";

function OutlookIconforLogin(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          fill="#03A9F4"
          d="M21,31c0,1.104,0.896,2,2,2h17c1.104,0,2-0.896,2-2V16c0-1.104-0.896-2-2-2H23c-1.104,0-2,0.896-2,2V31z"
        />
        <path
          fill="#B3E5FC"
          d="M42,16.975V16c0-0.428-0.137-0.823-0.367-1.148l-11.264,6.932l-7.542-4.656L22.125,19l8.459,5L42,16.975z"
        />
        <path fill="#0277BD" d="M27 41.46L6 37.46 6 9.46 27 5.46z" />
        <path
          fill="#FFF"
          d="M21.216,18.311c-1.098-1.275-2.546-1.913-4.328-1.913c-1.892,0-3.408,0.669-4.554,2.003c-1.144,1.337-1.719,3.088-1.719,5.246c0,2.045,0.564,3.714,1.69,4.986c1.126,1.273,2.592,1.91,4.378,1.91c1.84,0,3.331-0.652,4.474-1.975c1.143-1.313,1.712-3.043,1.712-5.199C22.869,21.281,22.318,19.595,21.216,18.311z M19.049,26.735c-0.568,0.769-1.339,1.152-2.313,1.152c-0.939,0-1.699-0.394-2.285-1.187c-0.581-0.785-0.87-1.861-0.87-3.211c0-1.336,0.289-2.414,0.87-3.225c0.586-0.81,1.368-1.211,2.355-1.211c0.962,0,1.718,0.393,2.267,1.178c0.555,0.795,0.833,1.895,0.833,3.31C19.907,24.906,19.618,25.968,19.049,26.735z"
        />
      </svg>
    </SvgIcon>
  );
}

const validationSchema = yup.object({
  outlookmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const OutlookLogin = ({ getMessage, isFreeUser }: any) => {
  const dispatch = useDispatch<any>();
  // const [doneDisable, setdoneDisable] = useState<boolean>(
  //   getCookieValue("outlook") === undefined ? false : true
  // );
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      outlookmail: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      document.cookie =
        "outlookLess" +
        "=" +
        values.outlookmail +
        ";" +
        30 * 24 * 60 * 60 * 1000;
      document.cookie =
        "outlookPassLess" +
        "=" +
        values.password +
        ";" +
        30 * 24 * 60 * 60 * 1000;
      !isFreeUser && getMessage("me is");
    },
  });

  const handleClick = async () => {
    try {
      // Assuming outlookAuthSlice is an asynchronous action/thunk
      const onResolved = await dispatch(outlookAuthSlice({}));

      if (onResolved.payload !== "error" || onResolved.payload !== undefined) {
        const url = onResolved.payload.data;

        // Open a new window with the received URL
        window.open(url, "_blank", "noreferrer");

        // Wait for some time (e.g., 30 seconds)
        await new Promise((resolve) => setTimeout(resolve, 30000));

        // Dispatch outlookChat after waiting
        // try {
        //   const chatResolved = await dispatch(outlookChat({}));

        //   if (chatResolved.payload !== "error") {
        //     setOpen(true);
        //   }
        // } catch (chatError) {
        //   // Handle chat errors here
        //   console.error(chatError);
        // }
      }
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };
  // const handleClick = async () => {
  //   dispatch(outlookAuthSlice({})).then(async (onResolved: any) => {
  //     if (onResolved.payload !== "error" || onResolved.payload !== undefined) {
  //       // getMessage("me is");

  //       const url = await onResolved.payload.data;

  //       window.open(url, "_blank", "noreferrer");
  //       // setTimeout(() => {
  //       //   dispatch(outlookChat({})).then((onResolved: any) => {
  //       //     if (onResolved.payload !== "error") {
  //       //       // console.log("this");
  //       //       // setdoneDisable(true);
  //       //       setOpen(true);
  //       //     }
  //       //   });
  //       // }, 30000);
  //     }
  //   });
  // };
  return (
    <>
      {/* ////////////////////////////// */}
      <Box
        sx={{
          maxWidth: 475,
          margin: "0px auto",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          padding: "20px 0px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}>
        {/* <CardContent> */}
        <Box
          width={"100%"}
          padding={"5px 10px 15px"}
          display="flex"
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"15px"}>
          <OutlookIconforLogin style={{ fontSize: "30px", color: "#087ABF" }} />
          <Box>
            <Typography color={"#6A6B6C"} fontSize={"18px"} fontWeight={"600"}>
              Signing you in
            </Typography>
          </Box>
        </Box>
        <Box width={"100%"} border={"3px solid #2D63D1"}></Box>
        <Box
          width={"100%"}
          padding={"5px 10px 0px"}
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"10px"}>
          <MicrosoftLoginButton
            style={{ width: "70%" }}
            icon={OutlookIconforLogin}
            onClick={() => {
              handleClick();
            }}
          />
          {/* <Button
            onClick={() => {
              dispatch(outlookChat({})).then((onResolved: any) => {
                if (onResolved.payload !== "error") {
                  // console.log("this");
                  // setdoneDisable(true);
                  setOpen(true);
                }
              });
            }}>
            test
          </Button> */}
          <MediumLogout medium={"outlook"} />
        </Box>
        {/* </CardContent> */}
      </Box>
      {/* /////////////////////////////////// */}
      {/* <Box sx={{ display: "flex" }}>
        <MicrosoftLoginButton
          style={{ width: "50%" }}
          icon={OutlookIconforLogin}
          onClick={() => {
            handleClick();
          }}
        />
        <MediumLogout medium={"outlook"} />
      </Box> */}
      {isFreeUser ? (
        <></>
      ) : (
        <Box sx={{ m: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Enter Your Outlook Details:
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Need to send Email from App">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="outlookmail"
              name="outlookmail"
              label="Enter your Outlook outlookmail"
              value={formik.values.outlookmail}
              onChange={formik.handleChange}
              error={
                formik.touched.outlookmail && Boolean(formik.errors.outlookmail)
              }
              helperText={
                formik.touched.outlookmail && formik.errors.outlookmail
              }
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Enter your Outlook password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 1 }}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      )}
      <Stack spacing={8} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
          }}>
          <Alert
            onClose={() => {
              setOpen(false);
            }}
            severity="success"
            sx={{ width: "100%", backgroundColor: "black", color: "green" }}>
            Login success!
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
          }}>
          <Alert
            onClose={() => {
              setOpen(false);
            }}
            severity="info"
            sx={{ width: "100%", backgroundColor: "black" }}>
            Wait Chats Fetching it takes usually 5 minutes!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default OutlookLogin;

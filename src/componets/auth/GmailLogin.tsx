import React, { useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useDispatch } from "react-redux";
import { gmailAuthSlice } from "../../features/mediaAuthSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MediumLogout from "./MediumLogout";
import getCookieValue from "../utils/getCookie";
import { getConverstaions, gmailChat } from "../../features/get_messagesSlice";
import { FcGoogle } from "react-icons/fc";

const validationSchema = yup.object({
  gmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const GmailLogin = ({ getMessage, isFreeUser }: any) => {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState(false);

  // const [doneDisable, setdoneDisable] = useState(
  // getCookieValue("gmail") !== undefined ? true : false
  // );

  const formik = useFormik({
    initialValues: {
      gmail: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      document.cookie =
        "gmailLess=" + values.gmail + ";" + 30 * 24 * 60 * 60 * 1000;
      document.cookie =
        "gmailPassLess=" + values.password + ";" + 30 * 24 * 60 * 60 * 1000;
      !isFreeUser && getMessage("me is");
    },
  });

  const handelClick = () => {
    dispatch(gmailAuthSlice({})).then((onResolved: any) => {
      if (onResolved.payload !== "error") {
        // getMessage("me is");
        window.open(onResolved.payload.url, "_blank", "noreferrer");

        // setTimeout(() => {
        //   dispatch(gmailChat({})).then((onResolved: any) => {
        //     if (onResolved.payload !== "error") {
        //       // console.log("this");

        //       // setdoneDisable(true);
        //       setOpen(true);
        //     }
        //   });
        // }, 15000);
      }
    });
  };
  return (
    <>
      {/* //////////////////////// */}
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
          <FcGoogle fontSize={"28px"} />
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
          <GoogleLoginButton
            style={{ width: "70%" }}
            onClick={() => {
              handelClick();
            }}
          />
          <MediumLogout medium={"gmail"} />
        </Box>
        {/* </CardContent> */}
      </Box>
      {/* //////////////////////////// */}
      {/* <Box sx={{ display: "flex" }}>
        <GoogleLoginButton
          style={{ width: "50%" }}
          onClick={() => {
            handelClick();
          }}
        />
        <MediumLogout medium={"gmail"} />
      </Box> */}

      {isFreeUser ? (
        <></>
      ) : (
        <Box sx={{ m: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Enter Your Gmail Less Secure App Details:
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
              id="gmail"
              name="gmail"
              label="Enter your Gmail less secure app gmail"
              value={formik.values.gmail}
              onChange={formik.handleChange}
              error={formik.touched.gmail && Boolean(formik.errors.gmail)}
              helperText={formik.touched.gmail && formik.errors.gmail}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Enter your Gmail less secure app password"
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

export default GmailLogin;

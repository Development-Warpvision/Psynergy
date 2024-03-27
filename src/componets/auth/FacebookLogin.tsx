import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import { facebookPageAuthSlice } from "../../features/mediaAuthSlice";
import { me } from "../../features/meDetailsSlice";
import getCookieValue from "../utils/getCookie";
import MediumLogout from "./MediumLogout";
import { Stack, Snackbar, Alert, Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Facbook from "../FaceBoo/Facbook";

const FacebookLogin = ({ getMessage, isFreeUser }: any) => {
  console.log(getCookieValue("facebook"));
  const dispatch = useDispatch<any>();
  const [doneDisable, setdoneDisable] = useState(
    getCookieValue("facebook") !== undefined ? true : false,
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* /////////////////////////// */}
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
          <FacebookIcon style={{ fontSize: "30px", color: "#087ABF" }} />
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
          <Box width={"70%"}>
            <LoginSocialFacebook
              appId={"639051898384238" ?? ""}
              onResolve={(response) => {
                console.log("response", response);
                dispatch(
                  facebookPageAuthSlice({
                    access_token: response.data?.accessToken,
                    userID: response.data?.userID,
                  }),
                ).then(async (onResolved: any) => {
                  console.log(onResolved);
                  if (onResolved.payload !== "error") {
                    // const isBeforeLog = dispatch(me({ sidebar: true })).then(
                    !isFreeUser && getMessage("me is");
                    setdoneDisable(true);

                    document.cookie =
                      "facebook" +
                      "=" +
                      onResolved.payload.data[0].access_token +
                      ";" +
                      30 * 24 * 60 * 60 * 1000;
                    document.cookie =
                      "facebookname" +
                      "=" +
                      onResolved.payload.data[0].name +
                      ";" +
                      30 * 24 * 60 * 60 * 1000;
                    document.cookie =
                      "facebookid" +
                      "=" +
                      onResolved.payload.data[0].id +
                      ";" +
                      30 * 24 * 60 * 60 * 1000;
                    document.cookie =
                      "facebookuserid" +
                      "=" +
                      response.data!.id +
                      ";" +
                      30 * 24 * 60 * 60 * 1000;
                    // setOpen(true);
                  }
                });
              }}
              onReject={() => {
                // console.log("Error");
              }}
              scope="pages_messaging,pages_show_list,public_profile"
              // style={{ width: "70%" }}
            >
              {/* {doneDisable ? ( */}
              {/* <MediumLogout medium={"messenger"} /> */}
              {/* // ) : ( */}
              <Facbook />
              <FacebookLoginButton />
              {/* // )} */}
            </LoginSocialFacebook>
          </Box>
          <MediumLogout medium={"messenger"} />
        </Box>
        {/* </CardContent> */}
      </Box>
      {/* ////////////////////////////////// */}
      {/* <LoginSocialFacebook
        appId={process.env.REACT_APP_FBAPPID ?? ""}
        onResolve={(response) => {
          dispatch(
            facebookPageAuthSlice({ access_token: response.data!.accessToken })
          ).then(async (onResolved: any) => {
            if (onResolved.payload !== "error") {
              // const isBeforeLog = dispatch(me({ sidebar: true })).then(
              !isFreeUser && getMessage("me is");
              setdoneDisable(true);

              document.cookie =
                "facebook" +
                "=" +
                onResolved.payload.data[0].access_token +
                ";" +
                30 * 24 * 60 * 60 * 1000;
              document.cookie =
                "facebookname" +
                "=" +
                onResolved.payload.data[0].name +
                ";" +
                30 * 24 * 60 * 60 * 1000;
              document.cookie =
                "facebookid" +
                "=" +
                onResolved.payload.data[0].id +
                ";" +
                30 * 24 * 60 * 60 * 1000;
              document.cookie =
                "facebookuserid" +
                "=" +
                response.data!.id +
                ";" +
                30 * 24 * 60 * 60 * 1000;
              // setOpen(true);
            }
          });
        }}
        onReject={() => {
          // console.log("Error");
        }}
      >
        {doneDisable ? (
          <MediumLogout medium={"messenger"} />
        ) : (
          <FacebookLoginButton />
        )}
      </LoginSocialFacebook> */}
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

export default FacebookLogin;

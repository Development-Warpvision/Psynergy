import { Alert, Avatar, Button, Snackbar } from "@mui/material";
import FacebookIcon from "../../assets/Images/facebook.svg";
import GmailIcon from "../../assets/Images/gmail.svg";
import InstagramIcon from "../../assets/Images/instagram.svg";
import OutlookIcon from "../../assets/Images/outlook.svg";
import WhatsappIcon from "../../assets/Images/whatsapp.svg";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import {
  facebookLogout,
  gmailLogout,
  outlookLogout,
} from "../../features/mediaAuthSlice";
import { useState } from "react";
const MediumLogout = ({ medium }: any) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<any>();

  const handleClick: any = () => {
    switch (medium) {
      case "gmail":
        dispatch(gmailLogout({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            setOpen(true);
          }
        });
        break;
      case "outlook":
        dispatch(outlookLogout({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            setOpen(true);
          }
        });
        break;
      case "messenger":
        dispatch(facebookLogout({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            document.cookie =
              "facebook=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "facebookname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "fbid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            setOpen(true);
          }
        });
        break;
    }
  };
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
  }));
  return (
    <>
      <Button
        sx={{ backgroundColor: "grey", my: 2, marginRight: 1 }}
        variant="contained"
        onClick={handleClick}
        startIcon={
          <SmallAvatar
            src={
              medium === "whatsapp"
                ? WhatsappIcon
                : medium === "gmail"
                ? GmailIcon
                : medium === "outlook"
                ? OutlookIcon
                : medium === "messenger"
                ? FacebookIcon
                : InstagramIcon
            }
          />
        }
      >
        Logout
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", backgroundColor: "black", color: "green" }}
          onClose={() => {
            setOpen(false);
          }}
        >
          Logout success!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MediumLogout;

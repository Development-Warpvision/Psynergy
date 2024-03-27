import OutlookLogin from "./OutlookLogin";
import GmailLogin from "./GmailLogin";
import FacebookLogin from "./FacebookLogin";
import { useState, useEffect } from "react";
import ForbiddenAccess from "../ForbiddenAccess";
import { Box } from "@mui/material";
const MediumLogin = () => {
  const [isStaff, setisStaff] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "").user._id;
    const staffList: any[] =
      JSON.parse(localStorage.getItem("user") ?? "").user.staff ??
      JSON.parse(localStorage.getItem("user") ?? "").user.createdby.staff;

    for (const key in staffList) {
      if (Object.prototype.hasOwnProperty.call(staffList, key)) {
        const element = staffList[key];
        // console.log(element._id);
        if (element._id === user) {
          setisStaff(true);
        }
      }
    }
  }, []);
  // console.log(isStaff);

  return (
    <>
      <Box py={"20px"}>
        {!isStaff ? (
          <>
            <GmailLogin isFreeUser={true} />
            <OutlookLogin isFreeUser={true} />
            <FacebookLogin isFreeUser={true} />
          </>
        ) : (
          <ForbiddenAccess />
        )}
      </Box>
    </>
  );
};

export default MediumLogin;

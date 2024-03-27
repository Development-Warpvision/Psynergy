import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import IconButton from "@mui/material/IconButton/IconButton";
import Collapse from "@mui/material/Collapse/Collapse";
import { rolesPredefined } from "./roles";
import UserAuthCheckedBox from "./UserAuthCheckedBox";
import Box from "@mui/material/Box/Box";
import { useDispatch } from "react-redux";
import { IamdeleteProfile, iamPasswordReset } from "../features/iam_authSlice";

const StaffRow = ({ row }: any) => {
  const [open, setOpen] = React.useState(false);
  const [style, setstyle] = useState(false);
  const dispatch = useDispatch<any>();

  // const handlePasswordReset: any = (email: string) => {
  //   dispatch(
  //     iamPasswordReset({
  //       email,
  //     })
  //   ).then(
  //     (onResolved: any) => {
  //       // setisTaskAssign(true);
  //       // console.log(onResolved.payload.user);
  //     },
  //     (onRejected: any) => {
  //       // console.log("reje");
  //     }
  //   );
  // };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: style ? "red" : "",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.username}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="center" sx={{ display: "flex" }}>
          <>
            <IconButton
              aria-label="password reset"
              size="small"
              onClick={() => {
                dispatch(
                  iamPasswordReset({
                    email: row.email,
                  })
                ).then((onResolved: any) => {
                  // setisTaskAssign(true);
                  // console.log(onResolved.payload.user);
                });
              }}
            >
              <LockResetIcon />
            </IconButton>
          </>
          <>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                dispatch(
                  IamdeleteProfile({
                    email: row.email,
                  })
                ).then(
                  (onResolved: any) => {
                    // setisTaskAssign(true);
                    // console.log(onResolved.payload.user);
                  },
                  (onRejected: any) => {
                    // console.log("reje");
                  }
                );
                setstyle(true);
              }}
            >
              <PersonRemoveIcon />
            </IconButton>
          </>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rolesPredefined.map((historyRow: any) => {
                    const myRoleIncludes: boolean =
                      row.role?.includes(historyRow);
                    const myRoleIncludesName =
                      row.find !== undefined &&
                      row.role.find((e: any) => e === historyRow);

                    if (myRoleIncludesName !== undefined) {
                      const foundIdx = rolesPredefined.findIndex(
                        (el) => el === myRoleIncludesName
                      );
                      rolesPredefined.splice(foundIdx, 1);
                      rolesPredefined.unshift(myRoleIncludesName);
                    }
                    return (
                      <TableRow key={historyRow}>
                        <TableCell component="th" scope="row">
                          <UserAuthCheckedBox
                            ismyRoleIncludes={myRoleIncludes}
                            name={historyRow}
                            userId={row._id}
                          />
                        </TableCell>

                        <TableCell>{historyRow}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default StaffRow;

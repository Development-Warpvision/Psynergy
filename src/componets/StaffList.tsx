import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StaffRow from "./StaffRow";

const StaffList = ({ staffData, inprows }: any) => {
  const [localData, setlocalData] = useState<any>(staffData);

  useEffect(() => {
    if (inprows.length > 0) {
      if (inprows[0].username !== undefined) {
        setlocalData(inprows);
      }
    }
  }, [inprows]);

  useEffect(() => {
    // const user = localStorage.getItem("user");
    setlocalData(staffData);
  }, []);

  function createData(
    username: string,
    email: string,
    role: string[],
    _id: any
  ) {
    return {
      username,
      email,
      role,
      _id,
    };
  }

  const rows = localData.map((e: any) => {
    return createData(e.username, e.email, e.role, e._id);
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          p: 2,
          maxHeight: "440px",
          borderRadius: "20px",
          marginTop: "20px",
          "&::-webkit-scrollbar": {
            width: "0px",
            visibility: "hidden",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead
            sx={{
              backgroundColor: "#F9FAFC",
              borderRadius: "20px 20px 0px 0px",
            }}
          >
            <TableRow sx={{ borderRadius: "20px 20px 0px 0px" }}>
              <TableCell />
              <TableCell>Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <StaffRow row={row} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StaffList;

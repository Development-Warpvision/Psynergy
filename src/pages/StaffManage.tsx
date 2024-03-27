import React, { useEffect, useState } from "react";

import { Button, TextField, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { rolesPredefined } from "../componets/roles";
import StaffList from "../componets/StaffList";
import { iamsignup } from "../features/iam_authSlice";
import ForbiddenAccess from "../componets/ForbiddenAccess";
import Pagination from "@mui/material/Pagination";

const StaffManage = () => {
  const user = localStorage.getItem("user");

  const staff: [] =
    JSON.parse(localStorage.getItem("user") ?? "").user.staff ??
    JSON.parse(localStorage.getItem("user") ?? "").user.createdby.staff;

  const dispatch = useDispatch<any>();
  const [data, setData] = useState<any>(staff);
  const [roleName, setroleName] = React.useState<string[]>([]);
  const [open, setopen] = useState(false);
  const [isStaff, setisStaff] = useState(false);

  console.log("sss", data);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "").user._id;
    const staffList: any[] =
      JSON.parse(localStorage.getItem("user") ?? "").user.staff ??
      JSON.parse(localStorage.getItem("user") ?? "").user.createdby.staff;

    for (const key in staffList) {
      if (Object.prototype.hasOwnProperty.call(staffList, key)) {
        const element = staffList[key];
        if (element._id === user) {
          setisStaff(true);
        }
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      await setData([
        ...data,
        {
          username: values.username,
          password: values.password,
          email: values.email,
          role: roleName,
        },
      ]);

      dispatch(
        iamsignup({
          username: values.username,
          password: values.password,
          email: values.email,
          role: roleName,
        }),
      ).then(
        (onResolved: any) => {
          // setisTaskAssign(true);
          // console.log(onResolved.payload.user);
        },
        (onRejected: any) => {
          // console.log("reje");
        },
      );
    },
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof roleName>) => {
    const {
      target: { value },
    } = event;
    setroleName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      {staff !== undefined && !isStaff ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              marginTop: "20px",
            }}>
            <Typography
              fontWeight={"600"}
              color="initial"
              sx={{
                fontSize: "2.5rem",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                fontFamily: "Arial, sans-serif",
              }}>
              Add Staff :
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setopen(!open);
              }}>
              {open ? "close" : " Add Staff"}
            </Button>
          </Box>
          {open && (
            <>
              <Box
                padding={"20px"}
                sx={{
                  backgroundColor: "#F0F2F5",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  borderRadius: "20px",
                }}>
                <form className="modal" onSubmit={formik.handleSubmit}>
                  <TextField
                    margin="dense"
                    fullWidth
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none", // Remove the border
                        },
                    }}
                    id="email"
                    name="email"
                    label="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />

                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none", // Remove the border
                        },
                    }}
                    label="username"
                    margin="dense"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none", // Remove the border
                        },
                    }}
                    label="password"
                    margin="dense"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type="password"
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <FormControl
                    sx={{
                      m: 1,
                      width: 300,
                      backgroundColor: "white",
                      borderRadius: "20px",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none", // Remove the border
                        },
                    }}>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      id="role-checkbox"
                      multiple
                      value={roleName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Roles" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}>
                      {rolesPredefined.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={roleName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ borderRadius: "20px" }}>
                    ADD USER
                  </Button>
                </form>
              </Box>
            </>
          )}
          <StaffList staffData={staff} inprows={data} />
        </>
      ) : (
        <ForbiddenAccess />
      )}
      {/* //////////////// */}
      <Box
        mt={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Box></Box>
        <Box
          padding={"5px"}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
          borderRadius={"5px"}>
          <Pagination count={4} color="primary" />
        </Box>
      </Box>
      {/* ////////////////*/}
    </>
  );
};

export default StaffManage;

import React, { Suspense, useEffect, useState } from "react";

import "../App.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Autocomplete,
  createFilterOptions,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { labeltoList } from "../features/userTaskSlice";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { rolesPredefined } from "./roles";
import StaffList from "./StaffList";
import { iamsignup } from "../features/iam_authSlice";
import ForbiddenAccess from "./ForbiddenAccess";
const IamSignup = () => {
  const user = localStorage.getItem("user");

  const staff: [] = JSON.parse(user ?? "").user.staff;
  // // console.log(roles);

  const dispatch = useDispatch<any>();
  const [data, setData] = useState<any>(staff);
  const [roleName, setroleName] = React.useState<string[]>([]);
  const [open, setopen] = useState(false);
  const [isStaff, setisStaff] = useState(false);

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
          // // console.log(isStaff);
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
        })
      ).then(
        (onResolved: any) => {
          // setisTaskAssign(true);
          // // console.log(onResolved.payload.user);
        },
        (onRejected: any) => {
          // // console.log("reje");
        }
      );
    },
  });

  // const OtherComponent = React.lazy(() => import("./BillList"));
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
      {!isStaff ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginBottom: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setopen(!open);
              }}
            >
              {open ? "close" : " Add Staff"}
            </Button>
          </Box>
          {open && (
            <form className="modal" onSubmit={formik.handleSubmit}>
              <div className="content">
                <span className="title"></span>

                <div className="actions">
                  <label className="drop-container">
                    <span className="drop-title">Staff Details</span>
                    {/*  password, role */}
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      label="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      type="password"
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="role">Role</InputLabel>
                      <Select
                        labelId="role"
                        id="role-checkbox"
                        multiple
                        value={roleName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Roles" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
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
                    >
                      ADD USER
                    </Button>
                  </label>
                </div>
              </div>
            </form>
          )}
          <StaffList staffData={staff} inprows={data} />
        </>
      ) : (
        <ForbiddenAccess />
      )}
    </>
  );
};

export default IamSignup;

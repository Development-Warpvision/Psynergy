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
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import LabelList from "./LabelList";
import { useDispatch, useSelector } from "react-redux";
import { labeltoList } from "../features/userTaskSlice";

const LabelAssign = () => {
  const roles = JSON.parse(localStorage.getItem("label") ?? "");
  const [isStaff, setisStaff] = useState(false);
  const dispatch = useDispatch<any>();
  const [data, setData] = useState<any>(roles);

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
      Role: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const submitData2 = {
        Id: 20,
        Role: values.Role,
      };

      dispatch(labeltoList({ label: values.Role, method: "POST" })).then(
        (onResolved: any) => {
          // setisTaskAssign(true);
          setData([...data, submitData2]);
          // // console.log("done");
        },
        (onRejected: any) => {
          // // console.log("reje");
        }
      );
    },
  });

  return (
    <>
      {!isStaff ? (
        <>
          <form className="modal" onSubmit={formik.handleSubmit}>
            <div className="content">
              <span className="title"></span>

              <div className="actions">
                <label className="drop-container">
                  <span className="drop-title">Bill Details</span>

                  <TextField
                    id="Role"
                    name="Role"
                    label="Role"
                    value={formik.values.Role}
                    onChange={formik.handleChange}
                    error={formik.touched.Role && Boolean(formik.errors.Role)}
                    helperText={formik.touched.Role && formik.errors.Role}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Add To List
                  </Button>
                </label>
              </div>
            </div>
          </form>
          <div className="result">
            <LabelList rowsData={roles} inprows={roles} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LabelAssign;

import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import {  useFormik } from "formik";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const [wrongCreds, setwrongCreds] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state: any) => state.auth
  // );

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      navigate("/");
      dispatch(
        login({ username: values.username, password: values.password })
      ).then((onResolved: any) => {
        if (onResolved.payload !== "error") {
          localStorage.setItem("isStaff", "false");
          navigate("/");
        } else {
          setwrongCreds(true);
        }
      });
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ marginTop: "0.1%" }}>
          <Grid xs={4.5}>
            <Box
              marginLeft={-20}
              sx={{
                width: "39rem",
                height: "92vh",
                backgroundColor: "#1E2D4C",
              }}
            ></Box>
          </Grid>
          <Grid xs={6.5}>
            <Box
              sx={{
                padding: "20%",
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                // noWrap
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "text.primary",
                  textDecoration: "none",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Hey Admin, Login
              </Typography>
              <Typography
                variant="body2"
                // noWrap
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "text.primary",
                  textDecoration: "none",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Sign in and start managing your staff & chats!
              </Typography>
              <Box sx={{ marginTop: "5rem" }}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    // color="primary"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      wrongCreds === false
                        ? formik.touched.username &&
                          Boolean(formik.errors.username)
                        : wrongCreds
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    // color="grey"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      wrongCreds === false
                        ? formik.touched.password &&
                          Boolean(formik.errors.password)
                        : wrongCreds
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{ marginY: "1rem" }}
                  />
                  {wrongCreds === true ? (
                    <Alert severity="error">Wrong Credentials</Alert>
                  ) : (
                    ""
                  )}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{
                      marginTop: "2rem",
                      backgroundColor: "#FF6969",
                      color: "#1E2D4C",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { iamlogin } from "../../features/iam_authSlice";
import { useState } from "react";
import { Alert } from "@mui/material";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginIam = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [wrongCreds, setwrongCreds] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(
        iamlogin({ username: values.username, password: values.password })
      ).then((onResolved: any) => {
        if (onResolved.payload !== "error") {
          localStorage.setItem("isStaff", "true");
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1683520596266-b7811d63e5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)",
            backgroundRepeat: "no-repeat",
            filter: "blur(8px)",

            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              color="text.primary"
              component="h1"
              variant="h5"
              pt="3rem"
            >
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  wrongCreds === false
                    ? formik.touched.username && Boolean(formik.errors.username)
                    : wrongCreds
                }
                helperText={formik.touched.username && formik.errors.username}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  wrongCreds === false
                    ? formik.touched.password && Boolean(formik.errors.password)
                    : wrongCreds
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {wrongCreds === true ? (
                <Alert severity="error">Wrong Credentials</Alert>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {/* <Button
                type="submit"
                sx={{
                  marginTop: "2rem",
                  backgroundColor: "#FF6969",
                  color: "#1E2D4C",
                }}
              >
                Submit
              </Button> */}
              <Grid container>
                <Grid item xs>
                  <Button
                    variant="text"
                    onClick={() => {
                      navigate("/iam/password");
                    }}
                  >
                    Forgot password?
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginIam;

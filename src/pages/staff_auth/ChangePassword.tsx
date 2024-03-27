import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { iamPasswordUpdate } from "../../features/iam_authSlice";
import { Snackbar } from "@mui/material";

export default function ChangePassword() {
  const validationSchema = yup.object({
    email: yup.string().required("Email is required").email(),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [open, setopen] = React.useState<any>(false);
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // // console.log({
  //   //   email: data.get("email"),
  //   //   password: data.get("password"),
  //   // });
  // };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(
        iamPasswordUpdate({
          email: values.email,
          newPassword: values.password,
        })
      ).then((onResolved: any) => {
        if (onResolved.payload !== "error") {
          navigate("/iam/login");
        } else {
          setopen(true);
        }
      });
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockOutlinedIcon />
        <Typography
          component="h1"
          variant="h5"
          color="text.primary"
          pt="3rem"
          mb="1"
        >
          Update Your Password!
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Your Password
          </Button>
          <Grid container>
            <Grid item>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                variant="text"
              >
                GO back
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        // sx={{ backgroundColor: "red" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={() => setopen(false)}
        message="Contact Admin to reset Password OR Check your email"
        key={"snackBar"}
      />
    </Container>
  );
}

import React from "react";
import SignInForm from "../components/signin/SignInForm";
import LogInPic from "../assets/login.jpg";
import { Grid, Box,Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";
const Login = () => {
  return (
    <>
      <Grid container sx={{height:'100vh'}} spacing={0}>
        <Grid item lg={6} xs={0}>
          <Box style={{ width: "100%", height: "100%"}}>
            <Hidden only={['xs','sm','md']}>
            <img
              alt = 'some_img'
              src={LogInPic}
              width="100%"
              height="100%"
            ></img>
            </Hidden>
          </Box>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box
            style={{
              backgroundColor: "#1976d2",
              width: "100%",
              height: "100%",
            }}
          >
            <SignInForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

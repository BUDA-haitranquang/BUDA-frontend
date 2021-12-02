import React from "react";
import SignUpForm from "../components/signin/SignUpForm";
import LogInPic from "../assets/login.jpg";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  imgWrapper: {
    width: "100%",
    height: "100%",
  },
}));

const SignUp = () => {
  const classes = useStyle();
  return (
    <>
      <Grid container spacing={0}>
        <Grid item lg={6} xs={0}>
          <Box style={{ width: "100%", height: "100%" }}>
            <img
              className={classes.imgWrapper}
              src={LogInPic}
              width="100%"
              height="100%"
            ></img>
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
              <SignUpForm/>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;

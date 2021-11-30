import React from "react";
import SignInForm from "../components/signin/SignInForm";
import LogInPic from "../assets/login.jpg";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  imgWrapper: {
    width: "100%",
    height: "100%",
    // [theme.breakpoints.down("md")]: {
    //   width: 0,
    // },
  },
}));

const Login = () => {
  const classes = useStyle();
  return (
    // <div style={containerStyle}>
    //  <div style={{
    //      width:'100%',
    //      backgroundImage : `url(${LogInPic})`,
    //      backgroundRepeat:"no-repeat",
    //      backgroundSize:"100%",
    // }}>

    //
    //  {/* #1976d2 */}
    //  <div style={{backgroundColor:'#1976d2 ',width:'100%'}}><SignInForm/></div>
    // </div>
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
            <SignInForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

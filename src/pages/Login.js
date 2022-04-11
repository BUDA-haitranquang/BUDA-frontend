import React from "react";
import SignInForm from "../components/signin/SignInForm";
import LogInPic from "../assets/login.jpg";
import LoginBackground from "../assets/Background.png";
import { Grid, Box, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${LoginBackground})`,
    backgroundRepeat: "no-repeat",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

const Login = () => {
  const cls = useStyles();
  return (
    <>
      <Box
        container
        sx={{ height: "100vh" }}
        spacing={0}
        className={cls.background}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Hidden lgDown>
          <Box width="45%">
            <SignInForm />
          </Box>
        </Hidden>
        <Hidden lgUp>
          <Box width="100%">
            <SignInForm />
          </Box>
        </Hidden>
      </Box>
    </>
  );
};

export default Login;

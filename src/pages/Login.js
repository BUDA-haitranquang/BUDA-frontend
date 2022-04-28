import React from "react";
import SignInForm from "../components/signin/SignInForm";
import LoginBackground from "../assets/Background_1.png";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${LoginBackground})`,
    backgroundRepeat: "no-repeat",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  boxCointainer: {
    background: "rgba(255, 255, 255, 0.83)",
    display: "flex",
    flexDirecition: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem",
    borderRadius: "20px"
  }
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
          alignItems: "center"
        }}
      >
        <Box className={cls.boxCointainer}>
          <SignInForm />
        </Box>
      </Box>
    </>
  );
};

export default Login;

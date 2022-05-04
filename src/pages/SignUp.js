import React from "react";
import SignUpForm from "../components/signin/SignUpForm";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoginBackground from "../assets/Background_1.png";

const useStyle = makeStyles((theme) => ({
  imgWrapper: {
    width: "100%",
    height: "100%"
  },
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
}));

const SignUp = () => {
  const cls = useStyle();
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
          <SignUpForm />
        </Box>
      </Box>
    </>
  );
};

export default SignUp;

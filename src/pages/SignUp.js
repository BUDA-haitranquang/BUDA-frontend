import React from "react";
import SignUpForm from "../components/signin/SignUpForm";
import LogInPic from "../assets/login.jpg";
import { Grid, Box ,Hidden} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoginBackground from "../assets/Background.png";


const useStyle = makeStyles((theme) => ({
  imgWrapper: {
    width: "100%",
    height: "100%",
  },
  background: {
    backgroundImage: `url(${LoginBackground})`,
    backgroundRepeat: "no-repeat",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
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
          alignItems: "center",
        }}
      >
        <Hidden lgDown>
          <Box width="45%">
            <SignUpForm />
          </Box>
        </Hidden>
        <Hidden lgUp>
          <Box width="100%">
            <SignUpForm />
          </Box>
        </Hidden>
      </Box>
    </>
  );
};

export default SignUp;

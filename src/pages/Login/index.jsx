import SignInForm from "./SignInForm";
import LoginIllustration from "src/assets/login_illustration.png";

import { Box } from "@mui/material";

const Login = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <img src={LoginIllustration} width="80%" alt="login" />
        </Box>
        <SignInForm />
      </Box>
    </>
  );
};

export default Login;

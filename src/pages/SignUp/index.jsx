import SignUpForm from "./SignUpForm";
import { Box } from "@mui/material";
import LoginIllustration from "src/assets/login_illustration.png";

const SignUp = () => {
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
        <SignUpForm />
      </Box>
    </>
  );
};

export default SignUp;

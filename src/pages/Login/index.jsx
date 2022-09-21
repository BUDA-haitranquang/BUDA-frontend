import SignInForm from "./SignInForm";
import LoginBackground from "src/assets/Background_1.png";
import { Box } from "@mui/material";

const Login = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${LoginBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.83)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "2.4rem",
            borderRadius: "20px",
          }}
        >
          <SignInForm />
        </Box>
      </Box>
    </>
  );
};

export default Login;

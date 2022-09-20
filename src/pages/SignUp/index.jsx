import SignUpForm from "./SignUpForm";
import { Box } from "@mui/material";
import LoginBackground from "src/assets/Background_1.png";

const SignUp = () => {
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
          width: "100%",
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
            padding: "3rem",
            borderRadius: "20px",
          }}
        >
          <SignUpForm />
        </Box>
      </Box>
    </>
  );
};

export default SignUp;

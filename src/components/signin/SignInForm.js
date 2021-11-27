import React, { useState, useRef } from "react";
import { Box, Button, OutlinedInput, InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  wrapper: {},
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headlineText: {
    marginTop: "10%",
    paddingBottom: "10%",
    fontSize: 70,
    color: "#fff",
    fontFamily: "Poppins",
    fontWeight: 800,
  },
  outlinedInput: {
    "&.MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "25px",
      width: "80%",
    },
  },
});
const SignInForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyle();
  return (
    <>
      <Box mx={10}>
        <Box className={classes.headlineText} mx={5}>
          Welcome!
        </Box>
        <Box className={classes.formContainer} pt={2}>
          <OutlinedInput
            className={classes.outlinedInput}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="username-input"
            type="text"
            placeholder="Username"
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            }
          />
          <Box pt={2}></Box>
          <OutlinedInput
            className={classes.outlinedInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password-input"
            type="password"
            placeholder="Password"
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;

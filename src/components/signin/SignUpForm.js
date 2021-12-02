import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
    Checkbox,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@mui/styles";
import SignUpStepper from './SignUpStepper';
import EmailIcon from '@mui/icons-material/Email';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import  NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
const useStyle = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  headlineText: {
    paddingTop: "15%",
    paddingBottom: "15%",
    fontSize: 70,
    color: "#fff",
    fontFamily: "Poppins",
    fontWeight: 800,
    marginLeft: "15%",
  },
  outlinedInput: {
    "&.MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "25px",
      width: "70%",
    },
    "&.MuiOutlinedInput-inputAdornedStart": {
      opacity: 0.5,
    },
  },
  checkboxWrapper: { marginLeft: "15%" },
  buttonWrapper: {
    marginLeft: "15%",
    width: "70%",
  },
  button: {
    "&.MuiButton-root": {
      color: "#fff",
      width: "80%",
      borderRadius: 20,
      border: "1px solid #fff",
      height: 40,
      "&:hover": {
        backgroundImage: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        border: "none",
      },
    },
  },
});
const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [stepper,setStepper] = useState(0);
  const classes = useStyle();
  return (
    <>
      <Box mx={10} className={classes.wrapper}>
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box className={classes.headlineText}>Sign Up</Box>
          <Box className={classes.formContainer} pt={2}>
            { stepper === 0 && <OutlinedInput
              className={classes.outlinedInput}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="username-input"
              type="text"
              placeholder="Username"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />}

            {stepper===1 && <OutlinedInput
              className={classes.outlinedInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
              type="text"
              placeholder="Email"
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />}

            {stepper === 2 &&  <OutlinedInput
              className={classes.outlinedInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-input"
              type="password"
              placeholder="Password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />}
            <Box py={1}></Box>

          </Box>

          <Box
            className={classes.buttonWrapper}
            display="flex"
            justifyContent="space-evenly"
            py={2}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} display="flex" justifyContent="left">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick ={()=>setStepper(stepper -1)}
                  className={classes.button}
                  disabled={stepper === 0}
                >
                  <NavigateBeforeIcon/>
                </Button>
              </Grid>
              <Grid item xs={12} md={6} display="flex" justifyContent="right">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick = {() => setStepper(stepper+1)}
                  className={classes.button}
                >
                  {stepper===2?"Submit":<NavigateNextIcon/>}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box>
             <SignUpStepper stepper = {stepper}/> 
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;

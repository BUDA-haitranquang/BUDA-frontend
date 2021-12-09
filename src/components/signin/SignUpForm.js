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
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
      borderRadius: "35px",
      width: "70%",
      height:'60px'
    },
    "&.MuiOutlinedInput-inputAdornedStart": {
      opacity: 0.5,
    },
    "& input":{

      padding:'15px',
      height:'30px'
    }
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
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [phone,setPhone] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [stepper,setStepper] = useState(0);
  const [visibility,setVisibility] = useState(false);
  const classes = useStyle();

  const handleSubmit = () =>{}
  // const handleVisibility = () => setVisibility(!visibility); 
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
          {stepper===0 &&
          <Box className={classes.formContainer} pt={2}>
            <OutlinedInput
              className={classes.outlinedInput}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstname-input"
              type="text"
              placeholder="First Name"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
              <Box py={1}></Box>
              <OutlinedInput
              className={classes.outlinedInput}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastname-input"
              type="text"
              placeholder="Last Name"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
              <Box py={1}></Box>
            <OutlinedInput
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
            />
            <Box py={1}></Box>
            <OutlinedInput
              className={classes.outlinedInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone-input"
              type="text"
              placeholder="Phone Number"
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
            <Box py={1}></Box>
          </Box>
          }
          {stepper===1 &&
          <Box className={classes.formContainer} pt={2}>
            <OutlinedInput
              className={classes.outlinedInput}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="username-input"
              type="text"
              placeholder=" Username"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
            <Box py={1}></Box> 
            <OutlinedInput
              className = {classes.outlinedInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="email-input"
              type={visibility?'text':'password'}
              placeholder="Password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
              endAdornment = {
                <InputAdornment position='end'>
                  <Button onCLick ={() => setVisibility(!visibility)}> <VisibilityIcon style={{opacity:0.5}}/></Button>
                </InputAdornment>
              }
            />
            <Box py={1}></Box>
            <OutlinedInput
              className={classes.outlinedInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password-input"
              type="password"
              placeholder="Confirm Password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
            <Box py={1}></Box>
          </Box>
          }
          <Box
            className={classes.buttonWrapper}
            display="flex"
            justifyContent="space-evenly"
            py={2}
          >
            <Grid container spacing={3}>
              <Grid item xs={6} display="flex" justifyContent="left">
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
              <Grid item xs={6} display="flex" justifyContent="right">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick = {() =>stepper===2? handleSubmit():setStepper(stepper+1)}
                  className={classes.button}
                >
                  {stepper===2?"Submit":<NavigateNextIcon/>}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* <Box>
             <SignUpStepper stepper = {stepper}/> 
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
  outlinedInputName: {
    "&.MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "10px",
      width: "35%",
      height:'40px',
    },
    'label + &': {
      marginTop: '15px',
    },
    "& input":{
      padding:'15px',
      height:'10px'
    }
  },
  label:{
    '&.MuiInputLabel-root':{
    '&.Mui-focused':{color:'black'},
    }
  }  ,
  nameWrapper:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    paddingLeft:'50%',
    paddingRight:'50%'
  },
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
    paddingBottom: "10%",
    fontSize: 70,
    color: "#fff",
    fontFamily: "Poppins",
    fontWeight: 800,
    marginLeft: "15%",
  },
  outlinedInput: {
    "&.MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "10px",
      width: "75%",
      height:'40px',
    },
    'label + &': {
      marginTop: '15px',
    },
    "& input":{
      padding:'15px',
      height:'10px'
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
      width: "75%",
      borderRadius: 10,
      //border: "1px solid #fff",
      backgroundColor:'#42B72A',
      height: 40,
      "&:hover": {
        backgroundImage: "linear-gradient(120deg, #C9FFBF 0%, #FFAFBD 100%)",
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
  const [visibility,setVisibility] =useState(false);  
  const classes = useStyle();

  const handleSubmit = (e) =>{e.preventDefault()}
  const handleVisibility = (e) => {
    setVisibility(!visibility) ;
};
  //useEffect(()=> console.log(visibility),[visibility]) 
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
            <Box className={classes.nameWrapper}>
            <OutlinedInput
              className={classes.outlinedInputName}
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
              <Box px={2}></Box>
              <OutlinedInput
              className={classes.outlinedInputName}
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
            </Box>
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
                  <Button onClick ={handleVisibility}> <VisibilityIcon style={{opacity:0.5}}/></Button>
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
            <Button className={classes.button} onClick={handleSubmit}>submit</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;

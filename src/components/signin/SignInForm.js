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
      borderRadius: "50px",
      width: "75%",
      height:'60px',
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
  button1: {
    "&.MuiButton-root": {
      color: "#fff",
      width: "100%",
      borderRadius: 20,
      border: "1px solid #fff",
      height: 55,
      "&:hover": {
        backgroundImage: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        border: "none",
      },
    },
  },
  button2: {
    "&.MuiButton-root": {
      color: "#fff",
      width: "100%",
      borderRadius: 20,
      border: "1px solid #fff",
      height: 50,
      "&:hover": {
        backgroundImage: "linear-gradient(120deg, #C9FFBF 0%, #FFAFBD 100%)",
        border: "none",
      },
    },
  },
});
const SignInForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkBox,setCheckBox] = useState(false);
  const classes = useStyle();
  
  const handleSubmit = (e)=>{
    e.preventDeafault();
  }
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
          <Box className={classes.headlineText}>Welcome!</Box>
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
                  <PersonIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
            <Box py={2}></Box>
            <OutlinedInput
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
            />
            <Box py={1}></Box>
          </Box>
          <Box className={classes.checkboxWrapper}>
            <FormControlLabel
              control={<Checkbox color="success" onChange={()=> setCheckBox(val => !val)} />}
              label="Remember password"
            />
          </Box>
          <Box
            className={classes.buttonWrapper}
            display="flex"
            justifyContent="space-evenly"
            py={2}
          >
            <Grid container spacing={3} display='column' flexDirection='column'>
              <Grid item xs justifyContent="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button1}
                >
                  LOG IN
                </Button>
              </Grid>

              <Grid  item xs display='flex' justifyContent='center' >
                <Box
                  sx={{
                    width : '70%',
                    height : '1px',
                    backgroundColor:'black',
                    borderRadius:'25px',
                  }}></Box>
              </Grid>

              <Grid item xs justifyContent="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button2}
                >
                  SIGN UP
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;

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
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addToken } from "../../redux/tokenSlice";
import {
  LOGIN_USER,
  REGISTER_USER,
} from "../../graphQl/authentication/authMutations";
import { useHistory } from "react-router";

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
      borderRadius: "10px",
      width: "75%",
      height:'40px',
    },
    "&.MuiOutlinedInput-inputAdornedStart": {
      opacity: 0.5,
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
  button1: {
    "&.MuiButton-root": {
      color: "#fff",
      width: "100%",
      borderRadius: 10,
      border: "1px solid #fff",
      
      height: 40,
     
      "&:hover": {
        backgroundImage: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        border: "none",
      },
    },
  },
  button2: {
    "&.MuiButton-root": {
      color: "#fff",
      width: "50%",
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

const SignInForm = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkBox,setCheckBox] = useState(false);
  const classes = useStyle();
  const dispatch = useDispatch();

  const [userLogin, { loading, error }] = useMutation(LOGIN_USER);
  if (loading) return "Signing in...";
  if (error) return `Sign in error! ${error.message}`;

  const login = () => {
    userLogin({
      variables: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        const { accessToken, refreshToken } = res.data.userLogin;
        dispatch(addToken(accessToken));
      })
      .then(() => {
        history.push("/dashboard")
      })
      .catch((error) => {
        //TODO: handle login errors
        alert(error);
      });
  };

  const handleSubmit = () => {
    login();
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
              type="text"
              placeholder="Email"
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
                    height : '0.5px',
                    backgroundColor:'rgba(0, 0, 0, 0.6)',
                    borderRadius:'25px',
                  }}></Box>
              </Grid>

              <Grid item xs display='flex'justifyContent="center" alignItems='center'>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button2}
                  onClick={handleSubmit}
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

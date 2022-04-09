import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  InputAdornment,
  Typography,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@mui/styles";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addRefreshToken } from "../../redux/tokenSlice";

import {
  LOGIN_USER,
  NEW_ACCESS_TOKEN,
} from "../../graphQl/authentication/authMutations";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
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
    fontSize: 1000,
    color: "#fff",
    fontFamily: "Lexend Deca",
    fontWeight: 800,
    marginLeft: "15%",
  },
  outlinedInput: {
    "&.MuiOutlinedInput-root": {
      backgroundColor: "#224957",
      borderRadius: "10px",
      width: "100%",
      height: "50px",

      "&:hover": {
        outline: "none",
        boxShadow: "0px 0px 0px 3px #20DF7F inset",
      },
    },
    "&.MuiOutlinedInput-inputAdornedStart": {
      opacity: 0.5,
    },
    "& input": {
      padding: "15px",
      height: "10px",
    },
    "& .MuiOutlinedInput-input": {
      color: "#ffffff",
    },
  },
  button1: {
    "&.MuiButton-root": {
      width: "100%",
      background: "#20DF7F",
      color: "white",
      borderRadius: 10,
      height: 50,
      "&:hover": {
        background: "#56EFA2",
        border: "none",
      },
    },
    "&.MuiButton-text": {
      fontSize: 19,
    },
  },
});

const SignInForm = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [checkBox,setCheckBox] = useState(false);
  const classes = useStyle();
  const dispatch = useDispatch();
  const btn = useRef(null);
  const [userLogin, { loading, error }] = useMutation(LOGIN_USER);
  const [newAccessToken] = useMutation(NEW_ACCESS_TOKEN);
  const { refreshJwt } = useSelector((state) => state.token);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const listener = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        btn.current.click();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  if (loading) return "Signing in...";
  //if (error) return `Sign in error! ${error.message}`;

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
        dispatch(addRefreshToken(refreshToken));
      })
      .then(() => {
        history.push("/");
        enqueueSnackbar("Login successfully", AlertSuccessProp);
      })
      .catch((error) => {
        enqueueSnackbar("Error", AlertErrorProp);
      });
  };

  // const getNewAccessToken = () => {
  //   newAccessToken({
  //     variables: {
  //       token: refreshJwt,
  //     }
  //   }).then(res=>{
  //     const {accessToken,refreshToken} = res.data.newAccessToken;
  //     dispatch(addToken(accessToken));
  //     dispatch(addRefreshToken(refreshToken));
  //   }).catch(e=>{console.log(e)})
  // }

  // const getNewAccessTokenLoop = () => {
  //   setTimeout(getNewAccessTokenLoop, 60);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <Box className={classes.wrapper}>
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "white",
              marginBottom: "4rem",
              fontWeight: 500,
            }}
          >
            BUDA
          </Typography>
          {/* <Box className={classes.formContainer} pt={2}>
            {error && 
                <h5 style={{
                color:'red',
                fontFamily:'Poppins',
                fontSize:'20px',
              }}>Wrong username or password</h5>
            }
          </Box> */}
          {/* <Box className={classes.checkboxWrapper}>
            <FormControlLabel
              control={<Checkbox color="success" onChange={()=> setCheckBox(val => !val)} />}
              label="Remember password"
            /> 
            
            </Box>*/}

          <Box style={{ marginLeft: "8rem", marginRight: "8rem" }}>
            <OutlinedInput
              className={classes.outlinedInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
              type="text"
              placeholder="Email"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon style={{ opacity: 0.5, color: "white" }} />
                </InputAdornment>
              }
              style={{ marginBottom: "1.25rem" }}
            />
            <OutlinedInput
              className={classes.outlinedInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-input"
              type="password"
              placeholder="Password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ opacity: 0.5, color: "white" }} />
                </InputAdornment>
              }
              style={{ marginBottom: "1.25rem" }}
            />
            <Button
              className={classes.button1}
              onClick={handleSubmit}
              ref={btn}
              style={{ marginBottom: "1.25rem" }}
            >
              LOG IN
            </Button>
            <Typography
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
                cursor: "default",
              }}
            >
              Don't have an account?&nbsp;
              <Link
                onClick={(e) => {
                  history.push("/signup");
                }}
                style={{
                  color: "#20DF7F",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;

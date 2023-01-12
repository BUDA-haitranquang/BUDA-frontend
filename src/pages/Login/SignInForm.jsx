import { useMutation } from "@apollo/client";
import GoogleIcon from "@mui/icons-material/Google";

import {
  Box,
  Button,
  CircularProgress,
  Link,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import {
  LOGIN_GOOGLE,
  LOGIN_USER,
} from "../../graphQl/authentication/authMutations";
import { addRefreshToken, addToken } from "../../redux/tokenSlice";

const clientIdGoogle =
  "1069931989583-9f6bge28vmggapg9ah7bgf14sismu580.apps.googleusercontent.com";

const SignInForm = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const btn = useRef(null);
  const [userLogin, { loading }] = useMutation(LOGIN_USER);
  const [loginGoogle] = useMutation(LOGIN_GOOGLE);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const listener = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        btn.current.click();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  if (loading)
    return (
      <Modal open={true}>
        <Box
          width="100%"
          height="100%"
          style={{ background: "transparent" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" style={{ color: "white" }}>
            Signing in ...
          </Typography>
          <CircularProgress />
        </Box>
      </Modal>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    // if (validCaptcha === true) login();
    // else enqueueSnackbar("Wrong Captcha", AlertErrorProp);
  };

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
        history.push("/dashboard");
        enqueueSnackbar("Login successfully", AlertSuccessProp);
      })
      .catch((error) => {
        enqueueSnackbar("Error", AlertErrorProp);
      });
  };

  const loginGoogleOauth = (oauthJwt) => {
    loginGoogle({
      variables: {
        token: oauthJwt,
      },
    })
      .then((res) => {
        const { accessToken, refreshToken } = res.data.loginGoogle;
        dispatch(addToken(accessToken));
        dispatch(addRefreshToken(refreshToken));
      })
      .then(() => {
        history.push("/dashboard");
        enqueueSnackbar("Login with Google successfully", AlertSuccessProp);
      })
      .catch((error) => {
        enqueueSnackbar("Google login error", AlertErrorProp);
      });
  };

  const onSuccessGoogleLogin = (res) => {
    console.log("Current user: ", res);
    console.log("Current user: ", res.tokenId);
    loginGoogleOauth(res.tokenId);
  };

  const onFailGoogleLogin = (res) => {
    console.log("Google Login failed: ", res);
  };

  return (
    <>
      <Box
        sx={{
          padding: "100px",
          width: "45%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              marginBottom: "2.4rem",
              fontWeight: 500,
              background:
                "linear-gradient(270deg, #496D93 -13.32%, #A8CAE9 49.93%, #4678AE 115.88%, #4678AE 115.88%)",
              webkitBackgroundClip: "text",
              webkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
            fontFamily="'Righteous', cursive"
          >
            BUDA
          </Typography>

          <Box>
            <OutlinedInput
              margin="dense"
              notched="true"
              sx={{
                mb: "1.25rem",
                "&.MuiOutlinedInput-root": {
                  backgroundColor: "rgba(220, 233, 247, 0.35)",
                  width: "100%",
                  height: "50px",
                },
                "& input": {
                  padding: "15px",
                  height: "10px",
                },
                "& .MuiOutlinedInput-input": {
                  color: "#black",
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
              type="text"
              placeholder="Email..."
            />
            <OutlinedInput
              margin="dense"
              notched="true"
              sx={{
                mb: "1.25rem",
                "&.MuiOutlinedInput-root": {
                  backgroundColor: "rgba(220, 233, 247, 0.35)",
                  width: "100%",
                  height: "50px",
                },
                "& input": {
                  padding: "15px",
                  height: "10px",
                },
                "& .MuiOutlinedInput-input": {
                  color: "#black",
                },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-input"
              type="password"
              placeholder="Password..."
            />
            <Button
              sx={{
                mb: "1.25rem",
                "&.MuiButton-root": {
                  width: "100%",
                  background:
                    "linear-gradient(90deg, #86AED8 -10.29%, #C7DEF3 41.74%, #A4C2E0 98.3%)",
                  color: "white",
                  height: 50,
                },
                "&.MuiButton-text": {
                  fontSize: 19,
                },
              }}
              onClick={handleSubmit}
              ref={btn}
            >
              <Typography fontFamily="'Righteous', cursive" color="#2C67A3">
                LOGIN
              </Typography>
            </Button>
            {/* <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lc7GssgAAAAANuBqTcUfs7qwjUdvjMn1QTSr7zg" //Google reCAPTCHA key
              onChange={() => setValidCaptcha(true)}
              onExpired={() => setValidCaptcha(false)}
              onErrored={() => setValidCaptcha(false)}
            /> */}
            <Typography
              fontFamily="'Andika', san-serif"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                color: "black",
                cursor: "default",
                opacity: "0.9",
                marginTop: "0.4rem",
                fontWeight: 500,
              }}
            >
              Don't have an account?&nbsp;
              <Link
                onClick={(e) => {
                  history.push("/signup");
                }}
                sx={{
                  color: "#2C67A3",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Sign up
              </Link>
            </Typography>

            <Box
              sx={{
                margin: ".8rem auto",
                borderTop: "2px solid #d6d6d6",
                paddingTop: ".8rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "60%",
              }}
            >
              <GoogleLogin
                clientId={clientIdGoogle}
                onSuccess={onSuccessGoogleLogin}
                onFailure={onFailGoogleLogin}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid black",
                      mb: "1.25rem",
                      "&.MuiButton-root": {
                        width: "100%",
                        color: "white",
                        height: 50,
                      },
                      "&.MuiButton-text": {
                        fontSize: 19,
                      },
                    }}
                  >
                    <GoogleIcon sx={{ color: "#4F3F55", mr: 2 }} />
                    <Typography
                      fontFamily="'Andika', san-serif"
                      color="#4F3F55"
                      sx={{ fontWeight: "bold" }}
                    >
                      Login with Google
                    </Typography>
                  </Button>
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;

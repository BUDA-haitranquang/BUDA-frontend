import { useMutation } from "@apollo/client";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { GoogleLogin } from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
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
  const [userLogin, { loading, error }] = useMutation(LOGIN_USER);
  const [loginGoogle] = useMutation(LOGIN_GOOGLE);
  const { enqueueSnackbar } = useSnackbar();
  const [validCaptcha, setValidCaptcha] = useState(false);

  const recaptchaRef = React.createRef();

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
    if (validCaptcha === true) login();
    else enqueueSnackbar("Wrong Captcha", AlertErrorProp);
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
        enqueueSnackbar(
          "Login with Google successfully",
          AlertSuccessProp
        );
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
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
              fontFamily: "'Montserrat', sans-serif",
              color: "black",
              marginBottom: "2.4rem",
              fontWeight: 500,
            }}
          >
            BUDA
          </Typography>

          <Box>
            <OutlinedInput
              sx={{
                mb: "1.25rem",
                "&.MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "100%",
                  height: "50px",
                },
                "&.MuiOutlinedInput-inputAdornedStart": {
                  opacity: 0.5,
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
              placeholder="Email"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
            <OutlinedInput
              sx={{
                mb: "1.25rem",
                "&.MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "100%",
                  height: "50px",
                },
                "&.MuiOutlinedInput-inputAdornedStart": {
                  opacity: 0.5,
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
              placeholder="Password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
            <Button
              sx={{
                mb: "1.25rem",
                "&.MuiButton-root": {
                  width: "100%",
                  background: "rgba(72, 149, 255, 1)",
                  color: "white",
                  borderRadius: 10,
                  height: 50,
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    background: "rgba(97, 163, 255, 1)",
                    border: "none",
                  },
                },
                "&.MuiButton-text": {
                  fontSize: 19,
                },
              }}
              onClick={handleSubmit}
              ref={btn}
            >
              LOG IN
            </Button>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lc7GssgAAAAANuBqTcUfs7qwjUdvjMn1QTSr7zg" //Google reCAPTCHA key
              onChange={() => setValidCaptcha(true)}
              onExpired={() => setValidCaptcha(false)}
              onErrored={() => setValidCaptcha(false)}
            />
            <Typography
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
                  color: "rgba(72, 149, 255, 1)",
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
              >
                <Typography variant="button">Login using Google</Typography>
              </GoogleLogin>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;

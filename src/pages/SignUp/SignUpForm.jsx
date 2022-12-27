import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import { REGISTER_USER } from "../../graphQl/authentication/authMutations";

const SignUpForm = () => {
  const history = useHistory();
  const btn = useRef(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

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
            Creating account ...
          </Typography>
          <CircularProgress />
        </Box>
      </Modal>
    );

  const handleVisibility = (e) => {
    setVisibility(!visibility);
  };
  const register = () => {
    registerUser({
      variables: {
        username: userName,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        email: email,
        password: password,
      },
    })
      .then(() => {
        history.push("/login");
        enqueueSnackbar("Please check your email", AlertSuccessProp);
      })
      .catch((e) => {
        enqueueSnackbar("Error", AlertErrorProp);
        console.log(error);
      });
  };

  const validate = () => {
    if (!userName) return false;
    if (!password) return false;
    if (!firstName) return false;
    if (!lastName) return false;
    if (!email) return false;
    if (password.length < 8) return false;
    if (password !== confirmPassword) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      enqueueSnackbar("Invalid input", AlertErrorProp);
      return;
    }
    register();
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
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <OutlinedInput
                margin="dense"
                notched="true"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name..."
                sx={{
                  marginBottom: "1.25rem",
                  marginRight: "0.5rem",
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
                    color: "black",
                  },
                }}
              />
              <OutlinedInput
                margin="dense"
                notched="true"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name..."
                sx={{
                  marginBottom: "1.25rem",
                  marginLeft: "0.5rem",
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
                    color: "black",
                  },
                }}
              />
            </Box>
            <OutlinedInput
              margin="dense"
              notched="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email..."
              sx={{
                marginBottom: "1.25rem",
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
                  color: "black",
                },
              }}
            />
            <OutlinedInput
              margin="dense"
              notched="true"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone number..."
              sx={{
                marginBottom: "1.25rem",
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
                  color: "black",
                },
              }}
            />
            <OutlinedInput
              margin="dense"
              notched="true"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder=" Username..."
              sx={{
                marginBottom: "1.25rem",
                "&.MuiOutlinedInput-root": {
                  backgroundColor: "rgba(220, 233, 247, 0.35)",
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
                  color: "black",
                },
              }}
            />
            <OutlinedInput
              margin="dense"
              notched="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={visibility ? "text" : "password"}
              placeholder="Password"
              sx={{
                marginBottom: "1.25rem",
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
                  color: "black",
                },
              }}
            />
            <OutlinedInput
              margin="dense"
              notched="true"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm password..."
              sx={{
                marginBottom: "1.25rem",
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
                  color: "black",
                },
              }}
            />
            <Button
              sx={{
                mb: "1rem",
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
                signup
              </Typography>
            </Button>
            <Typography>
              <Link
                onClick={(e) => {
                  history.push("/login");
                }}
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  sx={{
                    color: "black",
                    opacity: "0.9",
                    marginTop: "0.4rem",
                    fontWeight: 500,
                  }}
                >
                  Back to login page
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;

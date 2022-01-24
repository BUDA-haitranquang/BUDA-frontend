import React, { useState, useEffect,useRef } from "react";
import {
  Box,
  Button,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@mui/styles";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useHistory} from 'react-router';
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addToken } from "../../redux/tokenSlice";
import {
  REGISTER_USER
} from "../../graphQl/authentication/authMutations";
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
  button1: {
    "&.MuiButton-root": {
      color: "#fff",
      width: "30%",
      borderRadius: 10,
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
  const history = useHistory();
  const dispatch = useDispatch();
  const btn = useRef(null)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [phone,setPhone] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const classes = useStyle();;
  const [visibility,setVisibility] =useState(false);  
  
  const [registerUser,{loading,error}] = useMutation(REGISTER_USER);
  useEffect(() => {
    const listener = event => {
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

  if (loading) return 'Loading';
  
  
  
  const handleVisibility = (e) => {
    setVisibility(!visibility) ;
};
 const register = ()=>{
   registerUser({
     variables:{
       username: userName,
       firstName: firstName,
       lastName:lastName,
       phoneNumber: phone,
       email:email,
       password: password
     }
   }).then(res=>{
     const {accessToken,refreshToken} = res.data.userRegister;
     dispatch(addToken(accessToken));
   }).then(()=>history.push('/dashboard'))
   .catch(e=>{console.log(e)}) 
 } 

const validate = ()=>{
  if (!userName) return false;
  if(!password) return false;
  // if(!firstName) return false;
  // if(!lastName) return false;
  // if(!email) return false;
  // if(password.length<8) return false;
  // if(password != confirmPassword) return false;
  return true; 
}

 const handleSubmit=(e)=>{
   e.preventDefault();
   if(!validate()) {
    console.log('error') 
    return ;
   } 
  register();
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
            <Box className={classes.nameWrapper}>
            <OutlinedInput
              className={classes.outlinedInputName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              type="password"
              placeholder="Confirm Password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ opacity: 0.5 }} />
                </InputAdornment>
              }
            />
            
            <Box py={1}></Box>
            <Button 
              className={classes.button} 
              onClick={handleSubmit} 
              ref = {btn}>Sign up</Button>

             <Box
                  my ={3}
                  sx={{
                    width : '70%',
                    height : '0.5px',
                    backgroundColor:'rgba(0, 0, 0, 0.6)',
                    borderRadius:'25px',
                  }}></Box>

            <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button1}
                  onClick={(e)=>{history.goBack()}}
                >
                  Back to log in
                </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUpForm;

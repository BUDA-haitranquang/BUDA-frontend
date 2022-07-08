import { useQuery, useMutation } from "@apollo/client";
import { Box, Button, Typography, TextField, IconButton } from "@mui/material";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import noAvatar from "D:/New folder (2)/BUDAcompany_frontend/src/assets/noAvatar.png";
import { GET_USER } from "../../graphQl/myaccount/queries";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { SET_USER } from "../../graphQl/myaccount/mutaion";
const Profile = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useQuery(GET_USER);
  const [setUser,{error}] = useMutation(SET_USER);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
  const [prev, setPrev] = useState({});

  const handleCancel = () => {
    setPhoneNumber(prev.phoneNumber);
    setEmail(prev.email);
    setLastName(prev.lastName);
    setFirstName(prev.firstName);
    setIsEdit(false);
  };
  const handleSave = async () => {
    console.log(data.currentUser.userUUID);
    try {
      await setUser({
        variables: {
          userUUID: data.currentUser.userUUID,
          userName: data.currentUser.userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: data.currentUser.password,
        },
        refetchQueries: [{ SET_USER }],
      });
    } catch (e) {
      console.log(error);
    }
    // finally{}
    // setPassword("");
    setIsEdit(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setFirstName(data.currentUser.firstName);
        setLastName(data.currentUser.lastName);
        setEmail(data.currentUser.email);
        setPhoneNumber(data.currentUser.phoneNumber);
        setPrev(data.currentUser);
      }
    }
    fetchData();
  }, [data]);
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          height: "300px",
          backgroundImage: `url(${noAvatar})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundPosition: "center",
          borderRadius:'100%',
          backgroundSize: "cover",   
        backgroundColor:'black'
        }}
      ></Box>
      <Box py={1}></Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography align="center" variant="h4">
          {data?.currentUser.userName}
        </Typography>
        <IconButton
          onClick={() => {
            setIsEdit(true);
          }}
        >
          <BorderColorIcon />
        </IconButton>
      </Box>
      <Box py={1}></Box>
      <TextField
        label="First name"
        variant="outlined"
        value={firstName ? firstName : ""}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        required
        disabled={!isEdit}
      />
      <Box py={1}></Box>
      <TextField
        label="Last name"
        variant="outlined"
        value={lastName ? lastName : ""}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        required
        disabled={!isEdit}
      />
      <Box py={1}></Box>
      <TextField
        label="Email"
        variant="outlined"
        value={email ? email : ""}
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        disabled={!isEdit}
      />
      <Box py={1}></Box>
      <TextField
        label="Phone number"
        variant="outlined"
        value={phoneNumber ? phoneNumber : ""}
        required
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
        disabled={!isEdit}
      />
      <Box py={1}></Box>
      {/* {isEdit && <>
      <TextField
        label="Password"
        type = "password"
        variant="outlined"
        value = {password}
        required
        onChange ={(e)=>{setPassword(e.target.value)}}
      />
      <Box py={1}></Box></>} */}
      {isEdit && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;

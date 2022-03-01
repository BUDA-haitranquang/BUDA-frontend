import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMutation } from "@apollo/client";
import { LOAD_STAFFS } from "../../graphQl/staff/staffQueries";
import { ADD_STAFF_MUTATION } from "../../graphQl/staff/staffMutation";

const AddStaffModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [staffPosition, setStaffPosition] = useState("BASIC");
  const [salary, setSalary] = useState(0.0);
  
  const [newStaff, { error }] = useMutation(ADD_STAFF_MUTATION);

  const addStaff = () => {
    newStaff({
      variables: {
        name: name,
        account: account,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        staffPosition: staffPosition,
        salary: parseFloat(salary)
      },
      refetchQueries: [{query: LOAD_STAFFS}]
    });
  }

  const isFormValid = () => {
    const isValid = (name !== "") && (password !== "") && (salary >= 0);
    return isValid;
  }

  const handleSubmit = () => {
    if(isFormValid()) {
      addStaff();
      handleClose();
    }
    else alert("Invalid input");
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        autoComplete="off"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 24,
          p: 5,
          outline: 0,
          "& > :not(style)": { m: 1 },
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box mt={1}>
            <Typography align="center">Add</Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <TextField
          required
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          fullWidth
          id="outlined-basic"
          label="Account"
          variant="outlined"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        <TextField
          fullWidth
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          required
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField
          fullWidth
          required
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <TextField
          fullWidth
          required
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField
          fullWidth
          id="outlined-basic"
          label="Staff position"
          variant="outlined"
          value={staffPosition}
          onChange={(e) => setStaffPosition(e.target.value)}
        />

        <TextField
          fullWidth
          type="number"
          id="outlined-basic"
          label="Salary"
          variant="outlined"
          multiline
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <Button 
          variant="contained" 
          onClick={handleSubmit}
        >
          Add Staff
        </Button>

      </Box>
    </Modal>
  );
};

export default AddStaffModal;

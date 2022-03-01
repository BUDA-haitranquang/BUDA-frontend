import { useMutation } from "@apollo/client";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box, Button, IconButton, Modal,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { UPDATE_STAFF_MUTATION } from "../../graphQl/staff/staffMutation";
import { LOAD_STAFF, LOAD_STAFFS } from "../../graphQl/staff/staffQueries";

const EditStaffModal = ({data, isOpen, handleClose }) => {
  const staff = data.staff;
  const [name, setName] = useState(staff.name);
  const [password, setPassword] = useState(staff.password);
  const [email, setEmail] = useState(staff.email);
  const [phoneNumber, setPhoneNumber] = useState(staff.phoneNumber);
  const [address, setAddress] = useState(staff.address);
  const [staffPosition, setStaffPosition] = useState(staff.staffPosition);
  const [salary, setSalary] = useState(staff.salary);

  const [updateStaff] = useMutation(UPDATE_STAFF_MUTATION);

  const editStaff = () => {
    updateStaff({
      variables: {
        staffID: staff.staffID,
        name: name,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        staffPosition: staffPosition,
        salary: parseFloat(salary)
      },
      refetchQueries: [{
        query: LOAD_STAFF, 
        variables:{
          staffID: staff.staffID
        }
      },{
        query: LOAD_STAFFS
      }]
    });
  }

  const isFormValid = () => {
    const isValid = (name !== "") && (salary >= 0);
    return isValid;
  }

  const handleSubmit = () => {
    if(isFormValid()) {
      editStaff();
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
            <Typography align="center">Edit</Typography>
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
          Edit Staff
        </Button>

      </Box>
    </Modal>
  );
};

export default EditStaffModal;

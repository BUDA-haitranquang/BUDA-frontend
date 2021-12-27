import React, { useState } from "react";
import { Box, Modal, TextField, Typography, IconButton, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMutation } from "@apollo/client";
import { ADD_CUSTOMER_MUTATION } from "../../graphQl/customers/customersMutations";
import { LOAD_CUSTOMERS } from "../../graphQl/customers/customersQueries";

const AddCustomerModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email,setEmail] = useState("");
  const [newCustomer,{error}] = useMutation(ADD_CUSTOMER_MUTATION);
  
  const addCustomer = ()=>{
      newCustomer({
        variables:{
          name:name,
          phoneNumber:phoneNumber.replace,
          address:address
        },
        refetchQueries:[{query:LOAD_CUSTOMERS}]
      });
  }
  const isValid=()=>{return true}
  const handleSubmit = ()=>{
    if(isValid()){
      addCustomer();
      handleClose();
    } 
    else alert("Invalid")
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
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box mt={1}>
            <Typography align="center">Add Customer</Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
         <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <Button variant="contained"  onClick={handleSubmit}>Add</Button>
      </Box>
    </Modal>
  );
};
export default AddCustomerModal;

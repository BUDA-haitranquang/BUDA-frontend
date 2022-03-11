import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOAD_STAFFS } from "../../graphQl/staff/staffQueries";
import { ADD_STAFF_MUTATION } from "../../graphQl/staff/staffMutation";
import { useSnackbar } from "notistack";
import { AlertErrorProp, AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";

const AddStaffModal = (props) => {
  const { isOpen, handleClose } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [staffPosition, setStaffPosition] = useState("BASIC");
  const [salary, setSalary] = useState(0.0);
  
  const [newStaff, { error }] = useMutation(ADD_STAFF_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setAccount("");
    setPassword("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setStaffPosition("");
    setSalary(0);
  }

  const addStaff = () => {
    setIsLoading(true);
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
    })
      .then((result) => {
        handleClose();
        enqueueSnackbar("Added new staff successfuly", AlertSuccessProp);
      })
      .then(() => resetForm())
      .catch((e) => enqueueSnackbar(e.message, AlertErrorProp))
      .finally(() => setIsLoading(false));
  }

  const isFormValid = () => {
    const isValid = (name !== "") && (password !== "") && (salary >= 0);
    return isValid;
  }

  const handleSubmit = () => {
    if(isFormValid()) {
      addStaff();
    }
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  }

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      onOk={handleSubmit}
      title="New staff"
      isLoading={isLoading}
    >
      <Box
        component="form"
        autoComplete="off"
        sx={{
          width: "480px",
          "& > :not(style)": { m: 1 },
        }}
      >
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
          type="password"
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
      </Box>
    </BudaModal>
  );
};

export default AddStaffModal;

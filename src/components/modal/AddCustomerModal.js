import { useMutation } from "@apollo/client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_CUSTOMER_MUTATION } from "../../graphQl/customers/customersMutations";
import { LOAD_CUSTOMERS } from "../../graphQl/customers/customersQueries";

const AddCustomerModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [totalSpend, setTotalSpend] = useState(0.0);
  const [gender, setGender] = useState("UNKNOWN");
  const [ageGroup, setAgeGroup] = useState("UNKNOWN");
  const [newCustomer, { error }] = useMutation(ADD_CUSTOMER_MUTATION);
  const [isLoading, setIsLoading] = useState(false);
  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setTotalSpend(0);
    setAddress("");
  };
  const addCustomer = () => {
    setIsLoading(true);
    newCustomer({
      variables: {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        totalSpend: parseFloat(totalSpend),
        gender: gender,
        ageGroup: ageGroup,
      },
      refetchQueries: [{ query: LOAD_CUSTOMERS }],
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Add successfully", AlertSuccessProp);
      })
      .then(resetForm())
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
      .finally(setIsLoading(false));
  };

  const isValid = () => {
    return name.length > 0;
  };

  const handleSubmit = () => {
    if (isValid()) addCustomer();
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  };
  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      textOk="Save"
      onOk={handleSubmit}
      isLoading={isLoading}
      children={
        <Box
          component="form"
          autoComplete="off"
          sx={{
            width: "480px",
            height: "400px",
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="number"
              id="outlined-basic"
              label="Total spent"
              variant="outlined"
              value={totalSpend.toLocaleString()}
              onChange={(e) => setTotalSpend(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Address"
            multiline
            rows="3"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControl style={{ width: "48%" }}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
                fullWidth
              >
                <MenuItem value={"UNKNOWN"}>Unknown</MenuItem>
                <MenuItem value={"MALE"}>Male</MenuItem>
                <MenuItem value={"FEMALE"}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ width: "48%" }}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={ageGroup}
                label="Age Group"
                onChange={(e) => setAgeGroup(e.target.value)}
                fullWidth
              >
                <MenuItem value={"UNKNOWN"}>Unknown</MenuItem>
                <MenuItem value={"FROM_0_TO_12"}>From 0 to 12</MenuItem>
                <MenuItem value={"FROM_12_TO_18"}>From 12 to 18</MenuItem>
                <MenuItem value={"FROM_18_TO_24"}>From 18 to 24</MenuItem>
                <MenuItem value={"FROM_24_TO_30"}>From 24 to 30</MenuItem>
                <MenuItem value={"FROM_30_TO_40"}>From 30 to 40</MenuItem>
                <MenuItem value={"FROM_40_TO_50"}>From 40 to 50</MenuItem>
                <MenuItem value={"FROM_50_TO_65"}>From 50 to 65</MenuItem>
                <MenuItem value={"FROM_65_AND_ABOVE"}>
                  From 65 and above
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      }
    ></BudaModal>
  );
};
export default AddCustomerModal;

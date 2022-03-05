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
// import { ADD_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";
// import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
// import { LOAD_COST } from "../../graphQl/cost/costQueries"
// import { ADD_COST_MUTATION } from "../../graphQl/cost/costMutation"
import { LOAD_CUSTOMERS} from "../../graphQl/customers/customersQueries"
import { ADD_CUSTOMER_MUTATION } from "../../graphQl/customers/customersMutations";
const AddCustomerModal = ({ isOpen, handleClose }) => {
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  // const [amountLeft, setAmountLeft] = useState(0);
  // const [alertAmount, setAlertAmount] = useState(0);
  // const [costPerUnit, setCostPerUnit] = useState(0);
  // const [group, setGroup] = useState("");
  // const [description, setDescription] = useState("");

    // const [name,setName] = useState("");
    // const [description,setDescription] = useState("");
    // const [period,setPeriod] = useState(0);
    // const [moneyAmount,setMoneyAmount] = useState(0.0);

  const[name,setName] = useState("");
  const[address,setAddress] = useState("");
  const[phoneNumber,setPhoneNumber] = useState("");
  //const [newProduct, { error }] = useMutation(ADD_PRODUCT_MUTATION);
 // const [newFixedCost, {error}] = useMutation(ADD_COST_MUTATION);
  const [newCustomer,{error}] = useMutation(ADD_CUSTOMER_MUTATION);
  const addCustomer = () => {
    newCustomer({
      variables:{
        // name: name,
        // description: description,
        // moneyAmount: parseFloat(moneyAmount),
        // period: parseInt(period),
        // alertAmount: parseInt(alertAmount),
        // sellingPrice: parseFloat(price)
        name: name,
        address: address,
        phoneNumber: phoneNumber
      },
      refetchQueries: [{query: LOAD_CUSTOMERS}]
    });
  }

  const isFormValid = () => {
    const isValid = (name !== "")  && (phoneNumber != "");
    return isValid;
  }

  const handleSubmit = () => {
    if(isFormValid()) {
      addCustomer();
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
      <div>
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
              <Typography align="center">New Fixed Cost</Typography>
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
          <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            {/* <TextField
              required
             // type="number"
              id="outlined-basic"
              label="address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{width: "48%"}}
            /> */}
            <TextField
              required
              //type="number"
              id="outlined-basic"
              label="phoneNumber"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{width: "48%"}}
            />
          </div>
          
          {/* <TextField
            fullWidth
            required
            type="number"
            id="outlined-basic"
            label="Amount Left"
            variant="outlined"
            value={amountLeft}
            onChange={(e) => setAmountLeft(e.target.value)}
          /> */}
          {/* <TextField
            fullWidth
            required
            type="number"
            id="outlined-basic"
            label="Alert Amount"
            variant="outlined"
            value={alertAmount}
            onChange={(e) => setAlertAmount(e.target.value)}
          /> */}
          {/* <TextField
            fullWidth
            id="outlined-basic"
            label="Group"
            variant="outlined"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          /> */}
          {/* <TextField
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
          <Button 
            variant="contained" 
            onClick={handleSubmit}
          >
            Add Customer
          </Button>
        </Box>
        
      </div>
    </Modal>
  );
};

export default AddCustomerModal;

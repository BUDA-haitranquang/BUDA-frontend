import React, { useState } from "react";
import { Box, Modal, TextField, Typography, IconButton, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMutation } from "@apollo/client";
import { ADD_CUSTOMER_MUTATION } from "../../graphQl/customers/customersMutations";
import { LOAD_CUSTOMERS } from "../../graphQl/customers/customersQueries";
import { LOAD_COST } from "../../graphQl/cost/costQueries";
import { ADD_COST_MUTATION} from "../../graphQl/cost/costMutation"
const AddCostModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [fixedCostID, setFixedCostID] = useState("");
  const [moneyAmount, setMoneyAmount] = useState("");
 // const [email,setEmail] = useState("");
  const [newCost,{error}] = useMutation(ADD_COST_MUTATION);
  
  const addCost = ()=>{
      newCost({
        variables:{
          name:name,
          fixedCostID:fixedCostID.replace,
          moneyAmount:moneyAmount
        },
        refetchQueries:[{query:LOAD_COST}]
      });
  }
  const isValid=()=>{return true}
  const handleSubmit = ()=>{
    if(isValid()){
      addCost();
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
            <Typography align="center">Add Cost</Typography>
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
          label="fixedCostID"
          variant="outlined"
          value={fixedCostID}
          onChange={(e) => setFixedCostID(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="moneyAmount"
          variant="outlined"
          value={moneyAmount}
          onChange={(e) => setMoneyAmount(e.target.value)}
        />
      
        
        <Button variant="contained"  onClick={handleSubmit}>Add</Button>
      </Box>
    </Modal>
  );
};
export default AddCostModal;

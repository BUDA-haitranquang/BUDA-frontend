import React, { useState } from "react";
import { Box, Modal, TextField, Typography, IconButton, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMutation } from "@apollo/client";
import { ADD_DISCOUNTS_PERCENTAGE_MUTATION } from "../../graphQl/discounts/discountsMutations";
import { LOAD_DISCOUNTS } from "../../graphQl/discounts/discountsQueries";

const AddDiscountsModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [cashLimit, setCashLimit] = useState("");
  const [orderCount,setOrderCount] = useState("");
  const [expireTime,setExpireTime] = useState("");
  const [createdTime,setCreatedTime] = useState("");
  const [percentage,setPercentage] = useState("");
  const [newDiscount,{error}] = useMutation(ADD_DISCOUNTS_PERCENTAGE_MUTATION);
  
  const addDiscount = ()=>{
      newDiscount({
        variables:{
            name: name,
            cashLimit: cashLimit,
            orderCount: orderCount, 
            expireTime: expireTime,
            createdTime: createdTime,
            percentage: percentage
        },
        refetchQueries:[{query:LOAD_DISCOUNTS}]
      });
  }
  const isValid=()=>{return true}
  const handleSubmit = ()=>{
    if(isValid()){
      addDiscount();
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
            <Typography align="center">Add Discount</Typography>
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
          label="Cash Limit"
          variant="outlined"
          value={cashLimit}
          onChange={(e) => setCashLimit(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Order Count"
          variant="outlined"
          value={orderCount}
          onChange={(e) => setOrderCount(e.target.value)}
        />
         <TextField
          fullWidth
          id="outlined-basic"
          label="Created Time"
          variant="outlined"
          value={createdTime}
          onChange={(e) => setCreatedTime(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Expire Time"
          variant="outlined"
          value={expireTime}
          onChange={(e) => setExpireTime(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Percentage"
          variant="outlined"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <Button variant="contained"  onClick={handleSubmit}>Add</Button>
      </Box>
    </Modal>
  );
};
export default AddDiscountsModal;

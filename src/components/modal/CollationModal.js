// import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

import BudaModal from "../../buda-components/modal/BudaModal";

const CollationModal = ({ isOpen, handleClose,title }) => {
  const [comment, setComment] = useState("");
  const today = new Date();
  const [amount,setAmount] = useState(0);
  const resetForm = () => {};
  const isValid = () => {};
  const handleSubmit = () => {};

  return (
    <BudaModal
      title = {title}
      open={isOpen}
      onClose={handleClose}
      textOk="Save"
      onOk={handleSubmit}
      children={
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
          label = 'Difference amount'
          type="number"
          variant = 'outlined'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      
          <TextField
            // required
            fullWidth
            multiline
            rows = {3}
            id="outlined-basic"
            label= 'Note'
            variant="outlined"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </Box>
      }
    ></BudaModal>
  );
};

export default CollationModal;

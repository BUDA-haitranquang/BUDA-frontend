import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { number } from "@tensei/core";
import { parse } from "graphql";
import { set } from "lodash";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";

const CollationModal = ({ isOpen, handleClose,title }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [diff,setDiff] = useState(0);
  const [comment, setComment] = useState("");
  const today = new Date();
  // const resetForm = () => {};
  const isValid = () => {
    if (diff === 0 && typeof diff != number) return false;
    return true;
  };
  const handleSubmit = () => {
    if (!isValid) {
      enqueueSnackbar("Diffrence amount is required", AlertErrorProp) ;
      return;
    }
    // console.log(isValid())
    handleClose();

  };
  // console.log(typeof diff); 
  // console.log(typeof diff); 

  return (
    <BudaModal
      open={isOpen}
      title = {title}
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
          label='Difference amount'
          sx={{width:'100%'}}
          type="number"
          onChange={(e) => setDiff(parseInt(e.target.value))}
        />
          <TextField
            fullWidth
            multiline
            rows = {3}
            id="outlined-basic"
            label='Comment'
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

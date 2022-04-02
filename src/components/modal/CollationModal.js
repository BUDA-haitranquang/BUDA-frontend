import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { parse } from "graphql";
import { set } from "lodash";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

import BudaModal from "../../buda-components/modal/BudaModal";

const CollationModal = ({ isOpen, handleClose }) => {
  const [comment, setComment] = useState("");
  const today = new Date();
  const resetForm = () => {};
  const isValid = () => {};
  const handleSubmit = () => {};

  return (
    <BudaModal
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
            // required
            fullWidth
            id="outlined-basic"
            label={`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`}
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

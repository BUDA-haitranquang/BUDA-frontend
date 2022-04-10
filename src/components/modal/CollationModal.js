// import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import BudaModal from "../../buda-components/modal/BudaModal";
import { LOAD_COLATIONS } from "../../graphQl/collation/collationQueries";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import { EDIT_PRODUCT_QUANTITY } from "../../graphQl/collation/collationMutations";
const CollationModal = ({ isOpen, handleClose, title, productID }) => {
  const [comment, setComment] = useState("");
  const {enqueueSnackbar} = useSnackbar();
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editProductQuantity, { error }] = useMutation(EDIT_PRODUCT_QUANTITY);
  const resetForm = () => {};
  const isValid = () => {
    if (amount === null ) return false;
    if (comment.length === 0) return false;
    return true;
  };
  const editQuantity = () => {
    setLoading(true);
    editProductQuantity({
      variables: {
        productID: parseInt(productID),
        amountLeftChange: parseInt(amount),
        message: comment
      },
      refretchQueries: [{ LOAD_COLATIONS }],
    }).then(res => {
      handleClose();
      enqueueSnackbar("Add successfully",AlertSuccessProp);
    }).then(resetForm())
    .catch((e) => enqueueSnackbar("An error have happened",AlertErrorProp))
    .finally(setLoading(false));
  };

  const handleSubmit = ()=>{
    if (isValid()) editQuantity();
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  }
  return (
    <BudaModal
      title={title}
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
            label="Difference amount"
            type="number"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <TextField
            // required
            fullWidth
            multiline
            rows={3}
            id="outlined-basic"
            label="Note"
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

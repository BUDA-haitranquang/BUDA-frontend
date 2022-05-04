import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_INGREDIENT_QUANTITY } from "../../graphQl/ingredients/ingredientMutation";
import { Ingredient_Collation } from "../../graphQl/ingredients/ingredientQueries";
import { AlertErrorProp, AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";

const IngredientCollationModal = ({
                                    isOpen,
                                    handleClose,
                                    title,
                                    ingredientID,
                                    amountChange,
                                    desChange
                                  }) => {
  const [comment, setComment] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editIngredientQuantity, { error, data: quantityData }] = useMutation(
    EDIT_INGREDIENT_QUANTITY
  );
  const resetForm = () => {
    setComment("");
    setAmount(null);
  };

  const isValid = () => {
    if (amount === null) return false;
    if (comment.length === 0) return false;
    return true;
  };
  const editQuantity = () => {
    setLoading(true);
    editIngredientQuantity({
      variables: {
        ingredientID: parseInt(ingredientID),
        amountLeftChange: parseInt(amount),
        message: comment
      },
      refretchQueries: [{ query: Ingredient_Collation }]
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Add successfully", AlertSuccessProp);
      })
      .then(resetForm())
      .catch((e) =>
        enqueueSnackbar("An error have happened", AlertErrorProp)
      )
      .finally(setLoading(false));
  };

  const handleSubmit = () => {
    if (isValid()) editQuantity();
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  };

  useEffect(() => {
    const loadAmount = async () => {
      if (quantityData) {
        amountChange(quantityData.editIngredientQuantity.amountLeft);
      }
    };
    // const loadDes = async () => {
    //   if(quantityData){
    //     console.log(quantityData)''
    //   }
    // }
    loadAmount();
  }, [quantityData]);
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
            "& > :not(style)": { m: 1 }
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
              desChange(e.target.value);
            }}
          />
        </Box>
      }
    ></BudaModal>
  );
};

export default IngredientCollationModal;
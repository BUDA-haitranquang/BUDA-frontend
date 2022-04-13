import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { AlertErrorProp,AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { UPDATE_INGREDIENT_MUTATION } from "../../graphQl/ingredients/ingredientMutation";
import { LOAD_INGREDIENT,LOAD_INGREDIENTS } from "../../graphQl/ingredients/ingredientQueries";

const EditIngredientModal = ({ data, isOpen,handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const ingredient = data.ingredient;
    const [ name,setName ] = useState(ingredient.name);
    const [ price,setPrice ] = useState(ingredient.price);
    const [ amountLeft, setAmountLeft ] = useState(ingredient.amountLeft);
    const [ alertAmountLeft,setAlertAmountLeft ] = useState(ingredient.alertAmountLeft);
    const [ description, setDescription] = useState(ingredient.description);
    const [ updateIngredient ] = useMutation(UPDATE_INGREDIENT_MUTATION);
    const [ isLoading,setIsLoading] = useState(false);
    const resetForm = () => {
      setName("");
      setPrice(0);
      setAlertAmountLeft(0);
      setAmountLeft(0);
      setDescription("");
    }
    const editIngredient = () =>{
        setIsLoading(true);
        updateIngredient({
          variables: {
            ingredientID: ingredient.ingredientID,
            name: name,
            description: description,
            amountLeft: parseInt(amountLeft),
            price: parseFloat(price),
            alertAmountLeft: parseInt(alertAmountLeft),
          },
          refetchQueries: [
            {
              query: LOAD_INGREDIENT,
              variables:{
                ingredientID: ingredient.ingredientID,
              },
            },
            {
              query: LOAD_INGREDIENTS,
            }
          ],
        })
        .then((res) => {
          handleClose();
          enqueueSnackbar("Save product successfully", AlertSuccessProp);
        })
        .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
        .finally(setIsLoading(false));
    }
   

    const isFormValid = () => {
      // TODO: check định dạng (price, cost, ... phải là number)
      // + thông báo chi tiết cho từng lỗi, hiện tại đang báo chung lỗi "Invalid input"
      const isValid =
        name !== "" &&
        price >= 0 &&
        amountLeft >= 0 &&
        alertAmountLeft >= 0;
      return isValid;
    };

    const handleSubmit = () => {
      if (isFormValid()) {
        editIngredient();
        handleClose();
      } else enqueueSnackbar("Invalid input", AlertErrorProp);
    };

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      onOk={handleSubmit}
      isLoading={isLoading}
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
              required
              type="number"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              required
              type="number"
              label="alert"
              variant="outlined"
              value={alertAmountLeft}
              onChange={(e) => setAlertAmountLeft(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <TextField
              fullWidth
              required
              type="number"
              label="Amount Left"
              variant="outlined"
              value={amountLeft}
              onChange={(e) => setAmountLeft(e.target.value)}
              style={{ width: "48%" }}
            />
    
          </div>
        
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      }
    ></BudaModal>
  )
}
export default EditIngredientModal;
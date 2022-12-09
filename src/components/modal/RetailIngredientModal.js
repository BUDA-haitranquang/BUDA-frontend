import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { AlertErrorProp, AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { REATAIL_FROM_INGREDIENT } from "../../graphQl/ingredients/ingredientMutation";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import { useHistory } from "react-router-dom";
const RetailIngredientModal = ({ data, isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();
  const id = data.ingredient.ingredientID;
  const [ sku,setSKU ] = useState("");
  const [ price,setPrice ] = useState(0);  
  const [ retailIngredient ] = useMutation(REATAIL_FROM_INGREDIENT); 
  const [isLoading, setIsLoading] = useState(false);
  const handleRetailIngredient = () =>{
    setIsLoading(true);
    retailIngredient({
      variables: { 
        ingredientID: parseInt(id),
        productSKU: sku,
        price: parseFloat(price),
      },
      refetchQueries: [{ query: LOAD_PRODUCTS}]
    })
    .then(history.push("/Product"))
    .then((res) => {
      enqueueSnackbar("Ingredient Retail Successfully", AlertSuccessProp);
    })
    .catch((e) => enqueueSnackbar("Failed", AlertErrorProp))
    .finally(setIsLoading(false));
  };
  const isFormValid = () => {
    // TODO: check định dạng (price, cost, ... phải là number)
    // + thông báo chi tiết cho từng lỗi, hiện tại đang báo chung lỗi "Invalid input"
    const isValid =
      sku !== "" && price !== "";
    return isValid;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      handleRetailIngredient();
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
            "& > :not(style)": { m: 1 }
          }}
        >
          <TextField
            fullWidth
            label="Code (SKU)"
            variant="outlined"
            value={sku}
            onChange={(e) => setSKU(e.target.value)}
          />
            <TextField
              required
              type="number"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "48%" }}
            />
        </Box>
      }
    ></BudaModal>
  );
};
export default RetailIngredientModal;

import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_INGREDIENT_MUTATION } from "../../graphQl/ingredients/ingredientMutation";
import { LOAD_INGREDIENTS } from "../../graphQl/ingredients/ingredientQueries";

const AddIngredientModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["common","ingredient"]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState(null);
  const [price, setPrice] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  // const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");
  const [newIngredient, { error }] = useMutation(ADD_INGREDIENT_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setSku(null);
    setName("");
    setPrice(0);
    setAmountLeft(0);
    setDescription("");
  };

  const addIngredient = () => {
    setIsLoading(true);
    newIngredient({
      variables: {
        name: name,
        ingredientSKU: sku,
        description: description,
        price: parseFloat(price),
        amountLeft: parseInt(amountLeft)
      },
      refetchQueries: [{ query: LOAD_INGREDIENTS }]
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Add new ingredient successfully", AlertSuccessProp);
      })
      .then(resetForm())
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
      .finally(setIsLoading(false));
  };

  const isFormValid = () => {
    const isValid =
      name !== "" &&
      !isNaN(price) &&
      price >= 0 &&
      !isNaN(amountLeft) &&
      amountLeft >= 0;

    return isValid;
  };

  const handleSubmit = () => {
    isFormValid()
      ? addIngredient()
      : enqueueSnackbar("Invalid input", AlertErrorProp);
  };

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      textOk={t("common:save")}
      onOk={handleSubmit}
      isLoading={isLoading}
      title={t("ingredient:addIngredientModal.title")}
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
            id="outlined-basic"
            label={t("ingredient:SKU")}
            variant="outlined"
            value={sku}
            onChange={(e) => {
              let skuText = e.target.value;
              if (skuText && skuText.length > 0) setSku(e.target.value);
              else setSku(null);
            }}
          />
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label={t("ingredient:Name")}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            required
            fullWidth
            type="number"
            id="outlined-basic"
            label={t("ingredient:Price")}
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            fullWidth
            required
            type="number"
            id="outlined-basic"
            label={t("ingredient:Left")}
            variant="outlined"
            value={amountLeft}
            onChange={(e) => setAmountLeft(e.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label={t("ingredient:Description")}
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      }
    />
  );
};

export default AddIngredientModal;

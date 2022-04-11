import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { UPDATE_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";
import {
  LOAD_PRODUCT,
  LOAD_PRODUCTS,
} from "../../graphQl/products/productQueries";

const EditProductModal = ({ data, isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const product = data.product.product;
  console.log(product);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.sellingPrice);
  const [amountLeft, setAmountLeft] = useState(product.amountLeft);
  const [alertAmount, setAlertAmount] = useState(product.alertAmount);
  const [costPerUnit, setCostPerUnit] = useState(product.costPerUnit);
  const [group, setGroup] = useState(product.group);
  const [description, setDescription] = useState(product.description);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setPrice(0);
    setAmountLeft(0);
    setAlertAmount(0);
    setCostPerUnit(0);
    setGroup("");
    setDescription("");
  }

  const editProduct = () => {
    setIsLoading(true);
    updateProduct({
      variables: {
        productID: product.productID,
        name: name,
        description: description,
        costPerUnit: parseFloat(costPerUnit),
        amountLeft: parseInt(amountLeft),
        alertAmount: parseInt(alertAmount),
        sellingPrice: parseFloat(price),
      },
      refetchQueries: [
        {
          query: LOAD_PRODUCT,
          variables: {
            productID: product.productID,
          },
        },
        {
          query: LOAD_PRODUCTS,
        },
      ],
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Save product successfully", AlertSuccessProp);
      })
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
      .finally(setIsLoading(false));
  };

  const isFormValid = () => {
    // TODO: check định dạng (price, cost, ... phải là number)
    // + thông báo chi tiết cho từng lỗi, hiện tại đang báo chung lỗi "Invalid input"
    const isValid =
      name !== "" &&
      price >= 0 &&
      amountLeft >= 0 &&
      costPerUnit >= 0 &&
      alertAmount >= 0;
    return isValid;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      editProduct();
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
              label="Cost"
              variant="outlined"
              value={costPerUnit}
              onChange={(e) => setCostPerUnit(e.target.value)}
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
            <TextField
              fullWidth
              required
              type="number"
              label="Alert Amount"
              variant="outlined"
              value={alertAmount}
              onChange={(e) => setAlertAmount(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>
          <TextField
            fullWidth
            label="Group"
            variant="outlined"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
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
  );
};

export default EditProductModal;

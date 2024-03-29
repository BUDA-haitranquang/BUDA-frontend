import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertErrorProp, AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { UPDATE_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";
import { LOAD_PRODUCT, LOAD_PRODUCTS } from "../../graphQl/products/productQueries";

const EditProductModal = ({ data, isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["common", "product"]);

  const product = data.product.product;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.sellingPrice);
  const [amountLeft, setAmountLeft] = useState(product.amountLeft);
  const [alertAmount, setAlertAmount] = useState(product.alertAmount);
  const [costPerUnit, setCostPerUnit] = useState(product.costPerUnit);
  const [sku, setSku] = useState(product.sku);
  const [description, setDescription] = useState(product.description);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  const [isLoading, setIsLoading] = useState(false);

  const editProduct = () => {
    setIsLoading(true);
    updateProduct({
      variables: {
        productID: product.productID,
        productSKU: sku,
        name: name,
        description: description,
        costPerUnit: parseFloat(costPerUnit),
        amountLeft: parseInt(amountLeft),
        alertAmount: parseInt(alertAmount),
        sellingPrice: parseFloat(price)
      },
      refetchQueries: [
        {
          query: LOAD_PRODUCT,
          variables: {
            productID: product.productID
          }
        },
        {
          query: LOAD_PRODUCTS
        }
      ]
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
      sku !== "" &&
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
      title={t("product:editProductModal.title")}
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
            label={t("product:sku")}
            variant="outlined"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label={t("product:productName")}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <TextField
              required
              label={t("product:price")}
              variant="outlined"
              value={price.toLocaleString()}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              required
              label={t("product:cost")}
              variant="outlined"
              value={costPerUnit.toLocaleString()}
              onChange={(e) => setCostPerUnit(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px"
            }}
          >
            <TextField
              fullWidth
              required
              label={t("product:amountLeft")}
              variant="outlined"
              value={amountLeft.toLocaleString()}
              onChange={(e) => setAmountLeft(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              fullWidth
              required
              label={t("product:alertAmount")}
              variant="outlined"
              value={alertAmount.toLocaleString()}
              onChange={(e) => setAlertAmount(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>
          <TextField
            fullWidth
            label={t("product:description")}
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

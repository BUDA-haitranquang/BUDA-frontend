import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import axios from "axios";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";

const AddProductModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { jwt, isAuth, refreshJwt } = useSelector((state) => state.token);
  const [image, setImage] = useState();
  const { t } = useTranslation(["common", "product"]);

  const [name, setName] = useState("");
  const [sku, setSku] = useState(null);
  const [price, setPrice] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  const [alertAmount, setAlertAmount] = useState(0);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [description, setDescription] = useState("");
  const [newProduct, { error }] = useMutation(ADD_PRODUCT_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const resetForm = () => {
    setSku(null);
    setName("");
    setPrice(0);
    setAmountLeft(0);
    setAlertAmount(0);
    setCostPerUnit(0);
    setDescription("");
    setImage(null);
  };

  const addProduct = (pictureID) => {
    setIsLoading(true);
    newProduct({
      variables: {
        productSKU: sku,
        name: name,
        description: description,
        costPerUnit: parseFloat(costPerUnit),
        amountLeft: parseInt(amountLeft),
        alertAmount: parseInt(alertAmount),
        sellingPrice: parseFloat(price),
        pictureID: pictureID === "" ? undefined : parseInt(pictureID),
      },
      refetchQueries: [{ query: LOAD_PRODUCTS }],
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Add new product successfully", AlertSuccessProp);
      })
      .then(resetForm())
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

  async function compressImage(imageFile) {
    const options = {
      maxSizeMB: 1,
      alwaysKeepResolution: true,
    };
    return await imageCompression(imageFile, options);
  }

  const handleSubmit = async () => {
    if (isFormValid()) {
      if (image) submitImage().then((res) => addProduct(res.data.pictureID));
      else addProduct("");
    } else enqueueSnackbar("Invalid input", AlertErrorProp);
  };

  const submitImage = async () => {
    let formData = new FormData();
    let imageCompressed = await compressImage(image);
    formData.append("file", imageCompressed);
    return axios({
      method: "post",
      url: "http://103.173.228.124:8080/api/picture/upload",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: formData,
    }).catch((err) => enqueueSnackbar("Upload image error", AlertErrorProp));
  };

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      textOk={t("common:save")}
      onOk={handleSubmit}
      isLoading={isLoading}
      title={t("product:addProductModal.title")}
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
            fullWidth
            id="outlined-basic"
            label={t("product:sku")}
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
            label={t("product:productName")}
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
              id="outlined-basic"
              label={t("product:price")}
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              required
              type="number"
              id="outlined-basic"
              label={t("product:cost")}
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
              id="outlined-basic"
              label={t("product:amountLeft")}
              variant="outlined"
              value={amountLeft}
              onChange={(e) => setAmountLeft(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="outlined-basic"
              label={t("product:alertAmount")}
              variant="outlined"
              value={alertAmount}
              onChange={(e) => setAlertAmount(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>
          <TextField
            fullWidth
            id="outlined-basic"
            label={t("product:description")}
            variant="outlined"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box style={{ maxHeight: "120px" }}>
            <>
              <input
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleUpload}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  <UploadIcon />
                  {t("addProductModal:uploadImage")}
                </Button>
              </label>
            </>
            {image && (
              <img
                alt="product-preview"
                src={preview}
                height="120px"
                style={{ marginLeft: "40px" }}
              />
            )}
            {image && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setImage(null)}
              >
                <DeleteIcon />
                {t("addProductModal:removeImage")}
              </Button>
            )}
          </Box>
        </Box>
      }
    ></BudaModal>
  );
};

export default AddProductModal;

import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import axios from "axios";
import { useSelector } from "react-redux";

const AddProductModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { jwt, isAuth, refreshJwt } = useSelector((state) => state.token);
  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  const [alertAmount, setAlertAmount] = useState(0);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [pictureID, setPictureID] = useState("");
  const [newProduct, { error }] = useMutation(ADD_PRODUCT_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setPrice(0);
    setAmountLeft(0);
    setAlertAmount(0);
    setCostPerUnit(0);
    setGroup("");
    setDescription("");
  };

  const addProduct = () => {
    setIsLoading(true);
    newProduct({
      variables: {
        name: name,
        description: description,
        costPerUnit: parseFloat(costPerUnit),
        amountLeft: parseInt(amountLeft),
        alertAmount: parseInt(alertAmount),
        sellingPrice: parseFloat(price),
        pictureID: parseInt(pictureID),
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

  const handleSubmit = async () => {
    if (isFormValid()) {
      submitImage();
      addProduct();
    } else enqueueSnackbar("Invalid input", AlertErrorProp);
  };
  const submitImage = async () => {
    let formData = new FormData();
    await formData.append("file", image);
    console.log(formData);
    await axios({
      method: "post",
      url: "http://103.173.228.124:8080/api/picture/upload",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: formData,
    })
      .then((res) => {
        const id = res.data.pictureID;
        setPictureID(id);
      })
      .catch((err) => console.log("fail: ", err));
  };
  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
    console.log(image);
  };

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      textOk="Save"
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
            id="outlined-basic"
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
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              required
              type="number"
              id="outlined-basic"
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
              id="outlined-basic"
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
              id="outlined-basic"
              label="Alert Amount"
              variant="outlined"
              value={alertAmount}
              onChange={(e) => setAlertAmount(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Group"
            variant="outlined"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
              Upload picture
            </Button>
          </label>
        </Box>
      }
    ></BudaModal>
  );
};

export default AddProductModal;

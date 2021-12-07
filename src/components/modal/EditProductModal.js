import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";
import { HIDE_PRODUCT, LOAD_PRODUCTS } from "../../graphQl/products/productQueries";

const EditProductModal = ({data, isOpen, handleClose }) => {
  const product = data.product;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [amountLeft, setAmountLeft] = useState(product.amountLeft);
  const [costPerUnit, setCostPerUnit] = useState(product.costPerUnit);
  const [group, setGroup] = useState(product.group);
  const [description, setDescription] = useState(product.description);

  
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
//   const data = useQuery(HIDE_PRODUCT);

  const editProduct = () => {
    updateProduct({
      variables:{
        name: name,
        description: description,
        costPerUnit: parseFloat(costPerUnit),
        amountLeft: parseInt(amountLeft),
        sellingPrice: parseFloat(price)
      },
      refetchQueries: [{query: LOAD_PRODUCTS}]
    });
  }

//   const deleteProduct = () => {
//     hideProduct({
//         variables:{
//             productID: data.productID
//         }
//     })
//   }

  const isFormValid = () => {
    const isValid = (name !== "") && (price >= 0) && (amountLeft >= 0) && (costPerUnit >= 0);
    return isValid;
  }

  const handleSubmit = () => {
    if(isFormValid()) {
      editProduct();
      handleClose();
    }
    else alert("Invalid input");
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Box
          component="form"
          autoComplete="off"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 5,
            outline: 0,
            "& > :not(style)": { m: 1 },
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box mt={1}>
              <Typography align="center">Add</Typography>
            </Box>

            <IconButton onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <TextField
              required
              type="number"
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{width: "48%"}}
            />
            <TextField
              required
              type="number"
              id="outlined-basic"
              label="Cost"
              variant="outlined"
              value={costPerUnit}
              onChange={(e) => setCostPerUnit(e.target.value)}
              style={{width: "48%"}}
            />
          </div>
          
          <TextField
            fullWidth
            required
            type="number"
            id="outlined-basic"
            label="Amount Left"
            variant="outlined"
            value={amountLeft}
            onChange={(e) => setAmountLeft(e.target.value)}
          />
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
          <Button 
            variant="contained" 
            onClick={handleSubmit}
          >
            Add Product
          </Button>
        </Box>
        
      </div>
    </Modal>
  );
};

export default EditProductModal;

import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  IconButton,
  Button,
  getTextFieldUtilityClass,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";
const AddCustomerModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  const [cost, setCost] = useState(0);
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");

  const isFormValid = () => {
    const isValid = (name !== "") 
                    && (!isNaN(price) && price >= 0)
                    && (!isNaN(amountLeft) && amountLeft >= 0)
                    && (!isNaN(cost) && cost >= 0);
    return isValid;
  }

  const handleSubmit = (e) => {
    if(isFormValid()) {
      const arr = {name, price, amountLeft, cost, group, description};
      dp(addProduct(arr));
      handleClose();
    }
    else alert("Invalid input");
  }

  const dp = useDispatch();

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
              value={cost}
              onChange={(e) => setCost(e.target.value)}
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
            onClick={()=>{
              handleSubmit();
            }}>
            Add Product
          </Button>
        </Box>
        
      </div>
    </Modal>
  );
};

export default AddCustomerModal;

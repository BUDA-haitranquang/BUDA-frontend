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
import { useMutation } from "@apollo/client";
import { ADD_INGREDIENT_MUTATION } from "../../graphQl/ingredients/ingredientMutation";
import { LOAD_INGREDIENTS } from "../../graphQl/ingredients/ingredientQueries";
const AddIngredientModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  // const [cost, setCost] = useState(0);
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [newIngredient,{error}] = useMutation(ADD_INGREDIENT_MUTATION);
   
  const addIngredient = ()=>{
    newIngredient({
      variables:{
        name: name,
        description:description,
        price:parseFloat(price),
        amountLeft:parseInt(amountLeft)
      },
      refetchQueries:[{query: LOAD_INGREDIENTS}]
    });
  }


  const isFormValid = () => {
    const isValid = (name !== "") 
                    && (!isNaN(price) && price >= 0)
                    && (!isNaN(amountLeft) && amountLeft >= 0);
                    // && (!isNaN(cost) && cost >= 0);
    return isValid;
  }

  const handleSubmit = () => {
    if(isFormValid()) {
        addIngredient()
        handleClose()
      } 
      else alert('InvalidInput');
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
              <Typography align="center">Add Ingredient</Typography>
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
          
            <TextField
              required
              fullWidth
              type="number"
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            
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
            Add 
          </Button>
        </Box>
        
      </div>
    </Modal>
  );
};

export default AddIngredientModal;

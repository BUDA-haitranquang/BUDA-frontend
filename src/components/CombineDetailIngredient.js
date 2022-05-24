import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import RetailFromIngredientModal from "./modal/RetailFromIngredientModal";
CombinedDetail.propTypes = {};

function CombinedDetail(props) {
  const { data, Modal, Information, handleDelete } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleRetailOpen = () => setOpen(true);
  const handleRetailClose = () => setOpen(false);
  return (
    <div>
      <Grid
        container
        spacing={1}
        style={{
          width: "92%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-evenly"
        }}
      >
        <Grid item xs={12}>
          <Information data={data} />
        </Grid>
        <Grid
          container
          style={{
            width: "100%",
            justifyContent: "flex-end",
            marginTop: "20px"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            sx={{ width: "15%", marginRight: "2%" }}
            onClick={handleOpen}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<DeleteIcon />}
            sx={{ width: "15%",marginRight: "2%" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ width: "15%", marginRight: "2%" }}
            onClick={(e) => {setOpen(true)}}
            endIcon={<AddCircleOutlineIcon/>}
          >
            Retail
          </Button>
        </Grid>
        <RetailFromIngredientModal 
        isOpen = {open} 
        handleClose = {handleRetailClose} 
        id = {data.ingredient.ingredientID} 
        price = { data.ingredient.price}/>
        <Modal isOpen={isOpen} handleClose={handleClose} data={data} />
      </Grid>
    </div>
  );
}

export default CombinedDetail;

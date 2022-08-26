import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
IngredientCombinedDetail.propTypes = {};

function IngredientCombinedDetail(props) {
  const { data, Modal, Information, handleDelete , RetailModal } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [ retailOpen,setRetailOpen ] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleRetailOpen = () => setRetailOpen(true);
  const handleRetailClose = () => setRetailOpen(false);
  
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
            color="warning"
            endIcon={<AddCircleOutlineIcon />}
            sx={{ width: "15%" }}
            onClick={()=>handleRetailOpen()}
          >
            Retail
          </Button>
        </Grid>
        <RetailModal isOpen={retailOpen} handleClose={handleRetailClose} data = {data}/>
        <Modal isOpen={isOpen} handleClose={handleClose} data={data} />
      </Grid>
    </div>
  );
}

export default IngredientCombinedDetail;

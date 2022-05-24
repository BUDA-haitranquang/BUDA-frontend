import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import RetailFromProductModal from "../components/modal/RetailFromProductModal";
CombinedDetailProduct.propTypes = {};

function CombinedDetailProduct(props) {
  const { data, Modal, Information, handleDelete } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
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
            sx={{ width: "15%" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          {/* <Button
            variant="contained"
            // endIcon={<DeleteIcon />}
            sx={{ width: "1%" }}
            onClick={(e)=>{setOpen(true)}}
          >
            Retail
          </Button> */}
        </Grid>
        {/* <RetailFromProductModal
          isOpen = {open}
          handleClose = {handleRetailClose}
          data = {data.product.product}
          title = {"Title"}
        /> */}
        <Modal isOpen={isOpen} handleClose={handleClose} data={data} />
      </Grid>
    </div>
  );
}

export default CombinedDetailProduct;

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";

CombinedDetail.propTypes = {};

function CombinedDetail(props) {
  const { data, Modal, Information, handleDelete } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        style={{
          width: "92%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-evenly",
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
            marginTop: "20px",
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
        </Grid>
        <Modal isOpen={isOpen} handleClose={handleClose} data={data} />
      </Grid>
    </div>
  );
}

export default CombinedDetail;

import { Button, Divider, Grid, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from "@mui/system";
import React from "react";

export default function Information({data}) {
  const {name, sellingPrice, amountLeft, alertAmount, costPerUnit, description} = data.product;
  return (
    <Grid container 
      direction="column" 
      style={{ height: "100%", justifyContent: "space-between", marginLeft: "5%"}}
    >
      <Typography variant="subtitle2" style={{textTransform : "uppercase"}}>{name}</Typography>

      <Box style={{flexDirection: "column"}}>
        <Typography variant="h3" style={{marginBottom: "3%"}}>{name}</Typography>
        <Typography variant="subtitle3" style={{fontStyle: "italic"}}>{description}</Typography>
        <Typography variant="h4">{sellingPrice} $</Typography>
      </Box>

      <Divider />

      <Grid container style={{ width: "40%", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" startIcon={<EditIcon/>}>Edit</Button>
        <Button variant="contained" color="error" endIcon={<DeleteIcon/>}>Delete</Button>
      </Grid>
      
    </Grid>
  );
}

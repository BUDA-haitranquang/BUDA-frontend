import { Button, Divider, Grid, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from "@mui/system";
import React from "react";

export default function Information({ data }) {
  console.log(data);
  return (
    <Grid container 
      direction="column" 
      style={{ height: "100%", justifyContent: "space-between", marginLeft: "5%"}}
    >
      <Typography variant="subtitle2" style={{textTransform : "uppercase"}}>{data.category}</Typography>
      <Box style={{flexDirection: "column"}}>
        <Typography variant="h3" style={{marginBottom: "3%"}}>{data.name}</Typography>
        <Typography variant="subtitle3" style={{fontStyle: "italic"}}>{data.description}</Typography>
        <Typography variant="h4">{data.price} $</Typography>
      </Box>
      <Divider />
      <Grid container style={{ width: "40%", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" startIcon={<EditIcon/>}>Edit</Button>
        <Button variant="contained" color="error" endIcon={<DeleteIcon/>}>Delete</Button>
      </Grid>
    </Grid>
    // <Grid container direction="column" style={{ height: "100%", padding: "10px" }}>
    //   <Typography variant="subtitle2">Homemade</Typography>
    //   <Divider />
    //   <Box>
    //     <Typography variant="h3">Handmade Cotton Soap</Typography>
    //     <Typography variant="subtitle1">This is where the description stays at.</Typography>
    //     <Typography variant="h4">315.00 $</Typography>
    //   </Box>
    //   <Grid container style={{ width: "100%", marginTop: "auto" }}>
    //     <Button variant="contained" color="primary">Edit</Button>
    //     <Button variant="contained" color="secondary">Delete</Button>
    //   </Grid>
    // </Grid>
  );
}

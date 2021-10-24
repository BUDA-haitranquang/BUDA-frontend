import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Information({ data }) {
  return (
    // <Grid container direction="column" style={{ height: "100%" }}>
    //   <Typography variant="subtitle2">{data.category}</Typography>
    //   <Divider />
    //   <Box>
    //     <Typography variant="h3">{data.title}</Typography>
    //     <Typography variant="subtitle1">{data.description}</Typography>
    //     <Typography variant="h4">{data.price} $</Typography>
    //   </Box>
    //   <Grid container style={{ width: "100%" }}>
    //     <Button variant="contained" color="primary">Edit</Button>
    //     <Button variant="contained" color="secondary">Delete</Button>
    //   </Grid>
    // </Grid>
    <Grid container direction="column" style={{ height: "100%", padding: "10px" }}>
      <Typography variant="subtitle2">Homemade</Typography>
      <Divider />
      <Box>
        <Typography variant="h3">Handmade Cotton Soap</Typography>
        <Typography variant="subtitle1">This is where the description stays at.</Typography>
        <Typography variant="h4">315.00 $</Typography>
      </Box>
      <Grid container style={{ width: "100%", marginTop: "auto" }}>
        <Button variant="contained" color="primary">Edit</Button>
        <Button variant="contained" color="secondary">Delete</Button>
      </Grid>
    </Grid>
  );
}

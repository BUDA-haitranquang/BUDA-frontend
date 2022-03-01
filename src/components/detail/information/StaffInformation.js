import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function StaffInformation({data}) {
  const {name, email, phoneNumber, address, staffPosition, salary} = data.staff;
  return (
    <Grid container 
      direction="column" 
      style={{ height: "100%", justifyContent: "space-between", marginLeft: "5%"}}
    >
      <Typography variant="subtitle2" style={{textTransform : "uppercase"}}>{name}</Typography>

      <Box style={{flexDirection: "column"}}>
        <Typography variant="h3" style={{marginBottom: "3%"}}>{name}</Typography>
        <Typography variant="subtitle3" style={{fontStyle: "italic"}}>{email}</Typography>
        <Typography variant="h4" style={{}}>{address}</Typography>
        <Divider/>
        <Box style={{
          marginTop: "40px",
          display: "flex", 
          justifyContent: "space-between",
        }}>
          <Typography variant="subtitle3">Phone: {phoneNumber}</Typography>
          <Typography variant="subtitle3" style={{}}>Position: {staffPosition}</Typography>
          <Typography variant="subtitle3" style={{}}>Salary: {salary}</Typography>
        </Box>
      </Box>

      <Divider />
      
    </Grid>
  );
}

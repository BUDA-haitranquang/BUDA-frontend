import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import CustomerGrid from "./customer/CustomerGrid";
import Navbar from "./Navbar";
import MainOrderGrid from "./order/MainOrderGrid";

export const color1 = "#FAFAFA";
export const color2 = "#3399FF";
export const color3 = "#D1D1D1";
export const color4 = "#FFFFFF";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color1}`,
    height: "100vh",
    overflow: "hidden",
  },
}));

export default function CreateOrder() {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Navbar />
      <Grid container sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <MainOrderGrid />
        <CustomerGrid />
      </Grid>
    </Box>
  );
}

import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { makeStyles } from "@mui/styles";
import Navbar from "./Navbar";
import OrderProducts from "./order/itemspane/OrderProducts";
import SearchProductBar from "./order/itemspane/SearchProductBar";
import Services from "./order/others/services/Services";
import Shipping from "./order/others/Shipping";
import EditableMoneyBox from "./EditableMoneyBox";
import UneditableMoneyBox from "./UneditableMoneyBox";

export const color1 = "#FAFAFA";
export const color2 = "#3399FF";
export const color3 = "#D1D1D1";
export const color4 = "#FFFFFF";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color1}`,
    height: "100vh",
    overflow: "hidden",
    "& .others": {
      "& .MuiGrid-root": {
        height: "26vh",
        backgroundColor: `${color4}`,
        border: "2px solid gray",
        padding: "6px",
        overflow: "hidden",
      },
    },
  },
}));

export default function CreateOrder() {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Navbar />
      <Grid container sx={{ margin: "10px" }}>
        <Grid item xs={8} className="order">
          <SearchProductBar />
          <Box className="itemsPane">
            <OrderProducts />
            <Grid container className="others">
              <Services />
              <Shipping />
            </Grid>
          </Box>
          <Grid
            container
            className="costPane"
            justifyContent="space-evenly"
            sx={{ marginTop: "10px" }}
          >
            <UneditableMoneyBox xs={4} title="Total" />
            <EditableMoneyBox xs={4} title="Discount" />
            <UneditableMoneyBox xs={4} title="Final" />
          </Grid>
        </Grid>
        <Grid item xs={4} className="customer">
          <Box className={classes.searchCustomerBar}></Box>
          <Box className={classes.customerPane}></Box>
          <Box className={classes.customerPayment}></Box>
        </Grid>
      </Grid>
    </Box>
  );
}

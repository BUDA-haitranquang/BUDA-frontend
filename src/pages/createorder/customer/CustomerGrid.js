import { Grid } from "@mui/material";
import React from "react";
import CustomerInfo from "./customerInfoPane/CustomerInfo";
import SearchCustomerBar from "./customerInfoPane/SearchCustomerBar";
import CustomerPayment from "./customerPayment/CustomerPayment";

export default function CustomerGrid() {
  return (
    <Grid
      item
      xs={4}
      className="customer"
      sx={{ paddingLeft: "10px", paddingRight: "10px" }}
    >
      <SearchCustomerBar />
      <CustomerInfo />
      <CustomerPayment/>
    </Grid>
  );
}

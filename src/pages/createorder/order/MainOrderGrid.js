import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { React } from "react";
import CostGrid from "./costpane/CostGrid";
import OrderProducts from "./itemspane/OrderProducts";
import SearchProductBar from "./itemspane/SearchProductBar";
import Services from "./others/services/Services";
import Shipping from "./others/Shipping";

export default function MainOrderGrid() {
  return (
    <Grid item xs={8} className="order">
      <SearchProductBar />
      <Box className="itemsPane">
        <OrderProducts />
        <Grid container className="others">
          <Services />
          <Shipping />
        </Grid>
      </Box>
      <CostGrid />
    </Grid>
  );
}

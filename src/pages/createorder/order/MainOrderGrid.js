import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { React } from "react";
import { color4 } from "../CreateOrder";
import CostGrid from "./costpane/CostGrid";
import OrderProducts from "./itemspane/OrderProducts";
import SearchProductBar from "./itemspane/SearchProductBar";
import Services from "./others/services/Services";
import Shipping from "./others/Shipping";

const useStyle = makeStyles(() => ({
  root: {
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

export default function MainOrderGrid() {
  const classes = useStyle();
  return (
    <Grid item xs={8} className={classes.root}>
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

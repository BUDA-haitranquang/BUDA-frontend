import React from "react";
import PropTypes from "prop-types";
import BoxSupplier from "./components/BoxSupplier/BoxSupplier";
import { Box, Grid, Toolbar } from "@mui/material";
import BoxAdditionalInfo from "./components/BoxAdditionalInfo/BoxAdditionalInfo";
import Sidebar from "../../../components/Sidebar";
import BoxIngredient from "./components/BoxIngredient/BoxIngredient";

CreateBuyOrder.propTypes = {};

function CreateBuyOrder(props) {
  const { window } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Buy Order" />

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box padding={3} width="100%">
          <Grid container spacing={3} height={300} bgcolor="#f0f2f5">
            <Grid item sm={12} md={9} maxHeight={300}>
              <BoxSupplier />
            </Grid>
            <Grid item sm={12} md={3} maxHeight={300}>
              <BoxAdditionalInfo />
            </Grid>
            <Grid item xs={12}>
              <BoxIngredient />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateBuyOrder;

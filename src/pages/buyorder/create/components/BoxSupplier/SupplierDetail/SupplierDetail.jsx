import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import useStyles from "./SupplierDetail.styles";

SupplierDetail.propTypes = {
  supplier: PropTypes.object,
};

function SupplierDetail(props) {
  const { supplier } = props;

  const classes = useStyles();

  return supplier ? (
    <Grid className={classes.root} container xs={12} md={4} spacing={3}>
      <Box display="flex" justifyContent="space-between">
        <Typography color="#747C87">Address</Typography>
        <Typography>{supplier.address || ""}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography color="#747C87">Email</Typography>
        <Typography>{supplier.email || ""}</Typography>
      </Box>
    </Grid>
  ) : (
    <></>
  );
}

export default SupplierDetail;

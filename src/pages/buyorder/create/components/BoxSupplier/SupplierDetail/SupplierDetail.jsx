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
    <Grid container spacing={2}>
      <Grid className={classes.root} item xs={12} md={4}>
        <Box className="SupplierDetail-info">
          <Typography className="SupplierDetail-info-field">Address</Typography>
          <Typography>{supplier.address || ""}</Typography>
        </Box>

        <Box className="SupplierDetail-info">
          <Typography className="SupplierDetail-info-field">Email</Typography>
          <Typography>{supplier.email || ""}</Typography>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default SupplierDetail;

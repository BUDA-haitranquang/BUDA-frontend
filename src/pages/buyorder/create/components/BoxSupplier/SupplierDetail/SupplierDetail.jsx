import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import useStyles from "./SupplierDetail.styles";
import { useTranslation } from "react-i18next";

SupplierDetail.propTypes = {
  supplier: PropTypes.object,
};

function SupplierDetail(props) {
  const { t } = useTranslation("buyorder", { keyPrefix: "create.boxSupplier" });
  const { supplier } = props;

  const classes = useStyles();

  return supplier ? (
    <Grid container spacing={2}>
      <Grid className={classes.root} item xs={12} md={4}>
        <Box className="SupplierDetail-info">
          <Typography className="SupplierDetail-info-field">
            {t("address")}
          </Typography>
          <Typography>{supplier.address || ""}</Typography>
        </Box>

        <Box className="SupplierDetail-info">
          <Typography className="SupplierDetail-info-field">
            {t("email")}
          </Typography>
          <Typography>{supplier.email || ""}</Typography>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default SupplierDetail;

import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import useStyles from "./PrimaryInfoDetail.styles";
import { useTranslation } from "react-i18next";

PrimaryInfoDetail.propTypes = {
  discount: PropTypes.object,
};

function PrimaryInfoDetail(props) {
  const { discount } = props;
  const { t } = useTranslation("discount", {
    keyPrefix: "detail.boxPrimaryInfo",
  });

  const classes = useStyles();

  return discount ? (
    <Grid container spacing={2}>
      <Grid item className={classes.root} xs={12} md={4}>
        <Box className="DiscountPrimaryDetail-info">
          <Typography className="DiscountPrimaryDetail-info-field">
            {t("percentage")}
          </Typography>
          <Typography>{discount.percentage || 0.0}%</Typography>
        </Box>

        <Box className="DiscountPrimaryDetail-info">
          <Typography className="DiscountPrimaryDetail-info-field">
            {t("cashLimit")}
          </Typography>
          <Typography>{discount.cashLimit || 0.0}</Typography>
        </Box>

        <Box className="DiscountPrimaryDetail-info">
          <Typography className="DiscountPrimaryDetail-info-field">
            {t("orderCount")}
          </Typography>
          <Typography>{discount.orderCount || 0.0}</Typography>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default PrimaryInfoDetail;

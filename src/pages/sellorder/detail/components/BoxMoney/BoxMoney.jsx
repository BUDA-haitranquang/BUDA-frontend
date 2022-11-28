import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import useStyles from "./BoxMoney.styles";
import { useTranslation } from "react-i18next";

function BoxMoney(props) {
  const { totalMoney } = props;
  const { t } = useTranslation("buyorder", {keyPrefix: "detail.boxTotalMoney"})

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxMoney-block">
        <Typography className="BoxMoney-block-field">{t("total")}:</Typography>
        <Typography fontWeight="bold" fontSize={20}>
          {totalMoney?.toLocaleString()}đ
        </Typography>
      </Box>
    </Paper>
  );
}

export default BoxMoney;

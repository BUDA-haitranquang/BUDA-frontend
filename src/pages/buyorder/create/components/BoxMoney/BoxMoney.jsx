import React, { useContext } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { CreateBuyOrderContext } from "../../context/CreateBuyOrderContext";
import useStyles from "./BoxMoney.styles";
import { useTranslation } from "react-i18next";

function BoxMoney() {
  const { buyOrderRequest } = useContext(CreateBuyOrderContext);
  const { t } = useTranslation("buyorder", { keyPrefix: "detail.boxTotalMoney" });

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxMoney-block">
        <Typography className="BoxMoney-block-field">{t("total")}:</Typography>
        <Typography fontWeight="bold" fontSize={20}>
          {buyOrderRequest.buyOrderItemDTOs
            ?.reduce(
              (previousValue, currentValue) =>
                previousValue +
                currentValue.quantity * currentValue.pricePerUnit,
              0
            )
            .toLocaleString()}
          đ
        </Typography>
      </Box>
    </Paper>
  );
}

export default BoxMoney;

import React, { useContext, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { CreateBuyOrderContext } from "../../context/CreateBuyOrderContext";
import useStyles from "./BoxMoney.styles";

function BoxMoney() {
  const { buyOrderRequest } = useContext(CreateBuyOrderContext);

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxMoney-block">
        <Typography className="BoxMoney-block-field">Total:</Typography>
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

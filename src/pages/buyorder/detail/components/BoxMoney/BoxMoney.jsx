import React, { useContext, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import useStyles from "./BoxMoney.styles";

function BoxMoney(props) {
  const { totalMoney } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxMoney-block">
        <Typography className="BoxMoney-block-field">Total:</Typography>
        <Typography fontWeight="bold" fontSize={20}>
          {totalMoney?.toLocaleString()}đ
        </Typography>
      </Box>
    </Paper>
  );
}

export default BoxMoney;

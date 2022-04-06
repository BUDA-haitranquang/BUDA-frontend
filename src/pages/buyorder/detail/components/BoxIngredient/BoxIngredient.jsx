import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import TableBuyOrderItem from "./TableBuyOrderItems/TableBuyOrderItem";
import useStyles from "./BoxIngredient.styles";
import PropTypes from "prop-types";

BoxIngredient.propTypes = {
  buyOrderItems: PropTypes.array,
};

function BoxIngredient(props) {
  const { buyOrderItems } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxIngredient-main">
        <Box className="BoxIngredient-header">
          <Typography variant="h6">Ingredient list</Typography>
        </Box>

        <TableBuyOrderItem buyOrderItems={buyOrderItems} />
      </Box>
    </Paper>
  );
}

export default BoxIngredient;

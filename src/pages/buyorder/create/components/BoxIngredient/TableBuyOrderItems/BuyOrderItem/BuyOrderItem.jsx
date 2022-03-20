import React from "react";
import PropTypes from "prop-types";
import { Box, TableCell, TableRow } from "@mui/material";

BuyOrderItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

function BuyOrderItem(props) {
  const { item, index } = props;

  const CellImage = () => {
    return <TableCell align="center" style={{ width: "60px" }}>
      <Box
        component="img"
        sx={{
          height: 64,
          width: 64,
        }}
        alt={item.ingredient.name}
        src={item.ingredient.picture.link}
      />
    </TableCell>
  }

  const CellSKU = () => {
    return <TableCell align="left" style={{ width: "200px"}}>
      {item.ingredient.sku}
    </TableCell>
  }

  const CellName = () => {
    return <TableCell align="left">
      {item.ingredient.name}
    </TableCell>
  }

  const CellQuantity = () => {
    return <TableCell align="center" style={{ width: "105px" }}>
      {item.quantity}
    </TableCell>
  }

  const CellPrice = () => {
    return <TableCell align="right" style={{ width: "115px" }}>
      {item.pricePerUnit}
    </TableCell>
  }

  const CellAmount = () => {
    return <TableCell align="right" style={{ width: "115px" }}>
      {item.quantity * item.pricePerUnit}
    </TableCell>
  }

  return (
    <TableRow>
      <TableCell align="center" style={{ width: "55px" }}>{index}</TableCell>
      {CellImage}
      {CellSKU}
      {CellName}
      {CellQuantity}
      {CellPrice}
      {CellAmount}
    </TableRow>
  );
}

export default BuyOrderItem;
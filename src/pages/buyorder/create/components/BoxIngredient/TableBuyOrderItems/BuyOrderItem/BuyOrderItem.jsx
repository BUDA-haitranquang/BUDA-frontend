import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, TableCell, TableRow } from "@mui/material";

BuyOrderItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

function BuyOrderItem(props) {
  const { item, index } = props;

  const CellImage = useMemo(() => {
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
  }, [item.ingredient.name, item.ingredient.picture.link]);

  const CellSKU = useMemo(() => {
    return <TableCell align="left" style={{ width: "200px"}}>
      {item.ingredient.sku}
    </TableCell>
  }, [item.ingredient.sku]);

  const CellName = useMemo(() => {
    return <TableCell align="left">
      {item.ingredient.name}
    </TableCell>
  }, [item.ingredient.name]);

  const CellQuantity = useMemo(() => {
    return <TableCell align="center" style={{ width: "105px" }}>
      {item.quantity}
    </TableCell>
  }, [item.quantity]);

  const CellPrice = useMemo(() => {
    return <TableCell align="right" style={{ width: "115px" }}>
      {item.pricePerUnit}
    </TableCell>
  }, [item.pricePerUnit]);

  const CellAmount = useMemo(() => {
    return <TableCell align="right" style={{ width: "115px" }}>
      {item.quantity * item.pricePerUnit}
    </TableCell>
  }, [item.quantity, item.pricePerUnit]);

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
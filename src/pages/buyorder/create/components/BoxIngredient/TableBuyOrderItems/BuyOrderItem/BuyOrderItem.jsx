import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, TableCell, TableRow } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Input from "@material-ui/core/Input";

BuyOrderItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
};

function BuyOrderItem(props) {
  const { item, index, onRemove } = props;
  const [pricePerUnit, setPricePerUnit] = useState(item.pricePerUnit);
  const [quantity, setQuantity] = useState(item.quantity);

  const handlePriceChange = (e) => {
    const price = e.target.value || 0;
    item.pricePerUnit = price;
    setPricePerUnit(price);
  };

  const handleQuantityChange = (e) => {
    const quantity = e.target.value || 0;
    item.quantity = quantity;
    setQuantity(quantity);
  };

  const CellImage = useMemo(() => {
    return (
      <TableCell align="center" style={{ width: "60px" }}>
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
    );
  }, [item.ingredient.name, item.ingredient.picture.link]);

  const CellSKU = useMemo(() => {
    return (
      <TableCell align="left" style={{ width: "200px" }}>
        {item.ingredient.sku}
      </TableCell>
    );
  }, [item.ingredient.sku]);

  const CellName = useMemo(() => {
    return <TableCell align="left">{item.ingredient.name}</TableCell>;
  }, [item.ingredient.name]);

  const CellQuantity = useMemo(() => {
    return (
      <TableCell align="center" style={{ width: "105px" }}>
        <Input
          inputProps={{
            style: { textAlign: "right" },
          }}
          value={item.quantity.toLocaleString()}
          onChange={(e) => handleQuantityChange(e)}
          name="quantity"
        />
      </TableCell>
    );
  }, [item.quantity]);

  const CellPrice = useMemo(() => {
    return (
      <TableCell align="right" style={{ width: "115px" }}>
        <Input
          inputProps={{
            style: { textAlign: "right" },
          }}
          value={item.pricePerUnit.toLocaleString()}
          onChange={(e) => handlePriceChange(e)}
          name="price-per-unit"
        />
      </TableCell>
    );
  }, [item.pricePerUnit]);

  const CellAmount = useMemo(() => {
    return (
      <TableCell align="right" style={{ width: "115px" }}>
        {(item.quantity * item.pricePerUnit).toLocaleString() || 0}
      </TableCell>
    );
  }, [item.quantity, item.pricePerUnit]);

  const CellRemove = useMemo(() => {
    return (
      <TableCell align="center" style={{ width: "95px" }}>
        <CancelOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => onRemove(item)}
        />
      </TableCell>
    );
  }, []);

  return (
    <TableRow key={index + 1}>
      <TableCell align="center" style={{ width: "55px" }}>
        {index}
      </TableCell>
      {CellImage}
      {CellSKU}
      {CellName}
      {CellQuantity}
      {CellPrice}
      {CellAmount}
      {CellRemove}
    </TableRow>
  );
}

export default BuyOrderItem;

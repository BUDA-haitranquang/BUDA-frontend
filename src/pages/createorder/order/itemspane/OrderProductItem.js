import Input from "@material-ui/core/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeProductCartItem,
  deleteProductCart,
} from "../../../../redux/productCartSlice";

export default function OrderProductItem({ row, serial }) {
  const [sellingPrice, setSellingPrice] = useState(row.sellingPrice);
  const [quantity, setQuantity] = useState(row.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setSellingPrice(row.sellingPrice);
    setQuantity(row.quantity);
  }, [row]);

  const handlePriceChange = (e) => {
    const price = e.target.value || 0;
    setSellingPrice(price);
    let data = { ...row };
    data.sellingPrice = parseFloat(price);
    dispatch(changeProductCartItem(data));
  };
  const handleQuantityChange = (e) => {
    const quantity = e.target.value || 0;
    setQuantity(quantity);
    let data = { ...row };
    data.quantity = parseInt(quantity);
    dispatch(changeProductCartItem(data));
  };

  return (
    <TableRow sx={{ cursor: "pointer" }} hover key={row.productID}>
      <TableCell align="left">{serial}</TableCell>
      <TableCell align="left">{row.productID}</TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">
        <Input
          inputProps={{
            style: { textAlign: "right" },
          }}
          type={"number"}
          value={sellingPrice}
          onChange={(e) => handlePriceChange(e)}
          name="selling-price"
        />
      </TableCell>
      <TableCell align="right">
        <Input
          inputProps={{
            style: { textAlign: "right" },
          }}
          type={"number"}
          value={quantity}
          onChange={(e) => handleQuantityChange(e)}
          name="quantity"
        />
      </TableCell>
      <TableCell align="right">
        <Input
          inputProps={{
            style: { textAlign: "right" },
          }}
          value={(sellingPrice * quantity).toLocaleString()}
          name="total"
        />
      </TableCell>
      <IconButton
        component="span"
        onClick={() => {
          dispatch(deleteProductCart(row));
        }}
      >
        <DeleteIcon />
      </IconButton>
    </TableRow>
  );
}

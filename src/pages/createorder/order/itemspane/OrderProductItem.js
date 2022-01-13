import { TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@material-ui/core/Input";
import { useDispatch } from "react-redux";
import { deleteProductCart, changePriceProductCart, changeProductCartItem } from "../../../../redux/productCartSlice";

export default function OrderProductItem({ row, serial }) {
  const [sellingPrice, setSellingPrice] = useState(row.sellingPrice);
  const [quantity, setQuantity] = useState(row.quantity);
  const dispatch = useDispatch();
  
  const handlePriceChange = (e) => {
    const price = e.target.value;
    setSellingPrice(price);
    const data = {row, price};
    dispatch(changeProductCartItem(data));
  }
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    const data = {row, quantity};
    dispatch(changeProductCartItem(data));
  }

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
          value={sellingPrice * quantity}
          name="total"
        />
      </TableCell>
      <IconButton
        color="error"
        component="span"
        onClick={() => {
          console.log(row);
          dispatch(deleteProductCart(row));
        }}
      >
        <DeleteIcon />
      </IconButton>
    </TableRow>
  );
}

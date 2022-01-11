import { TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@material-ui/core/Input";
import { useDispatch } from "react-redux";
import { deleteProductCart, changePriceProductCart } from "../../../../redux/productCartSlice";

export default function OrderProductItem({ row, serial }) {
  const [sellingPrice, setSellingPrice] = useState(row.sellingPrice);
  const dispatch = useDispatch();
  
  const handlePriceChange = (e) => {
    const price = e.target.value;
    setSellingPrice(price);
    const data = {row, price};
    dispatch(changePriceProductCart(data));
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
          value={row.quantity}
          name="quantity"
        />
      </TableCell>
      <TableCell align="right">
        <Input
          inputProps={{
            style: { textAlign: "right" },
          }}
          value={row.sellingPrice}
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

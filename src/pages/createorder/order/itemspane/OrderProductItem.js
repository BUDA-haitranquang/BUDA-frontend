import { TableCell, TableRow } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@material-ui/core/Input";
import { useDispatch } from "react-redux";
import { deleteProductCart } from "../../../../redux/productCartSlice";

export default function OrderProductItem({ row }) {
  const dispatch = useDispatch();
  return (
    <TableRow sx={{ cursor: "pointer" }} hover key={row.productID}>
      <TableCell align="left">1</TableCell>
      <TableCell align="left">{row.productID}</TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">{row.sellingPrice}</TableCell>
      <TableCell align="right">1</TableCell>
      <TableCell align="right">
        <Input
          inputProps={{
            style: { textAlign: "right" },
          }}
          value={row.sellingPrice}
          name="total"
        />
      </TableCell>
      <IconButton color="error" component="span">
        <DeleteIcon
          onClick={() => {
            console.log(row);
            dispatch(deleteProductCart(row));
          }}
        />
      </IconButton>
    </TableRow>
  );
}

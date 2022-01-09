import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function OrderProductItem({row}) {
  return (
    <TableRow sx={{ cursor: "pointer" }} hover key={row.productID}>
      <TableCell align="left">1</TableCell>
      <TableCell align="left">{row.productID}</TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">{row.sellingPrice}</TableCell>
      <TableCell align="right">1</TableCell>
      <TableCell align="right">{row.total}</TableCell>
    </TableRow>
  );
}

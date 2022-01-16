import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function ServiceItem({row}) {
  return (
    <TableRow sx={{ cursor: "pointer" }} hover key={row.id}>
      <TableCell align="left">{row.no}</TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.qty}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
    </TableRow>
  );
}

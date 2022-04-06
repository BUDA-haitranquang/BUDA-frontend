import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const ProductTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `${row.productID}`,}}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.name}
        </Link>
      </TableCell>

      <TableCell align="right">{row.sellingPrice}</TableCell>
      <TableCell align="right">{row.amountLeft}</TableCell>
      <TableCell align="right">{row.alertAmount}</TableCell>
      <TableCell align="right">{row.costPerUnit}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
    </>
  );
};

export default ProductTableBody;

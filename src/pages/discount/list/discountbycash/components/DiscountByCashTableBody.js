import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { dateToDateString } from "../../../../../utils/utils";
const DiscountByCashTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `discount/${row.discountID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.discountCode}
        </Link>
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">{row.cash}</TableCell>
      <TableCell align="right">{row.cashLimit}</TableCell>
      <TableCell align="right">{row.orderCount}</TableCell>
      <TableCell align="left">{dateToDateString(row.createdTime)}</TableCell>
      <TableCell align="left">{dateToDateString(row.expiryTime)}</TableCell>
    </>
  );
};

export default DiscountByCashTableBody;

import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const SellOrderTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `${row.sellOrderID}`,}}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.sellOrderID}
        </Link>
      </TableCell>

      <TableCell align="left">{row.customerName}</TableCell>
      <TableCell align="right">{row.finalCost}</TableCell>
      <TableCell align="right">{row.creationTime}</TableCell>
      <TableCell align="right">{row.finishTime}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
    </>
  );
};

export default SellOrderTableBody;

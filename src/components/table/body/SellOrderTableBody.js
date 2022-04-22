import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { dateToDateString } from "../../../utils/utils";
const SellOrderTableBody = (props) => {
  const { row, labelId } = props;

  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `sell/${row.id}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.sellOrderID}
        </Link>
      </TableCell>

      <TableCell align="left">{row.customerName}</TableCell>
      <TableCell align="right">{row.finalCost}</TableCell>
      <TableCell align="right">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="right">{dateToDateString(row.finishTime)}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
    </>
  );
};

export default SellOrderTableBody;

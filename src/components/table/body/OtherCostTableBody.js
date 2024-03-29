import { TableCell } from "@mui/material";
import React from "react";
import { dateToDateString } from "../../../utils/utils";

const OtherCostTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.totalCost}</TableCell>
      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
    </>
  );
};

export default OtherCostTableBody;
import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import  {dateToDateString} from '../../../utils/utils'
const IncompletedSellOrderTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `/business/sell/${row.sellOrderID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.textID}
        </Link>
      </TableCell>
      <TableCell align="left">{row.customerName}</TableCell>
      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="right">{row.finalCost}</TableCell>
    
      {/* <TableCell align="left">{row.status.toLocalString()}</TableCell> */}
    </>
  );
};

export default IncompletedSellOrderTableBody;

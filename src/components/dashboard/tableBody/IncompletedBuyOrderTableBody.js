import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import  {dateToDateString} from '../../../utils/utils'

const IncompletedBuyOrderTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `/business/buy/${row.buyOrderID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.textID}
        </Link>
      </TableCell>
      <TableCell align="left">{row.supplierName}</TableCell>
      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="right">{row.totalCost}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
    </>
  );
};

export default IncompletedBuyOrderTableBody;



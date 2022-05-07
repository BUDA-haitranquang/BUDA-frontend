import { TableCell } from "@mui/material";
import React from "react";
// import { Link } from "react-router-dom";
import  {dateToDateString} from '../../../utils/utils'
const IncompletedFixedCostTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        {/* <Link
          to={{ pathname: `/business/buy/${row.buyOrderID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        > */}
          {row.fixedCostBillID}
        {/* </Link> */}
      </TableCell>
     
      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="left">{dateToDateString(row.dueTime)}</TableCell>
      <TableCell align="right">{row.totalSpend}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
    </>
  );
};

export default IncompletedFixedCostTableBody;

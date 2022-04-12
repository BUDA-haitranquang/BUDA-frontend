import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const FixedCostBillTableBody = (props) => {
    const { row,labelId } = props;
    return (
       <>
        <TableCell component="th" id={labelId} scope="row">
            {row.message}
        </TableCell>
        <TableCell align="left">{row.dueTime}</TableCell>
        <TableCell align="left">{row.creationTime}</TableCell>
        <TableCell align="left">{row.totalSpend}</TableCell>
   </>     
    );
};

export default FixedCostBillTableBody;
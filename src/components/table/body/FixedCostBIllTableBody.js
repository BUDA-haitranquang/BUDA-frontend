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
        <TableCell align="center">{row.dueTime}</TableCell>
        <TableCell align="center">{row.creationTime}</TableCell>
        <TableCell align="center">{row.totalSpend}</TableCell>
   </>     
    );
};

export default FixedCostBillTableBody;
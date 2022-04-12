import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const FixedCostTableBody = (props) => {
    const { row,labelId } = props;
    return (
       <>
        <TableCell component="th" id={labelId} scope="row">
            {row.name}
        </TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="right">{row.period}</TableCell>
        <TableCell align="right">{row.moneyAmount}</TableCell>
   </>     
    );
};

export default FixedCostTableBody;
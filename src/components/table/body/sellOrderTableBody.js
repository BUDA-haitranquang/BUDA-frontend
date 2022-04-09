import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SellOrderTableBody = (props) => {
    const { row,labelId } = props;
    return(
        <>
            <TableCell component="th" id={labelId} scope="row">{row.actualDiscountCash}</TableCell>
            <TableCell align="right">{row.actualDiscountPercentage}</TableCell>
            <TableCell align="right">{row.realCost}</TableCell>
            <TableCell align="right">{row.finalCost}</TableCell>
            <TableCell align="right">{row.customerMessage}</TableCell>
        </>
    )
};
export default SellOrderTableBody;
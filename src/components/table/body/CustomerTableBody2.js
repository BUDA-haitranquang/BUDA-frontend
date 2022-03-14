import { TableCell } from "@mui/material";
import React from "react";
const CustomerTableBody2 = (props) => {
    const { row,labelId } = props;
    return (
       <>
            <TableCell component="th" id={labelId} scope="row" >
                {row.name}
            </TableCell>
            <TableCell align="left">{row.phoneNumber}</TableCell>
            <TableCell align="left">{row.address}</TableCell>
            <TableCell align="left">{row.gender}</TableCell>
            <TableCell align="left">{row.ageGroup}</TableCell>
            <TableCell align="left">{row.totalSpend}</TableCell>
    </>     
    );
};

export default CustomerTableBody2;
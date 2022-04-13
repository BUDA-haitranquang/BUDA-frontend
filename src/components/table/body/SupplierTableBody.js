import { TableCell } from "@mui/material";
import React from "react";
const SupplierTableBody = (props) => {
    const { row,labelId } = props;
    return (
       <>
        <TableCell component="th" id={labelId} scope="row">{row.name}</TableCell>
        <TableCell align="left">{row.phoneNumber}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
   </>     
    );
};

export default SupplierTableBody;
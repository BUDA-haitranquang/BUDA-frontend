import { TableCell } from "@mui/material";
import React from "react";
const SupplierTableBody = (props) => {
    const { row,labelId } = props;
    return (
       <>
        <TableCell component="th" id={labelId} scope="row">{row.name}</TableCell>
        <TableCell align="center">{row.phoneNumber}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
   </>     
    );
};

export default SupplierTableBody;
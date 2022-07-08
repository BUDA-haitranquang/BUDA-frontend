import React, { Fragment } from "react";
import { TableCell } from "@mui/material";


const StaffTableBody = (props) => {
  const { row, labelId } = props;

  return (
    <Fragment>
      <TableCell component="th" id={labelId} scope="row" align='left'>
        {row.storeID}
      </TableCell>

      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.address}</TableCell>
    </Fragment>
  );
};

export default StaffTableBody;

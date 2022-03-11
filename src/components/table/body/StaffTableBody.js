import React, { Fragment } from "react";
import { TableCell } from "@mui/material";
import { Link } from "react-router-dom";

const StaffTableBody = (props) => {
  const { row, labelId } = props;

  return (
    <Fragment>
      <TableCell component="th" id={labelId} scope="row" >
        <Link
          to={{
            pathname: `staff/${row.staffID}`,
          }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.name}
        </Link>
      </TableCell>

      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">{row.phoneNumber}</TableCell>
      <TableCell align="left">{row.address}</TableCell>
      <TableCell align="left">{row.staffPosition}</TableCell>
    </Fragment>
  );
};

export default StaffTableBody;

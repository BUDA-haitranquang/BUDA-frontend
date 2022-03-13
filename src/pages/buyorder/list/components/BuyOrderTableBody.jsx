import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { TableCell } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

BuyOrderTableBody.propTypes = {
  row: PropTypes.number,
  labelId: PropTypes.any,
};

function BuyOrderTableBody(props) {
  const { row, labelId } = props;
  const history = useHistory();

  return (
    <Fragment onClick={() => history.push(`${row.buyOrderID}`)}>
      <TableCell align="left">{row.supplier.name}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="right">{row.totalCost}</TableCell>
      <TableCell align="left">{"hieutran"}</TableCell>
      <TableCell align="left">{row.creationTime}</TableCell>
    </Fragment>
  );
}

export default BuyOrderTableBody;

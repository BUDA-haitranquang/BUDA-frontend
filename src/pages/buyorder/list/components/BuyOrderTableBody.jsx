import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { TableCell } from "@mui/material";
import {useHistory } from "react-router-dom";
import { dateToDateString } from '../../../../utils/utils'
import color from "src/theme/color";

BuyOrderTableBody.propTypes = {
  row: PropTypes.number,
  labelId: PropTypes.any,
};

function BuyOrderTableBody(props) {
  const { row } = props;
  const history = useHistory();

  return (
    <Fragment>
      <TableCell
        align="left"
        style={{ textDecoration: "none", color: color.PRIMARY }}
        onClick={() => history.push(`buy/${row.buyOrderID}`)}
      >
        {row.textID}
      </TableCell>
      <TableCell align="left">{row.supplierName}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="right">{row.totalCost}</TableCell>
      <TableCell align="left">{row.createdBy}</TableCell>
      <TableCell align="left">{dateToDateString(row.createdAt)}</TableCell>
    </Fragment>
  );
}

export default BuyOrderTableBody;

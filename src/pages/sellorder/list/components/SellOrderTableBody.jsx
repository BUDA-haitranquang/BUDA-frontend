import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { TableCell } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

SellOrderTableBody.propTypes = {
    row: PropTypes.number,
    labelID: PropTypes.any, 
};

function SellOrderTableBody(props){
    const { row,labelID } = props;
    const history = useHistory();

    return (
        <Fragment>
            <TableCell
                align="left"
                style={{ textDecoration: "none", color: "blue" }}
                onClick={() => history.push(`sell-order/${row.sellOrderID}`)}
            >
                {row.textID}
            </TableCell>
            <TableCell align="left">{row.customer? row.customer.name : ""}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
            <TableCell align="right">{row.finalCost}</TableCell>
            <TableCell align="left">{row.staff?.name || ""}</TableCell>
            <TableCell align="left">{row.creationTime}</TableCell>
        </Fragment>
    )
}

export default SellOrderTableBody;
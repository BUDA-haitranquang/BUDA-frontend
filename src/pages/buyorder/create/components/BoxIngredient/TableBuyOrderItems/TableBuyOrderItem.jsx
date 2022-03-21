import React from "react";
import PropTypes from "prop-types";
import {
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import useStyles from "./TableBuyOrderItems.styles";
import BuyOrderItem from "./BuyOrderItem/BuyOrderItem";

TableBuyOrderItem.propTypes = {
  buyOrderItems: PropTypes.array,
};

function TableBuyOrderItem(props) {
  const { buyOrderItems } = props;

  const classes = useStyles();

  return (
    <TableContainer className={classes.root}>
      <Table

        aria-label="simple table"
        style={{ borderCollapse: "inherit" }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f2f5" }}>
            <TableCell align="center" style={{ width: "55px" }}>
              No.
            </TableCell>
            <TableCell align="center" style={{ width: "60px" }}>
              Image
            </TableCell>
            <TableCell align="left" style={{ width: "200px"}}>
              SKU
            </TableCell>
            <TableCell align="left">
              Name
            </TableCell>
            <TableCell align="center" style={{ width: "105px" }}>
              Quantity
            </TableCell>
            <TableCell align="right" style={{ width: "115px" }}>
              Price
            </TableCell>
            <TableCell align="right" style={{ width: "115px" }}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buyOrderItems.map((item, index) => (
            <BuyOrderItem
              item={item}
              index={index + 1}
              key={item.ingredient.ingredientID}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableBuyOrderItem;

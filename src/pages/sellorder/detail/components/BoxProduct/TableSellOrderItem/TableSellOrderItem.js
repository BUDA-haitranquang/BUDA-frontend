import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SellOrderItem from "./SellOrderItem/SellOrderItem";

TableSellOrderItem.propTypes = {
    sellOrderItem: PropTypes.array,
};

function TableSellOrderItem(props){
    const { sellOrderItems } = props;
    useEffect(() => {}, []);
    return (
        <TableContainer >
          <Table aria-label="simple table" style={{ borderCollapse: "inherit" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f2f5" }}>
                <TableCell align="center" style={{ width: "55px" }}>
                  No.
                </TableCell>
                <TableCell align="center" style={{ width: "60px" }}>
                  Image
                </TableCell>
                <TableCell align="left" style={{ width: "60px" }}>
                  SKU
                </TableCell>
                <TableCell align="left" style={{ width: "100px" }}>Name</TableCell>
                <TableCell align="left" style={{ width: "115px" }}>
                  Description
                </TableCell>
                <TableCell align="center" style={{ width: "50px" }}>
                  Amount Left
                </TableCell>
                <TableCell align="center" style={{ width: "50px" }}>
                  Selling Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableSellOrderItem-Body">
              {sellOrderItems?.map((item, index) => (
                <SellOrderItem
                  item={item}
                  index={index + 1}
                  key={item.product.productID}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default TableSellOrderItem;